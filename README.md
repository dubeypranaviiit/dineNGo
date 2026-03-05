# 🍽️ Dinengo – Full-Stack Restaurant Management Platform

Dinengo is a **modern full-stack restaurant management platform** built with **Next.js App Router**, **MongoDB**, **Clerk authentication**, and **Stripe payments**.

It provides **online food ordering, table reservations, and a secure role-based admin dashboard** for managing restaurant operations.

---

# 🚀 Features

## 👤 Customer Features

Accessible to **all users** through the **public `(home)` route group**.

* 🏠 **Home Page** – Hero section and featured dishes
* 📋 **Menu Page** – Browse dishes by category
* 🛒 **Cart & Ordering**

  * Add items to cart
  * Place food orders
* 🍽️ **Table Reservation**

  * Select date, time, and number of guests
  * Reservation confirmation
* 💳 **Stripe Payment Integration**
* 📞 **Contact Page** – Customer queries stored in database
* 🔐 **Authentication**

  * Sign In / Sign Up using Clerk

---

# 🛠️ Admin & Staff Dashboard

Accessible **only to `admin` and `staff` roles** using **Role-Based Access Control (RBAC)**.

Protected through:

* Server-side role verification
* Next.js protected layouts
* API route authorization

### 🍔 Menu Management

* Add new menu items
* Update existing items
* Delete items

### 👨‍🍳 Staff Management

* Add new staff members
* Update staff details
* View staff list

### 🪑 Table Management

* Add restaurant tables
* Update seating capacity
* Manage table availability

### 📅 Reservation Management

* View reservations
* Approve or reject reservations
* Assign tables

### 📦 Order Management

* View incoming orders
* Accept or cancel orders

---

# 🔐 Role-Based Access Control (RBAC)

The platform supports **three user roles**:

| Role     | Access                 |
| -------- | ---------------------- |
| Customer | Public pages only      |
| Staff    | Admin dashboard access |
| Admin    | Full system access     |

RBAC is implemented using:

* **Clerk Authentication**
* **MongoDB user roles**
* **Next.js server components**
* **Protected Admin Layout**

Example protection logic:

```ts
const role = await getUserRole()

if (role === "customer") {
  redirect("/")
}
```

---

# 🧱 Tech Stack

## Frontend

* **Next.js 15 (App Router)**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**
* **Zustand (State Management)**

---

## Backend

* **MongoDB + Mongoose**
* **Next.js API Routes**
* **Stripe Payments**
* **Clerk Authentication**

---

# 📁 Project Structure

```
app
 ├─ (home)                # Public routes
 │   ├─ about
 │   ├─ cart
 │   ├─ contact
 │   ├─ menu
 │   ├─ order
 │   ├─ order-menu
 │   ├─ order-success
 │   ├─ reservation
 │   ├─ reservation-cancel
 │   ├─ reservation-success
 │   ├─ sign-in
 │   ├─ sign-up
 │   ├─ success
 │   ├─ layout.tsx
 │   └─ page.tsx
 │
 ├─ admin                 # RBAC protected dashboard
 │   ├─ add-item
 │   ├─ add-new-staff
 │   ├─ add-table
 │   ├─ approved-bookings
 │   ├─ booking-approval
 │   ├─ pending-reservations
 │   ├─ reservation-management
 │   ├─ update-item
 │   ├─ view-staff-list
 │   ├─ layout.tsx
 │   └─ page.tsx
 │
 ├─ api                   # Backend API routes
 │
 ├─ layout.tsx
 └─ globals.css
```

---

# 🗄️ Database Models

* **User** – Clerk-linked users with roles
* **Item** – Menu items
* **Order** – Food orders
* **Reservation** – Table bookings
* **Payment** – Stripe payment records
* **Table** – Restaurant tables
* **Staff** – Employee records
* **Contact** – Contact form messages

---

# 💳 Payments

Stripe is used for:

* Reservation payments
* Order checkout
* Payment status tracking

---

# ⚙️ Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

MONGODB_URI=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

---

# 🧪 Scripts

```
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

# 📌 Future Improvements

* Admin analytics dashboard
* Real-time order tracking
* Kitchen order display system
* Email & SMS notifications
* Multi-branch restaurant support

---

# 👨‍💻 Author

**Dinengo – Restaurant Management Platform**

Built with ❤️ using **Next.js, MongoDB, Clerk, and Stripe**

---

⭐ If you like this project, consider **starring the repository**!
