# 🧠 X1 Predict Core Memory System

**Version:** `v1.2.0`  
**Author:** Architect 
**Status:** ✅ Production-ready backend  
**GitHub Repo:** [https://github.com/your-username/x1-predict](#)

---

## ✅ Overview

The **X1 Predict Core Memory System** is an intelligent backend architecture designed to power prediction systems, memory-based agents, and adaptive feedback loops with live vector storage and semantic scoring.

Built with:

- ⚡ FastAPI backend (Python 3.10)
- 🧠 Supabase vector memory integration
- 🔁 Automated feedback scoring every 15 minutes
- 🌐 Metrics & analytics endpoints
- 💾 Support for 1536-dimension embedding vectors (OpenAI-compatible)

---

## 🔧 Features

| Component      | Description                          |
|----------------|--------------------------------------|
| `/predict`     | Accepts prediction input (custom)    |
| `/feedback`    | Receives user feedback               |
| `/metrics`     | Live scoring summary + totals        |
| `/analyze`     | Optional advanced stats endpoint     |
| `/store_vector`| Save vector embeddings to Supabase   |
| `feedback_cron.py` | Automated scoring job (15 min loop) |

---

## 🗃️ Supabase Integration

| Table           | Purpose                         |
|-----------------|----------------------------------|
| `feedback`       | Stores user feedback + scores   |
| `memory_vectors` | Stores 1536-dim embedding vectors |

Environment variables (via `.env`):

```env
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

User Feedback ➝ /feedback
                 ⬇
     feedback_cron.py (15 min)
                 ⬇
     Score saved in Supabase
                 ⬇
       Metrics shown via /metrics

Predictions ➝ /predict ➝ (optionally logs)
                ⬇
       Embedding ➝ /store_vector ➝ Supabase



---

## ✅ Final Git Commands to Push README

If you've added the `README.md` now:

### 1. Stage and commit:

```bash
git add README.md
git commit -m "📝 Add full project summary and investor-ready README"


