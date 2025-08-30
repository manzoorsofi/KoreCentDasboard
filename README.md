# Dashboard

This is a production-ready, mobile-first dashboard app built with Next.js, Tailwind CSS, and Material UI

The dashboard provides a clean, intuitive interface for visualizing data, including a dashboard overview, a responsive data table, interactive reports with AI-powered summaries, a chat interface, and user-configurable settings.

## Features

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with `Material/ui` components
- **Authentication**: A simple, UI-only login page.
- **Dashboard**: A central hub with key statistics and a user data table.
- **Stats Cards**: Animated cards displaying summary data like Total Users, Active Users, and Total Orders.
- **Responsive Data Table**: A client-side table for user data with:
  - Search/Filtering
  - Pagination
  - Column Sorting
- **Interactive Reports**: A dedicated page for data visualization with:
  - Charts by **Recharts**
  - Date range filtering
  - **Generative AI** summaries of report trends.
- **Chat**: A basic, clean chat interface.
- **Settings**: A panel to configure application settings.
- **Dark Mode**: A system-aware, user-toggleable dark mode that persists in `localStorage`.
- **Animations**: Subtle and professional animations powered by **Framer Motion**.
- **Responsive Design**: Mobile-first design that works seamlessly across all screen sizes.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/manzoorsofi/KoreCentDasboard.git
    cd KoreCentDasboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at **http://localhost:3000/**

For demo **https://korecentdasboard.netlify.app/**