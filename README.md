# 🎫 Eventaty - Premium Event Management Platform

![Eventaty Logo](./public/Logo.svg)

**Eventaty** is a modern, full-featured event discovery and booking platform designed to provide a seamless experience for both event-goers and organizers. Built with high performance and accessibility in mind, it offers a stunning UI with multi-language support (English & Arabic) and a robust booking system.

---

## ✨ Key Features

### � Discovery & Exploration
- **Browse by Category**: Easily find events that match your interests.
- **Advanced Search**: Search for specific events and venues with ease.
- **Home Slider**: Featured events highlighted for maximum visibility.
- **Venue Explorations**: Discover venues with detailed information, amenities, and location tracking.

### � Booking & Management
- **Seamless Booking**: A smooth multi-step booking process.
- **Digital Tickets**: Receive digital tickets with unique QR codes for entry.
- **Order History**: Track all your upcoming and past event bookings in your profile.

### �️ Dashboards
- **User Dashboard**: Manage your profile, view upcoming events, and access your tickets.
- **Admin Dashboard**:
  - **Metrics**: Real-time business insights (Total Revenue, Bookings, Events).
  - **Management**: Full CRUD operations for events and venues.
  - **User Insights**: Manage and view user activity.

### � Experience & UI
- **Multi-language Support**: Full support for English and Arabic (RTL support).
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Dark & Light Mode**: Seamless theme switching.
- **Premium Animations**: Powered by Framer Motion, Lenis Scroll, and Swiper for a high-end feel.

---

## � Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management & UI**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [Lenis Scroll](https://lenis.darkroom.engineering/), [Swiper](https://swiperjs.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Email & QR**: [Nodemailer](https://nodemailer.com/), [next-qrcode](https://github.com/bunlong/next-qrcode)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mohamed-Tarek-Mo/Eventaty.git
   cd Eventaty
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_email
   SMTP_PASS=your_app_password
   SMTP_SECURE=false

   BACKEND_URL="your_backend_api_url"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## � Project Structure

- `app/[locale]` - Main application routes with internationalization support.
- `components/` - Reusable UI components.
- `context/` - Application context providers.
- `i18n/` - Internationalization configuration.
- `messages/` - Translation files (en.json, ar.json).
- `public/` - Static assets (images, logos).
- `styles/` - Global styles and Tailwind configuration.
- `types/` - TypeScript type definitions.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and all rights are reserved.

---

Developed with ❤️ by the Eventaty Team.
