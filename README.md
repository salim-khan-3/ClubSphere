# ClubSphere – Membership & Event Management Platform

🔗 **Live Site:** https://clubsphere-platform.netlify.app/
🔗 **Client Repository:** https://github.com/salim-khan-3/ClubSphere

---

## 📌 Project Purpose

**ClubSphere** is a full-stack MERN web application designed to help people discover, join, and manage local clubs and events.  
It enables **members**, **club managers**, and **admins** to interact through a secure, role-based system with integrated payments.

This project focuses on:
- Real-world role-based authorization
- Secure payments using Stripe
- Clean UI & dashboard design
- Scalable MongoDB data modeling

---

## 🚀 Key Features

### 🌍 Public Features
- Browse approved clubs and upcoming events
- View club details, events, and membership fees
- Search clubs by name & filter by category
- Responsive design for mobile, tablet & desktop
- Animated UI using **Framer Motion**

---

### 🔐 Authentication & Security
- Firebase Authentication (Email/Password + Google)
- Password validation with React Hook Form
- JWT issued from backend
- Firebase token verification on protected APIs
- Environment variables used for Firebase & MongoDB credentials

---

### 👤 Member Features
- Join free or paid clubs
- Pay membership fees securely using **Stripe**
- Register for events (free or paid)
- View joined clubs & registered events
- Payment history dashboard
- Membership & event tracking

---

### 🧑‍💼 Club Manager Features
- Create & manage clubs (CRUD)
- Set free or paid membership fees
- Create, update & delete events
- View club members & event registrations
- Revenue overview for their clubs
- Dashboard analytics

---

### 🛡️ Admin Features
- Admin dashboard overview with statistics
- Approve / reject club requests
- Manage users & roles
- View all payments & transactions
- Monitor platform-wide data

---

## 🧩 Dashboard Roles

| Role | Access |
|----|----|
| Admin | Full system control |
| Club Manager | Club & event management |
| Member | Join clubs & events |

Role-based routes and UI are fully protected.

---

## 🗂️ Database Collections

- **users**
- **clubs**
- **memberships**
- **events**
- **eventRegistrations**
- **payments**

MongoDB relationships are maintained using reference IDs and emails.

---

## 💳 Payment Integration

- Stripe (Test Mode)
- Membership payments
- Event registration payments
- Secure backend payment intent handling
- Payment records stored in database

---

## 🧪 Technologies Used

### Frontend
- React
- React Router DOM
- React Hook Form
- TanStack Query
- Tailwind CSS
- DaisyUI
- Framer Motion
- Axios
- Firebase Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- Stripe API
- JWT
- CORS
- dotenv
