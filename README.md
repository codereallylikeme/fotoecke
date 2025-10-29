# 📸 Fotoecke - Professional Photo Booth Rental Service

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)](https://mongoosejs.com/)

**Fotoecke** is a modern, multilingual Next.js web application for a professional photo booth rental business serving Germany. The platform offers DSLR and iPad photo booth rentals for weddings, birthdays, corporate events, and special occasions.

## 🚀 Key Features

- **🌍 Internationalization**: Full German/English support with `next-intl`
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🔐 Authentication System**: NextAuth.js with role-based access (Admin/Staff/User)
- **📊 Booking Management**: Complete booking system with admin dashboard
- **🎨 Modern UI Components**: Built with Radix UI and custom components
- **⚡ Performance Optimized**: Next.js 15.5.3 with App Router, image optimization
- **🔍 SEO Enhanced**: Comprehensive metadata, structured data (JSON-LD), robots.txt, sitemap
- **📧 Email Integration**: Nodemailer for booking confirmations
- **🗄️ Database**: MongoDB with Mongoose ODM

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Authentication**: NextAuth.js
- **Database**: MongoDB + Mongoose
- **Internationalization**: next-intl
- **UI Components**: Radix UI, Lucide React icons
- **Animation**: Framer Motion
- **Email**: Nodemailer
- **Deployment**: Optimized for Vercel

## 📁 Project Structure

```
fotoecke/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── admin/         # Admin dashboard
│   │   │   ├── bookings/  # Booking management
│   │   │   └── users/     # User management
│   │   ├── booking/       # Public booking system
│   │   ├── login/         # Authentication
│   │   ├── register/      # User registration
│   │   └── staff/         # Staff interface
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth endpoints
│   │   └── booking/       # Booking API
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Root page
│   ├── robots.ts          # SEO robots
│   └── sitemap.ts         # SEO sitemap
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── header.tsx         # Navigation
│   ├── hero-section.tsx   # Landing hero
│   └── ...                # Other components
├── lib/                   # Utility functions
│   ├── auth.ts            # Authentication config
│   ├── mongoose.ts        # Database connection
│   └── utils.ts           # Helper functions
├── models/                # MongoDB schemas
│   ├── Booking.ts         # Booking model
│   └── User.ts            # User model
├── messages/              # i18n translations
│   ├── de/                # German translations
│   └── en/                # English translations
├── types/                 # TypeScript definitions
├── data/                  # Static data
└── public/                # Static assets
```

## 🎯 Business Features

### Photo Booth Services
- **DSLR Photo Booths**: Professional camera setups with high-quality output
- **iPad Photo Booths**: Modern touch interface for interactive experiences
- **Service Coverage**: 25km radius with free setup and delivery
- **Event Types**: Weddings, birthdays, corporate events, graduations

### Digital Features
- **Instant Sharing**: QR codes, email, and SMS delivery
- **Custom Branding**: Event-specific logos, themes, and layouts
- **Digital Gallery**: Complete post-event photo collections
- **Professional Prints**: High-quality, customizable print options

### Admin Features
- **Booking Dashboard**: Complete booking lifecycle management
- **User Management**: Customer and staff account administration
- **Analytics**: Event tracking and performance metrics
- **Multi-language Support**: German and English interfaces

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fotoecke.git
   cd fotoecke
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Authentication
   NEXTAUTH_SECRET=your-nextauth-secret-key
   NEXTAUTH_URL=http://localhost:3001
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/fotoecke
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3001
   
   # Email (Optional)
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_FROM=noreply@fotoecke.com
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3001](http://localhost:3001)

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically with every push to main branch

### Other Platforms

The application can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean
- AWS
- Google Cloud Platform

## 🔧 Configuration

### Internationalization

The app supports German and English. To add more languages:

1. Add locale to `i18n/routing.ts`
2. Create translation files in `messages/[locale]/`
3. Update the routing configuration

### Authentication

The app uses NextAuth.js with multiple providers. Current setup supports:
- Credentials (email/password)
- Extendable to OAuth providers (Google, Facebook, etc.)

### Database Models

- **User**: Customer and staff accounts with role-based permissions
- **Booking**: Event bookings with status tracking and details

## 📊 SEO & Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Core Web Vitals**: LCP, FID, CLS optimized
- **Structured Data**: JSON-LD schema for local business
- **Meta Tags**: Comprehensive social media and search engine tags
- **Sitemap & Robots**: Automated SEO file generation

## 🛡️ Security

- **Authentication**: Secure session management
- **Data Validation**: Input sanitization and validation
- **Rate Limiting**: API endpoint protection
- **Environment Variables**: Sensitive data protection
- **CSRF Protection**: Built-in Next.js security features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: info@fotoecke.com
- Website: [fotoecke.com](https://fotoecke.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [MongoDB](https://www.mongodb.com/) - Database platform
- [Tailus](https://tailus.io/) - UI blocks and components for modern web design

---

