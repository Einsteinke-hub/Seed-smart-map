# 🌳 Reforest-AI

**Intelligent reforestation planning platform with interactive mapping and AI-powered species recommendations.**

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Einsteinke-hub/Seed-smart-map.git
cd reforest-ai
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

#### Get Supabase Credentials

- Create a project at [Supabase](https://supabase.com/)
- Copy URL and anon key from **Settings > API**
- Run the database schema migrations from `supabase/migrations/`

### 3. Start Development

```bash
npm run dev
```

---

## ✨ Features

- **Interactive Mapping**  
  Draw project areas with Leaflet.

- **AI Species Recommendations**  
  Smart matching based on soil & climate.

- **Project Dashboard**  
  Manage reforestation initiatives.

- **Species Database**  
  Comprehensive tree data with environmental impact scoring.

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Backend & Auth:** Supabase
- **Mapping:** Leaflet.js
- **AI Species Recommendations:** Lovable AI

---

## 🚀 Deployment

### Vercel

```bash
npm run build
vercel --prod
```

Set environment variables in your deployment platform.

---

## 🆘 Troubleshooting

If the app is not working after cloning:

- Ensure environment variables are set correctly
- Verify your Supabase project is configured
- Run `npm install` to ensure dependencies are installed

---

> **Reforest-AI** — Planting the future, one tree at a time. 🌱
