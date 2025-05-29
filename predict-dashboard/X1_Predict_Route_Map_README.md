
# 📍 X1 Predict Frontend Route Map

This document outlines the live route architecture for the Infinity X One :: X1 Predict platform.  
It is intended for internal development, PR, and deployment documentation.

---

## ✅ Active Routes

| Route Path       | Description                           | File Location                             |
|------------------|---------------------------------------|--------------------------------------------|
| `/`              | Landing page                          | `src/app/page.tsx`                         |
| `/dashboard`     | User dashboard (portfolio & stats)    | `src/app/dashboard/page.tsx`              |
| `/admin`         | Admin access panel                    | `src/app/admin/page.tsx`                  |
| `/proof`         | Prediction proof & transparency page  | `src/app/proof/page.tsx`                  |
| `/test`          | Optional test/dev route               | `src/app/test/page.tsx`                   |

---

## 🧼 Cleaned/Deprecated Paths (Removed)

| File Location                                                           | Reason                      |
|-------------------------------------------------------------------------|-----------------------------|
| `x1-predict/page.tsx`                                                  | Stray root file             |
| `predict-dashboard/page.tsx`                                           | Duplicate, mislocated       |
| `predict-dashboard/app/admin/page.tsx`                                 | Duplicate of correct path   |
| `predict-dashboard/app/proof/page.tsx`                                 | Duplicate of correct path   |
| `predict-dashboard/predict-dashboard/src/app/...`                      | Nested folder error         |
| `src/app/dashboard/paper/page.tsx`                                     | Empty route file            |

---

## 🔒 Notes

- This route map is Vercel and Next.js optimized.
- All routes conform to App Router standards using `page.tsx` structure.
- Modify this document as routes evolve during feature expansion.

© 2025 Infinity X One — Confidential
