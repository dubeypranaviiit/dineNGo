# 🍽️ Dinengo – Full‑Stack Restaurant Management Website

Dinengo is a **modern full‑stack restaurant website** built with **Next.js App Router**, **MongoDB**, and **Clerk authentication**. It supports **online food ordering, table reservations, payments, and complete admin/staff management** in a single platform.

---

## 🚀 Features

### 👤 Customer Features

* 🏠 **Home Page** – Hero section, featured dishes, testimonials
* ℹ️ **About Page** – Restaurant story & values
* 📞 **Contact Us Page** – Customer queries stored in database
* 📋 **Menu Page** – Browse food items by category & diet
* 🛒 **Order Page**

  * Add items to cart
  * Dropdown order flow
  * View ordered items
* 🍽️ **Table Reservation**

  * Select date, time & number of guests
  * Stripe payment integration
  * Reservation confirmation & history
* 🔐 **Authentication** using Clerk (Sign In / Sign Up)

---

### 🛠️ Admin Features

* 📦 **Order Management**

  * View incoming orders
  * Accept / cancel orders
* 👨‍🍳 **Staff Management**

  * Add / update / delete staff
  * Staff entry & role management
* 🪑 **Table Management**

  * Add tables
  * Update seating capacity & status
* 🍔 **Menu Management**

  * Insert new items
  * Update existing menu
  * Delete items
* 📅 **Reservation Management**

  * Approve / reject reservations
  * Assign tables

---

### 👷 Staff Features

* 🔐 Staff entry page
* 📋 View assigned orders & reservations

---

## 🧱 Tech Stack

### Frontend

* **Next.js 15 (App Router)**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion** (animations)
* **Zustand** (state management)

### Backend

* **MongoDB + Mongoose**
* **Next.js API Routes**
* **Stripe** (payments)
* **Clerk** (authentication & user management)

---

## 📁 Project Structure

```
app/
 ├─ (home)/
 ├─ about/
 ├─ contact/
 ├─ menu/
 ├─ order/
 ├─ reservation/
 ├─ admin/
 │   ├─ add-item
 │   ├─ add-table
 │   ├─ staff-management
 │   ├─ reservation-management
 │   └─ order-approval
 ├─ api/
 ├─ sign-in/
 ├─ sign-up/
 └─ layout.tsx

components/
 ├─ Header.tsx
 ├─ Footer.tsx
 ├─ DishCard.tsx
 ├─ Reservation.tsx
 └─ UI Components

models/
 ├─ User.ts
 ├─ Item.ts
 ├─ Order.ts
 ├─ Reservation.ts
 ├─ Payment.ts
 ├─ Table.ts
 ├─ Staff.ts
 └─ Contact.ts

store/
 ├─ cartStore.ts
 ├─ reservationStore.ts
 └─ itemStore.ts
```

---

## 🗄️ Database Models

* **User** – Clerk‑linked users (customer/admin/staff)
* **Item** – Menu items
* **Order** – Food orders
* **Reservation** – Table bookings
* **Payment** – Stripe payment records
* **Table** – Restaurant tables
* **Staff** – Employee records
* **Contact** – Contact form messages

---

## 💳 Payments

* Stripe Checkout
* Reservation & order payments
* Payment status tracking

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MONGODB_URI=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

---

## 🧪 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📌 Future Improvements

* Role‑based dashboard UI
* Real‑time order updates
* Analytics dashboard
* Email & SMS notifications

---

## 👨‍💻 Author

**Dinengo Restaurant Website**
Built with ❤️ using Next.js & MongoDB

---

## ⭐ Support

If you like this project, don’t forget to ⭐ the repository!
