# 🎨 Frontend – Fullstack-Eccomerce

This is the **frontend** of the Fullstack-Eccomerce project. Built with **React**, it provides users and admins with a clean, responsive shopping experience.

The frontend interacts with the backend through **Redux Toolkit Query (RTK Query)** and handles routing, authentication, cart, and checkout logic. It also features route protection for both authenticated users and admins.

---

## ⚙️ Tech Stack

- **React** (Vite)
- **Redux Toolkit** for global state
- **RTK Query** for data fetching and caching
- **React Router** for routing and protection
- **Tailwind CSS** for styling
- **React-icons** for icons

---

## 🔐 Environment Variables

The frontend uses a `.env` file for its base API URL. Add this in the root of the `/frontend` directory:

```env
VITE_BASE_URL=http://localhost:5000
```

## 🗂️ Project Structure

```
/frontend
├── public/
├── src/
│   ├── components/
│   │   ├── CategoryForm.jsx
│   │   ├── Header.jsx
│   │   ├── Loader.jsx
│   │   ├── Message.jsx
│   │   ├── Modal.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── ProgressSteps.jsx
│   ├── pages/
│   │   ├── Admin/
│   │   ├── Auth/
│   │   ├── Orders/
│   │   ├── Products/
│   │   └── User/
│   │   ├── Cart.jsx
│   │   ├── Home.jsx
│   │   └── Shop.jsx
│   ├── redux/
│   │   ├── store.js
│   │   ├── constants.js
│   │   ├── api/       # RTK Query API slices
│   │   └── features/  # Non-backend state slices
│   ├── utils/
│   │   ├── cart.js
│   │   └── localStorage.js
│   ├── App.jsx
│   ├── main.jsx      
│   └── index.css      
├── .env
└── package.json
```

## 🔐 Route Protection

In main.jsx, routes are protected using:

- <PrivateRoute /> – ensures user is logged in
- <AdminRoute /> – ensures user is an admin

These wrappers help prevent unauthorized access to sensitive pages.

## ⚛️ Redux

### The redux folder is divided into:

- api/ – uses RTK Query for backend data (e.g., products, orders, users). Auto-generates hooks.
- features/ – handles local-only states (e.g., UI, cart UI, etc.)
- constants.js – exports all API endpoint strings like:

```
export const BASE_URL = "";
export const USERS_URL = "/api/users";
export const CATEGORY_URL = "/api/category";
export const PRODUCT_URL = "/api/products";
export const UPLOAD_URL = "/api/upload";
export const ORDER_URL = "/api/orders";
```

## 🚀 Running the Frontend

### ▶️ Run Frontend only

```
npm run frontend
```

### ▶️ Run Frontend + Backend together

```
npm run dev
```
