import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { callLLM } from "../src/llm/client.js";

dotenv.config();

async function runEval() {
  const casesPath = path.resolve("evals/cases.json");
  const cases = JSON.parse(fs.readFileSync(casesPath, "utf-8"));

  let passed = 0;
  console.log(`\n🧪 Running ${cases.length} Eval Cases...\n`);

  for (let i = 0; i < cases.length; i++) {
    const testCase = cases[i];
    console.log(`Case ${i + 1}: Input = "${testCase.input}"`);

    try {
      const res = await callLLM(testCase.input);
      if (res.success && res.data.department === testCase.expected_dept && res.data.seniority === testCase.expected_seniority) {
        console.log(`   ✅ PASS: Got Dept [${res.data.department}], Seniority [${res.data.seniority}]`);
        passed++;
      } else {
        console.log(`   ❌ FAIL: Expected Dept [${testCase.expected_dept}], Seniority [${testCase.expected_seniority}] | Got Dept [${res.data?.department}], Seniority [${res.data?.seniority}]`);
      }
    } catch (e) {
      console.log(`   ❌ ERROR: ${e.message}`);
    }
    console.log("-------------------------------------");
  }

  console.log(`\n📊 Final Result: ${passed}/${cases.length} Passed (${((passed / cases.length) * 100).toFixed(1)}% Accuracy)\n`);
}

runEval();