# TunisiaTrip.kr 🇹🇳🇰🇷

TunisiaTrip.kr is a premium, professional travel platform dedicated to promoting Tunisia's unique culture, history, and destinations to the South Korean market. The platform provides comprehensive travel information, curated itineraries, and seamless communication with local travel experts.

## 🌟 Key Features

- **Korean-Optimized Content**: Fully localized and tailored for the South Korean market with deep cultural integration.
- **Interactive Travel Guide**: Detailed information on cities, culture, regions, and activities across Tunisia.
- **Professional Admin Dashboard**: 
  - **Blog Management**: Full CMS for creating and editing travel stories.
  - **Trip Management**: Manage activities, hotels, and guest houses.
  - **User Management**: Add, edit, and manage system administrators.
  - **SEO Control**: Manage metadata and search engine indexing directly.
- **Smart Contact System**: Integrated inquiry forms with database persistence and email notifications.
- **AI-Powered Assistance**: Integrated chat assistant to help travelers with their inquiries.
- **Advanced SEO**: Pre-configured for Google, Naver, Bing, and Daum with JSON-LD structured data and dynamic meta tags.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)

### Backend & Infrastructure
- **BaaS**: [Supabase](https://supabase.com/)
  - **Authentication**: Secure admin login and user management.
  - **Database**: PostgreSQL for storing blogs, contacts, and trips.
  - **Edge Functions**: Deno-based serverless functions for emails and AI.
- **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async) for dynamic metadata management.
- **Deployment**: Optimized for [Netlify](https://www.netlify.com/) with SPA prerendering.

## 🛠️ Project Structure

```text
src/
├── components/     # Reusable UI components
│   ├── admin/      # Admin-specific components
│   ├── home/       # Home page sections
│   ├── seo/        # SEO & Structured Data components
│   └── translation/# Localization utilities for Korean content
├── contexts/       # React Contexts (Auth, etc.)
├── hooks/          # Custom React hooks (useTranslation, useContacts, etc.)
├── layouts/        # Page layouts (Main, Admin)
├── pages/          # Main page components
├── translations/   # Localization dictionary files (Korean)
└── utils/          # Helper functions and route optimizations
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/linksprod/TunisiaTrip.kr.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📈 SEO Optimization
The project includes a robust SEO system:
- **DynamicMetaTags**: Automatically updates Page Title, Description, and OG Tags based on route.
- **GlobalSEO**: Manages search engine verification and JSON-LD structured data.
- **Robots & Sitemaps**: Pre-configured for optimal crawling by Naver and Google.

## 📄 License
This project is proprietary and confidential.

---
Developed by **Atlantis Travel Tunisia** & **TunisiaTrip Team**.
