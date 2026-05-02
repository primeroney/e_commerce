# 🛍️ ShopNest — Full-Stack E-Commerce Website

A complete, production-ready e-commerce web application built with:
- **Frontend:** React.js, React Router, Axios, React Toastify
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT (JSON Web Tokens)

---

## 📁 Project Structure

```
ecommerce/
├── backend/          ← Node.js + Express API
│   ├── models/       ← MongoDB schemas
│   ├── routes/       ← API routes
│   ├── middleware/   ← Auth middleware
│   ├── server.js     ← Entry point
│   ├── seed.js       ← Sample data seeder
│   └── .env          ← Environment config
└── frontend/         ← React app
    └── src/
        ├── pages/    ← All page components
        ├── components/ ← Shared components
        ├── context/  ← Auth & Cart context
        └── utils/    ← Axios API utility
```

---

## ⚙️ Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)
- npm (comes with Node.js)

---

## 🚀 Setup & Run Instructions

### Step 1 — Start MongoDB
Make sure MongoDB is running on your machine:
```
mongod
```
(Or use MongoDB Compass / Atlas)

---

### Step 2 — Setup Backend

```bash
cd backend
npm install
```

The `.env` file is pre-configured. Edit if needed:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

Seed the database with sample products and users:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```
Backend runs at: **http://localhost:5000**

---

### Step 3 — Setup Frontend

Open a new terminal:
```bash
cd frontend
npm install
npm start
```

Frontend runs at: **http://localhost:3000**

---

## 🔑 Demo Login Credentials

| Role  | Email                  | Password  |
|-------|------------------------|-----------|
| Admin | admin@shopify.com      | admin123  |
| User  | john@example.com       | john123   |

---

## 📄 Pages & Features

| Page             | Route              | Description                        |
|------------------|--------------------|------------------------------------|
| Home             | /                  | Hero, categories, featured products |
| Products         | /products          | Browse, filter, sort, paginate     |
| Product Detail   | /products/:id      | Images, info, reviews              |
| Cart             | /cart              | Manage cart, price summary         |
| Checkout         | /checkout          | 3-step: Shipping → Payment → Review|
| Login            | /login             | JWT auth with demo accounts        |
| Register         | /register          | Create account                     |
| Profile          | /profile           | Edit name, address, password       |
| My Orders        | /orders            | Order history with status          |
| Order Detail     | /orders/:id        | Full order details + tracker       |
| Wishlist         | /wishlist          | Saved products                     |
| About Us         | /about             | Company info, team, values         |
| Contact          | /contact           | Contact form + FAQ                 |
| Admin Dashboard  | /admin             | Stats overview                     |
| Admin Products   | /admin/products    | CRUD product management            |
| Admin Orders     | /admin/orders      | Order status management            |

---

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET  /api/auth/profile` — Get profile (auth required)
- `PUT  /api/auth/profile` — Update profile (auth required)

### Products
- `GET  /api/products` — List with filters
- `GET  /api/products/:id` — Single product
- `POST /api/products` — Create (admin)
- `PUT  /api/products/:id` — Update (admin)
- `DELETE /api/products/:id` — Delete (admin)

### Orders
- `POST /api/orders` — Place order (auth)
- `GET  /api/orders/myorders` — My orders (auth)
- `GET  /api/orders/:id` — Order detail (auth)
- `GET  /api/orders` — All orders (admin)
- `PUT  /api/orders/:id/status` — Update status (admin)

### Reviews
- `POST /api/reviews/:productId` — Add review (auth)

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React 18, React Router 6 |
| Styling   | Pure CSS with variables |
| HTTP      | Axios                   |
| Backend   | Node.js, Express        |
| Database  | MongoDB, Mongoose       |
| Auth      | JWT, bcryptjs           |
| Toasts    | react-toastify          |

---

## 🎨 Features

- ✅ Full user authentication (register/login/logout)
- ✅ Product listing with search, filter by category/price, sort
- ✅ Product detail with image gallery and star ratings
- ✅ Customer reviews system
- ✅ Shopping cart with localStorage persistence
- ✅ Multi-step checkout (Shipping → Payment → Review)
- ✅ Order history and order tracking
- ✅ Wishlist functionality
- ✅ Admin dashboard with stats
- ✅ Admin product CRUD management
- ✅ Admin order status management
- ✅ Fully responsive (mobile + desktop)
- ✅ Protected routes (auth + admin)
- ✅ Sample data seeder (12 products, 2 users)
