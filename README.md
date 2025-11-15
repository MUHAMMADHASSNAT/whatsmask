# Modern SaaS Admin Dashboard

A complete, modern SaaS admin dashboard built with React, TypeScript, and Tailwind CSS. Features a clean, minimal design with glassmorphism effects, soft shadows, and professional styling.

## Features

- 🎨 Modern SaaS UI with glassmorphism and soft shadows
- 📊 Interactive dashboard with statistics cards and charts
- 📱 Fully responsive design (Desktop, Tablet, Mobile)
- 🎯 Complete sidebar navigation with icons
- 📋 Data tables with search, filters, and pagination
- ⚙️ Comprehensive settings pages
- 🔧 Setup panel with slide-out menu
- 🎨 Custom color scheme (Primary Blue: #4A77FF, Light Purple: #DAD6FF)

## Pages Included

### Main Dashboard
- Welcome widget with timestamp
- 4 Statistics cards (Subscriptions, Earnings, Clients, Campaigns)
- Earnings Report chart (Line chart with dual lines)
- Best Selling Plan box

### Navigation Pages
- Tenants
- Sales (Subscriptions, Invoices, Transactions, Credit Management)
- Plans
- Support (Tickets)
- WhatsApp Webhook Settings
- Settings (Payment, Website, System)

### Setup Menu (Slide-out Panel)
- Users
- Roles
- Departments
- Languages
- Theme
- Currency
- Taxes
- FAQ
- Pages
- Email Templates
- System Logs
- Modules

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Recharts** - Charts
- **Lucide React** - Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Sidebar.tsx         # Left sidebar navigation
│   ├── TopBar.tsx          # Top navigation bar
│   ├── SetupPanel.tsx      # Slide-out setup menu
│   ├── StatCard.tsx        # Statistics card component
│   └── DataTable.tsx       # Reusable data table
├── pages/
│   ├── Dashboard.tsx       # Main dashboard page
│   ├── Tenants.tsx
│   ├── Subscriptions.tsx
│   ├── Invoices.tsx
│   ├── Transactions.tsx
│   ├── CreditManagement.tsx
│   ├── Plans.tsx
│   ├── Tickets.tsx
│   ├── WebhookSettings.tsx
│   ├── PaymentSettings.tsx
│   ├── WebsiteSettings.tsx
│   ├── SystemSettings.tsx
│   └── Setup/
│       ├── Users.tsx
│       ├── Roles.tsx
│       ├── Departments.tsx
│       ├── Languages.tsx
│       ├── Theme.tsx
│       ├── Currency.tsx
│       ├── Taxes.tsx
│       ├── FAQ.tsx
│       ├── Pages.tsx
│       ├── EmailTemplates.tsx
│       ├── SystemLogs.tsx
│       └── Modules.tsx
├── App.tsx                 # Main app component with routing
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## Design System

### Colors
- Primary Blue: `#4A77FF`
- Light Purple: `#DAD6FF`
- Background Grey: `#F7F7F7`
- Soft Shadow: `0 4px 15px rgba(0,0,0,0.05)`

### Fonts
- Inter
- Poppins

### Components
- Rounded corners (rounded-xl)
- Glassmorphism effects
- Soft shadows
- Consistent spacing and padding

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

