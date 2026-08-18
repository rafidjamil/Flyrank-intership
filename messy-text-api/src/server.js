import "dotenv/config"; // Must be line 1
import express from "express";
import { InputSchema } from "./llm/schema.js";
import { callLLM } from "./llm/client.js";

const app = express();
app.use(express.json());

app.post("/normalize", async (req, res) => {
  // 1. Kill Switch
  if (process.env.LLM_ENABLED === "false") {
    return res.status(503).json({ 
      error: "Service Temporarily Disabled",
      fallback: { canonical_title: req.body.raw_title || "Unknown", department: "Other", seniority: "Unknown", confidence: 0.0, reason: "Kill switch active." }
    });
  }

  // 2. Input Validation (Returns 400 before model call)
  const inputResult = InputSchema.safeParse(req.body);
  if (!inputResult.success) {
    return res.status(400).json({ 
      error: "Invalid input", 
      details: inputResult.error.errors.map(e => `${e.path.join(".")}: ${e.message}`) 
    });
  }

  // 3. Stub Mode Check
  if (process.env.LLM_STUB === "1") {
    return res.json({
      canonical_title: "Software Engineer",
      department: "Engineering",
      seniority: "Mid",
      confidence: 0.99,
      reason: "[STUB MODE] Fake valid output."
    });
  }

  // 4. Execute LLM Logic
  try {
    const result = await callLLM(inputResult.data.raw_title);
    if (!result.success) {
      return res.status(result.status || 500).json({ error: result.message });
    }
    return res.json(result.data);
  } catch (error) {
    if (error.name === "APIConnectionTimeoutError") {
      return res.status(504).json({ error: "LLM request timed out." });
    }
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API Running on http://localhost:${PORT}`));