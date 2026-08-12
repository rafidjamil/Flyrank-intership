# A2 Service - Postgres Integration & Dockerization

This repository contains the A2 backend service converted from an in-memory storage pattern to a persistent PostgreSQL database running in Docker containers.

## 🏗️ Architecture & Layering Proof

By applying Clean Architecture principles and Dependency Inversion:
- **Repository Swap:** The `InMemoryItemRepository` was swapped with `PostgresItemRepository`.
- **Zero Interface Breaking Changes:** Neither `ItemService` nor `itemController` / `itemRoutes` required any modification. The routes and core business logic remained completely unchanged during the storage migration.

---

## 🛠️ Project Structure

```text
docker-task/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── itemController.js
│   ├── repositories/
│   │   ├── inMemoryItemRepository.js
│   │   ├── itemRepository.interface.js
│   │   └── postgresItemRepository.js
│   ├── routes/
│   │   └── itemRoutes.js
│   ├── services/
│   │   └── itemService.js
│   └── app.js
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── init.sql
├── package.json
└── README.md

TEST CASE
Command: docker compose down
time="2026-08-12T07:01:04-05:00" level=warning msg="C:\\Users\\CSP\\Desktop\\Playground\\FlyRank AI\\week-2-backendtask\\Flyrank-intership\\docker-task\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] down 3/3
 ✔ Container a2_app            Removed                                                                                         1.3s
 ✔ Container a2_postgres       Removed                                                                                         0.4s
 ✔ Network docker-task_default Removed  

Command: docker compose up -d
time="2026-08-12T07:01:15-05:00" level=warning msg="C:\\Users\\CSP\\Desktop\\Playground\\FlyRank AI\\week-2-backendtask\\Flyrank-intership\\docker-task\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] up 3/3
 ✔ Network docker-task_default Created                                                                                         0.0s
 ✔ Container a2_postgres       Started                                                                                         0.5s
 ✔ Container a2_app            Started        

 Command: curl.exe http://localhost:3000/items    
 [{"id":1,"title":"Persistent Data Check","created_at":"2026-08-12T11:59:03.378Z"}]                                           