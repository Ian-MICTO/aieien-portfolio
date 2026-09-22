# ✨ Ai Eien Portfolio (Monorepo)

A manga-styled portfolio web application for illustrator & concept artist **Ai Eien**, built with **Astro**, **Tailwind CSS**, and **Strapi CMS**.

---

## 🏗️ Project Structure

```text
aieien-portfolio/
├── apps/
│   ├── backend/               # Strapi v5 Headless CMS & Admin Panel
│   └── web/                   # Astro frontend application (SSR/Static)
├── docker-compose.yml         # Multi-container orchestration (Strapi + PostgreSQL + Web)
├── STRAPI_COLLECTIONS_GUIDE.md # 📖 Comprehensive Strapi Collections & JSON Guide
└── package.json               # Monorepo root scripts & configuration
```

---

## 📖 Strapi Backend Reference & Schema Guide

If you are setting up or managing content in Strapi (especially JSON properties for quotes, greetings, schedules, or manga panels):

👉 **Check the comprehensive guide:** [**`STRAPI_COLLECTIONS_GUIDE.md`**](./STRAPI_COLLECTIONS_GUIDE.md)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Strapi Backend (Port 1337)
```bash
cd apps/backend
pnpm develop
```
- Strapi Admin: [http://localhost:1337/admin](http://localhost:1337/admin)

### 3. Start Web Frontend (Port 4321)
```bash
cd apps/web
pnpm dev
```
- Web Application: [http://localhost:4321](http://localhost:4321)

---

## 🐳 Docker Deployment

To spin up the entire stack (PostgreSQL database, Strapi backend, and Astro web app):

```bash
docker compose up -d
```
