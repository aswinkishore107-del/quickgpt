# ⚡ QuickGPT — Intelligent AI Assistant

A full-stack AI Assistant web application featuring real-time conversational intelligence with **Google Gemini**, high-fidelity AI image generation powered by **Pollinations AI (Flux model)**, credit billing via **Stripe**, and a **Community Gallery**.

---

## ✨ Features

- 💬 **AI Conversational Chat**: Powered by Google Gemini (`gemini-2.5-flash`) via OpenAI-compatible endpoints.
- 🎨 **AI Image Generation**: Text-to-image creation powered by **Pollinations AI** using the state-of-the-art **Flux** model.
- 🖼️ **Community Gallery**: Publish your generated images directly to a shared community showcase.
- 💳 **Credit & Subscription System**: Built-in credits system with **Stripe Checkout** and automated webhooks.
- 🔐 **Secure Authentication**: JWT-based user authentication, password hashing with bcrypt, and automatic 401 session recovery.
- 🌓 **Dark & Light Mode**: Seamless theme toggling with persistent user preference storage.
- ⚡ **Modern Responsive UI**: Built with React 19, Tailwind CSS, Prism code highlighting, and markdown rendering.

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**
- **React 19** with **Vite**
- **Tailwind CSS**
- **React Router Dom (v7)**
- **Axios** with global interceptors
- **React Hot Toast** & **React Markdown**
- **PrismJS** for syntax-highlighted code blocks

### **Backend (`/server`)**
- **Node.js** & **Express 5**
- **MongoDB** with **Mongoose ODM**
- **Google Generative AI** (Gemini 2.5 Flash)
- **Pollinations AI** (Flux model image generation)
- **Stripe** for payment processing
- **JSONWebToken (JWT)** & **Bcrypt.js**

---

## 📁 Project Structure

```
quickgpt/
├── client/                 # Frontend React application (Vite)
│   ├── src/
│   │   ├── assets/         # Icons and static media
│   │   ├── components/     # ChatBox, Sidebar, Message components
│   │   ├── context/        # AppContext (Auth, State & Interceptors)
│   │   ├── pages/          # Login, Credits, Community, Loading
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json         # SPA routing rewrites for Vercel
│   └── package.json
│
├── server/                 # Backend Node/Express API
│   ├── configs/            # Database (MongoDB) & OpenAI/Gemini configs
│   ├── controllers/        # User, Chat, Message & Stripe Webhooks
│   ├── middlewares/        # JWT Authentication Guard
│   ├── models/             # User, Chat schemas
│   ├── routes/             # API routes
│   ├── server.js           # Express app entry point
│   ├── vercel.json         # Serverless routing for Vercel
│   └── package.json
└── README.md
```

---

## ⚙️ Environment Variables

### **Client (`client/.env`)**
```env
VITE_SERVER_URL=http://localhost:3000
```
*(In production, set `VITE_SERVER_URL` to your deployed backend URL).*

### **Server (`server/.env`)**
```env
# Server Secret
JWT_SECRET=your_jwt_secret_key

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net

# AI Providers
GEMINI_API_KEY=your_google_gemini_api_key
POLLINATIONS_API_KEY=your_pollinations_secret_key

# Stripe Payments
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/aswinkishore107-del/quickgpt.git
cd quickgpt
```

### 2. Setup and Run Backend Server
```bash
cd server
npm install
npm run server
```
*Server will start on `http://localhost:3000`.*

### 3. Setup and Run Frontend Client
```bash
cd ../client
npm install
npm run dev
```
*Client will start on `http://localhost:5173`.*

---

## 🌐 Deployment to Vercel

### **1. Deploy Backend Server (`/server`)**
1. Import repository into [Vercel](https://vercel.com).
2. Set **Root Directory** to `server`.
3. Add the server environment variables (`JWT_SECRET`, `MONGODB_URI`, `GEMINI_API_KEY`, `POLLINATIONS_API_KEY`, `STRIPE_SECRET_KEY`, etc.).
4. Deploy and copy your production URL (e.g. `https://quickgpt-server.vercel.app`).

### **2. Deploy Frontend Client (`/client`)**
1. Import repository into [Vercel](https://vercel.com).
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Add environment variable:
   - `VITE_SERVER_URL` = `https://quickgpt-server.vercel.app`
5. Deploy.

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
