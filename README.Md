# 🗂️ GroupFlow

> A full-stack team collaboration and project management app built with the MERN stack.

GroupFlow is a MERN-stack project management application designed for team collaboration. Users can create projects, invite members, assign tasks, track activity history, receive notifications, and discuss work through task comments. The application features secure authentication, email-based workflows, profile management, testing, and Dockerized deployment.

---

## ✨ Features

- 🔐 **Auth** — Register, login, email verification, forgot/reset password
- 📁 **Projects** — Create and manage projects, invite members via email
- ✅ **Tasks** — Assign tasks, update status, accept or reject assignments
- 💬 **Comments** — Per-task comment threads
- 📜 **History** — Project-wide audit log of all activity
- 🔔 **Notifications** — User-specific alerts with read/unread state
- 🖼️ **Profile** — Avatar upload and account settings
- 🐳 **Docker** — Fully containerized, runs with a single command

---

## 🛠️ Tech Stack

| Layer         | Tech                            |
| ------------- | ------------------------------- |
| Frontend      | React 18, Vite, Tailwind CSS    |
| Backend       | Node.js, Express.js             |
| Database      | MongoDB, Mongoose               |
| Auth          | JWT, bcrypt                     |
| Email         | Nodemailer (Gmail App Password) |
| Image Storage | Cloudinary                      |
| Testing       | Jest, Supertest                 |
| DevOps        | Docker, Docker Compose          |

---

## 📁 Project Structure

```
groupflow/
├── backend/
│   ├── modules/        # auth, users, projects, tasks, comments, history, notifications, members
│   ├── middleware/     # auth, error, upload, validation
│   ├── utils/          # email, rate limiter, error handler, etc.
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/      # all route-level pages
│   │   ├── components/ # reusable UI components
│   │   ├── hooks/      # custom hooks per feature
│   │   ├── contexts/   # global state (auth, projects, tasks, etc.)
│   │   └── services/   # API call functions per module
│   └── index.html
└── docker-compose.yml
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- A MongoDB instance — local or [MongoDB Atlas](https://www.mongodb.com/atlas)
- A Gmail account with a configured [App Password](https://support.google.com/accounts/answer/185833) for email features
- A [Cloudinary](https://cloudinary.com/) account for image uploads

---

### 1. Clone the repo

```bash
git clone https://github.com/paldentitung/GroupFlow.git
cd GroupFlow
```

---

### 2. Configure environment variables

Both `backend` and `frontend` have a `.env.example` file. There are two env files you need depending on how you run the app:

| File               | Used for                     |
| ------------------ | ---------------------------- |
| `.env.development` | Manual `npm run dev`         |
| `.env.production`  | Docker (`docker-compose up`) |

> ⚠️ Never commit your `.env.development` or `.env.production` files — they contain real secrets. The `.env.example` files are safe to commit and serve as a reference for other developers.

**Backend:**

```bash
# For local dev
cp ./backend/.env.example ./backend/.env.development

# For Docker
cp ./backend/.env.example ./backend/.env.production
```

Then fill in the values:

```env
# Server
PORT=8000

# Database — use your local or Atlas connection string
MONGO_URI=mongodb://127.0.0.1:27017/groupflow

# Auth — any long random string
JWT_SECRET=your_jwt_secret

# URLs
CLIENT_URL=http://localhost:5173
BASE_URL=http://localhost:8000

# Email — Gmail address + App Password (not your real Gmail password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Cloudinary — get these from your Cloudinary dashboard
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

**Frontend:**

```bash
# For local dev
cp ./frontend/.env.example ./frontend/.env.development

# For Docker
cp ./frontend/.env.example ./frontend/.env.production
```

Then fill in:

```env
# Points to your running backend
VITE_API_URL=http://localhost:8000/api
```

---

### 3. Run with Docker 🐳

```bash
docker-compose up --build
```

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:4173 |
| Backend  | http://localhost:8000 |

---

### 4. Run manually (without Docker)

**Backend:**

```bash
cd backend
npm install
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` in dev mode.

---

## 📡 API Overview

All endpoints are prefixed with `/api`.

| Module        | Base Route           |
| ------------- | -------------------- |
| Auth          | `/api/auth`          |
| Users         | `/api/users`         |
| Projects      | `/api/projects`      |
| Tasks         | `/api/tasks`         |
| Members       | `/api/members`       |
| Comments      | `/api/comments`      |
| History       | `/api/history`       |
| Notifications | `/api/notifications` |

---

## 🔮 Future Improvements

- 🌐 **Live deployment** — Deploy to Railway (backend) and Vercel (frontend)
- ⚡ **Real-time updates** — Replace polling with WebSockets via Socket.io for live notifications and task updates
- 🔷 **TypeScript** — Migrate frontend to TypeScript for better type safety and DX
- ☁️ **Cloudinary migration** — Move all avatar/image storage fully to Cloudinary (currently local uploads)

---

## 📄 License

MIT ??
