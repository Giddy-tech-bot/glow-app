# Glow ✦ Social Beauty Discovery, Appointment Booking & Marketplace

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Glow** is a modern, social-first web application connecting beauticians, beauty clients, and cosmetic shop owners. It enables clients to discover trending looks and video reels, book salon appointments with transparent deposit tracking, and buy genuine beauty products with doorstep delivery.

---

## 🌟 Key Features

### 1. 💼 Beautician Pro Booking Dashboard ("The Service Provider")
- **Schedule Management**: View upcoming appointments, exact times, dates, and client contact details.
- **Service & Style Requests**: Clear visibility into the exact hairstyle or beauty service required (e.g. *Boho Knotless Braids*, *Full Red Carpet Glam*, *Russian BIAB Nails*).
- **Client Preferences**: Highlights client-submitted notes (skin allergies, event themes, preferred shades).
- **Financial Breakdown**: Tracks 20% commitment deposits received via M-Pesa and 80% remaining balances payable on arrival.
- **1-Tap Client Actions**: Quick WhatsApp button (with pre-filled appointment confirmation) and phone call link.
- **Status Controls**: Mark sessions as completed, confirm bookings, or launch the camera to snap before/after results.

### 2. 🛍️ Beauty Shop Owner Portal ("The Merchant")
- **Product Listing Tool**: List beauty supplies, hair extensions, serums, setting sprays, and nail kits with photos, stock count, and price in KSh.
- **Inventory Management**: Real-time stock tracking, price adjustments, and catalog controls.
- **Customer Retail Orders**: Live feed of customer orders with delivery addresses, courier tracking codes, and fulfillment status.
- **Sales Analytics**: Track 100% full upfront retail product revenue deposited to merchant accounts.

### 3. 👤 Dedicated Customer Dashboard ("The Client")
- **Separated Appointments Tab**: View confirmed salon appointments, dates/times, beautician profiles, 20% deposit receipts, and remaining balances.
- **Separated Product Orders Tab**: Track physical product orders with live status (*Processing*, *Out for Delivery*, *Delivered*) and tracking codes.
- **Saved Looks & Wishlist**: Bookmark inspiring hairstyles and makeup tutorials from the social feed for your next salon appointment.

### 4. 💳 Separated Payment Architecture
- **Service Bookings**: 20% commitment deposit directly routed to the Beautician's M-Pesa Till. The remaining 80% is payable in-salon.
- **Product Purchases**: 100% upfront payment (goods + courier delivery) directly routed to the Shop Owner's merchant account.

### 5. 📸 Live Camera & Video Studio
- **Live In-App Camera (`getUserMedia`)**: Snap high-definition before/after photos directly within the app.
- **Video Reel Recorder (`MediaRecorder`)**: Record live video clips with an in-app recording timer and blinking REC indicator.
- **Instant Publishing**: Add captions, beauty categories, and service price tags to immediately publish to the **Social Lookbook** and the beautician's **Portfolio Work**.

### 6. 🎬 Social Lookbook & Video Reels Feed
- Interactive feed with like counters, live commenting, bookmarking, and video player support.
- Service tags on looks allowing clients to click **"Book This Look"** directly from the video reel.

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Bundler & Dev Server**: Vite 6
- **Icons**: Lucide React
- **Styling**: Pure Modern CSS with custom variables, Glassmorphism, and responsive layouts
- **Media APIs**: HTML5 Canvas, MediaStream / Web Camera API, MediaRecorder API
- **State & Storage**: React State with `localStorage` persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Giddy-tech-bot/glow-app.git
   cd glow-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📱 Role Switching (Demo Mode)

Use the **Role Switcher** in the top navigation bar to test all three experiences:
1. **Customer**: `Grace K.` (Browse looks, book appointments, purchase products, view personal hub).
2. **Beautician**: `Njeri Beauty` (View client bookings schedule, hair/makeup requirements, snap/record reels).
3. **Shop Owner**: `Nairobi Glam Beauty Supplies` (List beauty products, manage stock, dispatch customer orders).

---

## 📄 License

This project is licensed under the MIT License.
