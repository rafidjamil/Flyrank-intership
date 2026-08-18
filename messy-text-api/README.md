# 🧹 Messy Text Normalization API

A production-grade, resilient backend LLM pipeline built with **Express.js**, **Zod**, and **OpenRouter (OpenAI SDK)**. This service transforms messy, unstandardized user-entered job titles into clean, database-ready structured JSON responses containing standardized job titles, departments, and seniority levels.

---

## 🎯 Problem Statement

In real-world applications (HR platforms, CRM tools, job boards), users enter job titles in inconsistent formats:
- `"Sr. SWE II"`
- `"jr web designer"`
- `"vp sales global"`
- `"asdkjhu 123987"` (Garbage input)

Querying databases directly on raw text leads to poor analytics and broken search features. This API acts as an intelligent normalization engine that cleans, categorizes, and strictly validates raw job titles before saving them down the pipeline.

---

## 🛠️ Tech Stack & Tools Used

| Tool / Library | Purpose |
| :--- | :--- |
| **Node.js (ES Modules)** | JavaScript runtime environment |
| **Express.js** | Lightweight Web API framework |
| **Zod** | TypeScript-first schema validation for requests and LLM outputs |
| **OpenAI SDK** | Client library configured to connect with OpenRouter API |
| **OpenRouter** | API gateway accessing LLM models (`openrouter/free`) |
| **dotenv** | Environment variable management |

---

## 🔥 Key Engineering Features

1. **Strict Output Schema Enforcement (Zod)**
   - Forces the LLM output to strictly adhere to canonical departments (`Engineering`, `Product`, `Design`, `Data`, `Sales`, `Marketing`, `Operations`, `Other`) and seniority levels (`Intern`, `Junior`, `Mid`, `Senior`, `Lead`, `Executive`, `Unknown`).

2. **Self-Healing Mechanics (1x Repair Retry)**
   - If the LLM generates output that fails Zod schema validation (e.g., invalid enum or missing field), the system automatically captures the validation error and re-prompts the LLM **once** with the specific error context to correct itself.

3. **Quarantine Logging (`logs/quarantine.jsonl`)**
   - If a request fails schema validation even after the 1x Repair Retry attempt, the invalid input, raw LLM output, and error logs are appended to a quarantine file without crashing the service.

4. **Pre-LLM Input Validation**
   - Validates incoming request payloads (`raw_title` length between 1 to 200 characters). Returns a `400 Bad Request` instantly before wasting LLM token budget.

5. **Operational Control Switches**
   - **Kill Switch (`LLM_ENABLED=false`)**: Immediately turns off external LLM calls and returns a `503 Service Unavailable` response during system maintenance.
   - **Stub Mode (`LLM_STUB=1`)**: Returns mock data for rapid local offline testing without making external network calls.

6. **Prompt Engineering Optimization**
   - Designed a robust system prompt with edge-case rules (e.g., defaulting missing seniority to `"Mid"`, handling numeric levels like `"II"` or `"2"`, and handling non-standard garbage strings gracefully).

---

## 📁 Project Structure

```text
messy-text-api/
├── JOB-CARD.md              # Boundary rules and behavioral specification
├── README.md                # Project documentation
├── .env                     # Private environment variables (Git ignored)
├── .env.example             # Example environment variable template
├── .gitignore               # Excluded files list
├── package.json             # Dependencies and npm scripts
├── prompts/
│   └── normalize-v1.md      # System prompt with examples & output rules
├── evals/
│   ├── cases.json           # 8 test evaluation cases
│   └── run-eval.js          # Evaluation runner script
├── logs/
│   └── quarantine.jsonl     # Failed output quarantine log
└── src/
    ├── llm/
    │   ├── schema.js        # Zod input & output schemas
    │   └── client.js        # OpenRouter API client, repair logic & quarantine logger
    └── server.js            # Express API server with endpoints & switches