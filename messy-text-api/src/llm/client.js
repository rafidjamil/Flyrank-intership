import dotenv from "dotenv";
dotenv.config(); // Ensure env variables are loaded FIRST

import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { OutputSchema } from "./schema.js";

const client = new OpenAI({
  baseURL: process.env.LLM_BASE_URL || "https://openrouter.ai/api/v1",
  apiKey: process.env.LLM_API_KEY || "dummy-key-for-stub",
  timeout: 30000 // 30 seconds explicit timeout
});

// Quarantine Logger
function logQuarantine(input, rawOutput, error) {
  const dir = path.resolve("logs");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const entry = {
    timestamp: new Date().toISOString(),
    input,
    rawOutput,
    error: error.message || String(error)
  };
  fs.appendFileSync(path.join(dir, "quarantine.jsonl"), JSON.stringify(entry) + "\n");
}

export async function callLLM(rawTitle) {
  const promptPath = path.resolve("prompts/normalize-v1.md");
  const systemPrompt = fs.readFileSync(promptPath, "utf-8");

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: JSON.stringify({ raw_title: rawTitle }) }
  ];

  const startTime = Date.now();

  // 1. Primary Call
  const response = await client.chat.completions.create({
    model: process.env.LLM_MODEL || "openrouter/free",
    messages,
    temperature: 0.1
  });

  let rawContent = response.choices[0].message.content || "";
  rawContent = rawContent.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();

  try {
    const parsed = JSON.parse(rawContent);
    const validated = OutputSchema.parse(parsed);

    console.log(`[Cost Log] Duration: ${Date.now() - startTime}ms | Input Tokens: ${response.usage?.prompt_tokens || 0} | Output Tokens: ${response.usage?.completion_tokens || 0} | Repairs: 0`);
    return { success: true, data: validated };
  } catch (err) {
    console.warn("Primary validation failed. Executing 1x Repair Retry...");

    // 2. Repair Retry
    const repairMessages = [
      ...messages,
      { role: "assistant", content: rawContent },
      { 
        role: "user", 
        content: `Your previous output failed validation: "${err.message}". Return ONLY corrected valid JSON matching the schema.` 
      }
    ];

    try {
      const repairResponse = await client.chat.completions.create({
        model: process.env.LLM_MODEL || "openrouter/free",
        messages: repairMessages,
        temperature: 0.0
      });

      let repairContent = repairResponse.choices[0].message.content || "";
      repairContent = repairContent.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();

      const repairedParsed = JSON.parse(repairContent);
      const repairedValidated = OutputSchema.parse(repairedParsed);

      console.log(`[Cost Log] Duration: ${Date.now() - startTime}ms | Repairs: 1`);
      return { success: true, data: repairedValidated };
    } catch (repairErr) {
      logQuarantine(rawTitle, rawContent, repairErr);
      return { success: false, status: 422, message: "LLM output failed schema validation after repair attempt." };
    }
  }
}