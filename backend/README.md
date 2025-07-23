# 🛠 Backend – Fullstack-Eccomerce

This is the **backend** of the **Fullstack-Eccomerce** project, which powers all core functionality such as user authentication, product and category management, order processing, and admin operations.

This server is built with **Node.js**, **Express**, and **MongoDB**, following a modular and scalable folder structure.

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment configuration
- **cookie-parser** for handling cookies
- **Multer** for image uploading

---

## 📁 Folder Structure

```
├── config/
│ └── db.js
├── controllers/ 
│ ├── categoryController.js
│ ├── orderController.js
│ ├── productController.js
│ └── userController.js
├── middlewares/ 
│ ├── asyncHandler.js
│ └── authMiddleware.js
├── models/ 
│ ├── categoryModel.js
│ ├── orderModel.js
│ ├── productModel.js
│ └── userModel.js
├── routes/ 
│ ├── categoryRoutes.js
│ ├── orderRoutes.js
│ ├── productRoutes.js
│ ├── userRoutes.js
│ └── uploadRoutes.js
├── utils/ 
│ ├── createToken.js
│ └── findEmptyField.js
├── index.js 
└── .gitignore
```

🖼️ Uploaded images are stored in a `/upload` folder at the **very root of the full project** (outside `/backend`).

---

## 🔐 Authentication

Authentication is handled using **JWT (JSON Web Tokens)**. Tokens are stored in cookies for secure user sessions.

- Passwords are securely hashed with **bcrypt** before storing in the database.
- Middleware: `authMiddleware.js`, `asyncHandler.js`.

---

## 🧪 API Features

### 👤 User Routes
- Register and login (user or admin)
- Token-based authentication with cookies
- Access personal profile

### 🛒 Product Routes
- View all or individual products
- Admins can add, update, delete products
- Users can post reviews with star ratings and comments

### 📂 Category Routes
- Admins can create, update, and delete product categories

### 📦 Order Routes
- Users can checkout their cart with shipping details
- Admins can mark orders as delivered

### 📤 Upload Route
- Image uploads handled with **Multer**
- Images saved to `/upload` folder (outside backend folder)

---

## 🧪 Environment Variables

Create a `.env` file inside `/backend` with the following:

```env
PORT=5000
MONGO_URI=mongodb_connection
JWT_SECRET=jwt_secret_key
NODE_ENV=development
```

## 🚀 Running the Backend

### Make sure concurrently and nodemon are installed:

```
npm install --save-dev concurrently nodemon
```

### 📍 Option 1: Run backend only

```
npm run backend
```

### 📍 Option 2: Run full project (frontend + backend)

```
npm run dev
```

## API Base URL

https:/fullstack-ecommerce-backend-ld3c.onrender.com/api
