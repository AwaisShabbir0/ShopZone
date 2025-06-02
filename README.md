# 🛍️ ShopZone – Modern E-commerce Platform


Welcome to **ShopZone**, a full-stack modern e-commerce platform built to deliver a fast, secure, and interactive online shopping experience. It features a fully responsive frontend, admin dashboard, email verification, and intelligent chatbot support to streamline shopping and support.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js & React.js (TypeScript-ready)
- **Styling**: Tailwind CSS + CSS Modules
- **State Management**: Redux Toolkit
- **Authentication**: NextAuth.js (Google/GitHub OAuth + JWT)
- **Email Verification**: Nodemailer + OTP Flow
- **Database**: MongoDB (Mongoose ODM)
- **File Upload**: Cloudinary Integration
- **Payments**: Stripe / PayPal Integration
- **Form Handling**: Formik + Yup
- **Chatbot**: Dialogflow / Custom NLP (via Express or Serverless Function)
- **Testing**: Jest + React Testing Library

---

## 🚀 Key Features

### 👤 User-Facing

- 🛍️ Beautiful Product Catalog with Filters & Sorting
- 🔍 Live Search with Debounced Suggestions
- 🛒 Cart, Wishlist, and Checkout System
- 🔐 Secure Signup/Login with OAuth + Email OTP Verification
- 📧 Email verification on registration
- 💬 AI Chatbot for order inquiries & support
- 📦 Order Tracking & Purchase History
- 🖼️ Responsive Image Uploads (Cloudinary)
- 👤 Profile Page with Edit Functionality

### 🛠️ Admin Panel

- 🧑‍💼 Admin-Only Dashboard Access
- 🧾 Manage Products (Add, Edit, Delete)
- 📊 Sales Analytics Dashboard
- 📦 Order Fulfillment Management
- 🧍 User Role Assignments (Admin/User)
- 📁 Inventory Overview
- 📤 Upload Product Images

---

## 🤖 Email Verification Flow

- OTP-based verification using **Nodemailer**
- One-time code sent to user’s email upon signup
- User must verify before accessing protected routes
- Built-in code expiration and error handling

---

## 💬 Chatbot System

- Integrates a custom chatbot for:
  - 📦 Order status queries
  - 🛠️ Product-related FAQs
  - 🤝 Customer support redirection
- Built with Dialogflow or Node.js-based NLP backend
- Accessible from both user dashboard & product pages

---

## ✨ Technical Highlights

- Server-side rendering & Incremental Static Regeneration (Next.js)
- JWT-based authentication with session fallback
- Scalable RESTful API structure
- Rate limiting & route protection
- Responsive design with mobile-first strategy
- Clean project structure and reusable components

---

## 📦 Getting Started

### ✅ Prerequisites

- Node.js v16+
- MongoDB Atlas Cluster
- Gmail SMTP for email OTPs

---

### 🚀 Installation

```bash
git clone https://github.com/AwaisShabbir0/ShopZone.git
cd ShopZone
npm install
🔧 Environment Setup
Create a .env.local file with the following:

```

  ```bash
  env
  
  MONGODB_URI=your_mongodb_connection_string
  NEXTAUTH_SECRET=your_auth_secret
  NEXTAUTH_URL=http://localhost:3000
  EMAIL_SERVER_USER=your_email@gmail.com
  EMAIL_SERVER_PASS=your_app_password
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_key
  CLOUDINARY_API_SECRET=your_secret
  STRIPE_SECRET_KEY=your_stripe_key
  📲 Run the Dev Server
```
```bash
npm run dev

```

Visit http://localhost:3000

🤝 Contributing

We welcome pull requests, discussions, and suggestions. Please fork the repo, submit your changes, and open a PR.

📫 Contact

💻 Developer: Awais Shabbir & m. Owais Awan

📧 Email: awaiskamboh0810@gmail.com

⭐ Like This Project?

Don’t forget to star ⭐ the repo if you found it helpful!
