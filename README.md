# 🩺 Medical AI Voice Agent

> Voice-powered medical consultations with AI. Talk to specialist agents, get summaries, and view structured reports—all in one app.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)

---

## 📦 Repository

**GitHub:** [github.com/widushan/Medical-AI-Voice-Agent](https://github.com/widushan/Medical-AI-Voice-Agent)

Clone and run:

```bash
git clone https://github.com/widushan/Medical-AI-Voice-Agent.git
cd Medical-AI-Voice-Agent/ai-medical-voice-agent
npm install
npm run dev
```

---

## ✨ What it does

- **AI voice calls** — Connect to specialist AI agents (e.g. General Physician, Pediatrician) via [Vapi](https://vapi.ai).
- **Live transcript** — See the conversation as it happens.
- **Auto reports** — After the call, get a structured report: chief complaint, symptoms, duration, severity, medications, and recommendations.
- **History & reports** — Browse past sessions and open full reports in a dialog.

---

## 🛠 Tech stack

| Layer        | Tech |
|-------------|------|
| Framework   | Next.js 15, React 19 |
| Auth        | Clerk |
| Voice       | Vapi AI |
| Database    | Neon (Drizzle ORM) |
| AI reports  | OpenAI (GPT-4o-mini) |
| UI          | Tailwind CSS, Radix, shadcn/ui |

---

## 🚀 Quick start

1. **Clone** (see [Repository](#-repository) above).
2. **Go to the app folder:**
   ```bash
   cd Medical-AI-Voice-Agent/ai-medical-voice-agent
   ```
3. **Install and run:**
   ```bash
   npm install
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000).

Deployed on Vercel -->  https://medical-ai-voice-agent-two.vercel.app/

<img width="1915" height="1016" alt="Image" src="https://github.com/user-attachments/assets/0a9bd089-7462-4570-8eb6-8bebfb9e23e0" />

<img width="1902" height="1013" alt="Image" src="https://github.com/user-attachments/assets/132d9fd7-4f21-424a-9f1a-21eb12d8f5b9" />

<img width="1907" height="1012" alt="Image" src="https://github.com/user-attachments/assets/f313e959-d7a9-4c32-9410-ad58efa283ca" />

<img width="1907" height="1015" alt="Image" src="https://github.com/user-attachments/assets/6e9e03bd-68fb-4dfe-9bdb-be7f23c6d3f6" />

<img width="1900" height="1006" alt="Image" src="https://github.com/user-attachments/assets/a9a9be36-4432-4e6a-9187-c5a83ff4c8d8" />

<img width="1892" height="1010" alt="Image" src="https://github.com/user-attachments/assets/e61ed713-cc15-42a6-a8d2-39760fbcf777" />

<img width="1913" height="1017" alt="Image" src="https://github.com/user-attachments/assets/048f1151-ca40-44dd-b579-96611ed1153a" />

<img width="1902" height="1013" alt="Image" src="https://github.com/user-attachments/assets/7b31956d-2b12-4975-bb7d-026d58249cef" />

### Environment variables

Create `.env.local` in `ai-medical-voice-agent` and add:

- Clerk: `NEXT_PUBLIC_CLERK_*` and `CLERK_*`
- Vapi: `NEXT_PUBLIC_VAPI_API_KEY`, `NEXT_PUBLIC_VAPI_VOICE_AGENT_ASSISTANT_ID`
- OpenAI: `OPENAI_API_KEY`
- Database: your Neon connection string (used by Drizzle)

---

## 📁 Project layout

```
Medical-AI-Voice-Agent/
└── ai-medical-voice-agent/    ← Next.js app (run from here)
    ├── app/
    │   ├── (routes)/dashboard/   # Dashboard, history, medical agent
    │   ├── api/                   # Session, medical-report, etc.
    │   └── page.tsx               # Landing
    ├── components/
    └── config/                    # DB, schema, OpenAI
```

**Deploy on Vercel:** Set **Root Directory** to `ai-medical-voice-agent` in your project settings.

---

## 📄 License

MIT.
