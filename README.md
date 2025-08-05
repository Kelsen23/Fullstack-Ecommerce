# 🛒 Fullstack-Eccomerce

**Fullstack-Eccomerce** is a full-featured E-commerce web application built with a modern tech stack.  
This is my **first backend project**, and it was created to practice building fullstack applications using both frontend and backend technologies.

---

## 🚀 Overview

This project includes two main parts:

- **Frontend** – A modern user interface where customers can browse, shop, and manage their accounts.
- **Backend** – A secure RESTful API that handles authentication, product management, orders, and more.

🔗 You can find more detailed instructions inside the individual folders:

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

---

## 👥 User Roles

There are **two types of users** in this project:

### 👤 Normal User
- Can **register** and **log in**.
- Can **browse products**, **add them to cart** and **favorites**.
- Can **write reviews** (with comments and star ratings) for products.
- Can **checkout the cart** and enter **shipping information**.
  > ⚠️ This app does not process real payments, so no actual product will be shipped.

### 🛠 Admin
- Can **view all registered users** in the system.
- Can **create**, **update**, and **delete** products.
- Can **create**, **update**, and **delete** product **categories**.

---

## 📦 Tech Stack

This project is split into frontend and backend:

### 🧩 Frontend
- React
- Redux Toolkit
- React Router
- Tailwind CSS

### 🛠 Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (for image uploads)

More detailed setup instructions are in each folder’s own README.

---

## 💡 Future Improvements That Can Be Done

- Add real payment integration (e.g., Stripe, PayPal).
- Add product stock tracking and order status updates.
- Improve mobile responsiveness.
- Enhance admin dashboard with analytics.

## ⚠️ Important Note

Images uploaded using Multer are stored locally on the server.
Project is deployed on Render so without persistent storage, images may be lost after some time due to temporary storage limitations.
