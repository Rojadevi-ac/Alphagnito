#  Solace Design

A clean and minimal authentication application built using:

- React (Vite)
- Node.js
- Express
- MySQL
- JWT Authentication
- bcrypt password hashing

---

##  Features

- User Registration
- User Login
- JWT Authentication
- Protected Dashboard
- Clean UI (Solace Design)
- Axios API Integration

---

##  Project Structure

backend/
│
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── routes/
│   └── authRoutes.js
├── server.js
└── .env

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
└── vite.config.js

---

## ⚙️ Backend Setup

1. Install dependencies

npm install

2. Create .env file

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=auth_db
JWT_SECRET=supersecret

3. Start server

node server.js

---

## 💻 Frontend Setup

1. Install dependencies

npm install

2. Run development server

npm run dev

---

## 🔐 API Endpoints

POST /api/auth/register  
POST /api/auth/login  


---

## 🛠 Tech Stack

- React
- Node.js
- Express
- MySQL
- JWT
- Axios
- bcrypt

---

