# AI Lab Results Review Platform

A full-stack platform where patients upload blood test PDFs, an AI layer extracts and analyzes the data, and doctors review/validate the AI interpretation.

## Stack

- **Frontend**: Next.js 14 (App Router) + TailwindCSS + TanStack Query + Zustand
- **Backend**: NestJS + TypeORM + SQLite
- **Auth**: JWT + role-based access (Patient / Doctor / Admin)
- **PDF Parsing**: pdf-parse
- **AI**: Mock service with hardcoded reference ranges

## Quick Start

### Backend (Terminal 1)
```bash
cd apps/backend
cp .env.example .env
npm install
cd node_modules/sqlite3 && npm rebuild && cd ../..
npx ts-node-dev --transpile-only src/main.ts
# Runs on http://localhost:3001
```

### Frontend (Terminal 2)
```bash
cd apps/frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

## Features

### Patients
- Register / Login
- Upload blood test PDFs (drag & drop)
- View AI-extracted markers with status (normal/low/high)
- See flags and risk level (LOW / MEDIUM / HIGH)
- Request doctor review

### Doctors
- Register with specialty
- View anonymized review queue
- Submit Agree / Partially Agree / Disagree decisions
- Add clinical notes and reason codes
- Earn reputation points (Bronze → Silver → Gold → Platinum → Expert)

### Admin
- Platform stats dashboard (patients, doctors, labs, reviews)
- Top doctors leaderboard

## API Endpoints

| Method | Path | Auth |
|--------|------|------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/users/me | Any |
| POST | /api/labs/upload | Patient |
| GET | /api/labs | Patient |
| GET | /api/labs/:id | Patient/Doctor |
| PATCH | /api/labs/:id/request-review | Patient |
| GET | /api/reviews/queue | Doctor |
| GET | /api/reviews/lab/:id | Doctor |
| POST | /api/reviews | Doctor |
| GET | /api/reviews/mine | Doctor |
| GET | /api/reputation/me | Doctor |
| GET | /api/admin/stats | Admin |

## Medical Disclaimer

This platform is for informational purposes only and does not constitute medical advice, diagnosis, or treatment.
