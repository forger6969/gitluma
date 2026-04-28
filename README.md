# 🚀 GitLuma - Project Complete Setup Guide

GitLuma is a full-stack application for collaborative GitHub project management with real-time updates and comprehensive documentation.

## 📋 Quick Start

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open: http://localhost:5173

### Option 2: Just Backend
```bash
cd backend && npm install && npm run dev
```
Runs on http://localhost:5000

## ✅ System Status

### Backend Status
- ✅ Express.js API server
- ✅ MongoDB integration with Mongoose
- ✅ Socket.io real-time communication
- ✅ Environment variables configured
- ✅ Error handling middleware
- ✅ CORS enabled

**Start:** `cd backend && npm run dev`
**Expected:** `socket and api connected` + `mongodb succesfuly connected!`

### Frontend Status
- ✅ React + React Router v6
- ✅ Tailwind CSS styling
- ✅ 6 comprehensive documentation pages
- ✅ Mobile-responsive navigation
- ✅ Desktop sidebar + mobile hamburger menu
- ✅ "Back to Home" navigation from all doc pages

**Start:** `cd frontend && npm run dev`
**URL:** http://localhost:5173

## 🗺️ Navigation Map

### Home Page (`/`)
```
┌─────────────────────────────────────┐
│  Navbar                             │
│  [Logo] [Nav Items] [CTA Buttons]   │
│  "Documentation" button → /docs     │
└─────────────────────────────────────┘
         ↓ Click Documentation
         ↓
    /docs (Main Docs Hub)
```

### Documentation Hub (`/docs`)
```
┌──────────────────────────────────────────────────────┐
│ Navbar with [Home ←] button in top-right             │
├──────────────────┬──────────────────────────────────┤
│ Sidebar          │ Main Content                     │
│ (Desktop only)   │                                  │
│ ├─ ← Back Home   │ - Quick Start                    │
│ ├─ Getting       │ - Feature Highlights             │
│ ├─ API Ref       │ - Links to All 6 Pages           │
│ ├─ CLI Tool      │                                  │
│ ├─ Integration   │ Mobile: Hamburger ☰ menu        │
│ ├─ Auth          │                                  │
│ └─ SDK           │                                  │
└──────────────────┴──────────────────────────────────┘
```

### Individual Doc Pages (`/docs/*`)
```
┌──────────────────────────────────────────────────────┐
│ Navbar with [Home ←] button                          │
├──────────────────┬──────────────────────────────────┤
│ Sidebar          │ Page Content                     │
│ (Desktop only)   │ (With animations)                │
│ (Active Page)    │                                  │
│ Highlights       │ Mobile: Hamburger ☰ menu        │
│ with Coral Color │                                  │
└──────────────────┴──────────────────────────────────┘
```

## 📄 Documentation Pages

All documentation pages are accessible from `/docs`:

1. **Getting Started** (`/docs/getting-started`)
   - Installation guide
   - Quick start steps
   - System requirements
   - Troubleshooting

2. **API Reference** (`/docs/api-reference`)
   - REST API endpoints
   - Request/response examples
   - Error handling
   - Rate limiting

3. **CLI Tool** (`/docs/cli-tool`)
   - Command-line interface
   - Available commands
   - Configuration
   - Usage examples

4. **Integrations** (`/docs/integrations`)
   - GitHub integration
   - Third-party services (Slack, Discord, Teams, etc.)
   - Setup guides
   - Coming soon integrations

5. **Authentication** (`/docs/authentication`)
   - OAuth 2.0 flow
   - Personal access tokens
   - Token scopes
   - Security best practices

6. **SDK** (`/docs/sdk`)
   - JavaScript SDK
   - React hooks
   - TypeScript support
   - Code examples

## 🎯 Key Features

### Navigation Features
- ✅ **Home Button**: From any documentation page, click "[←] Home" in navbar or sidebar
- ✅ **Active State**: Current page highlighted in sidebar (coral color on desktop)
- ✅ **Mobile Menu**: Hamburger menu on mobile/tablet devices
- ✅ **Responsive**: Sidebar visible on desktop (lg:), mobile menu on smaller screens
- ✅ **Search**: Quick search functionality in sidebar (desktop)
- ✅ **Animations**: Smooth transitions and WOW effects on doc pages

### Technical Features
- ✅ **Real-time Updates**: Socket.io integration
- ✅ **Type Safety**: Full TypeScript support in docs
- ✅ **Code Examples**: All examples tested and working
- ✅ **Mobile First**: Responsive design for all devices
- ✅ **Accessibility**: Semantic HTML and keyboard navigation

## 🔧 Configuration Files

### Backend Configuration
```bash
backend/.env
├── PORT=5000
├── MONGODB_URI=mongodb://localhost:27017/gitluma
└── NODE_ENV=development
```

### Frontend Routes
```javascript
frontend/src/main.jsx
├── / → Home
├── /login → Login
├── /dashboard → Dashboard
├── /docs → Documentation Hub
├── /docs/getting-started → Getting Started
├── /docs/api-reference → API Reference
├── /docs/cli-tool → CLI Tool
├── /docs/integrations → Integrations
├── /docs/authentication → Authentication
└── /docs/sdk → SDK
```

## 🚀 Deployment

### Backend Deployment (Node.js/Vercel/Heroku)
```bash
npm run build
# or deploy backend/ directory to hosting platform
```

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# dist/ folder ready for deployment
# Vercel config in vercel.json
```

See `backend/SETUP.md` and `frontend/SETUP.md` for detailed setup instructions.

## ❌ Troubleshooting

### Backend Issues
1. MongoDB connection error?
   - Check `.env` file has `MONGODB_URI`
   - Ensure MongoDB service is running
   - See `backend/SETUP.md`

2. Port already in use?
   - Change PORT in `.env` file
   - Or kill process on port 5000

### Frontend Issues
1. Routes not working?
   - Check all routes defined in `main.jsx`
   - Verify component imports are correct

2. Styling broken?
   - Restart dev server
   - Check `tailwind.config.js` exists

3. Mobile menu not showing?
   - Check that `mobileMenuOpen` state is working
   - Verify onClick handlers on menu button

### Common Solutions
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules && npm install`
- Check logs in browser console and terminal

## 📞 Support

For issues:
1. Check relevant `SETUP.md` file (backend or frontend)
2. Review documentation pages at `/docs`
3. Check browser console for errors
4. Verify environment configuration

## 📊 Project Structure

```
gitluma-output/
├── backend/
│   ├── .env (MongoDB, PORT config)
│   ├── server.js (Main entry point)
│   ├── app.js (Express setup)
│   ├── controllers/ (Route handlers)
│   ├── models/ (MongoDB schemas)
│   ├── routes/ (API endpoints)
│   ├── middlewares/ (Auth, errors)
│   ├── socket/ (Real-time events)
│   ├── utils/ (Helpers)
│   └── SETUP.md (Backend guide)
│
└── frontend/
    ├── src/
    │   ├── main.jsx (Routes)
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Documentation.jsx (Main hub)
    │   │   ├── docs/
    │   │   │   ├── DocLayout.jsx (Shared layout)
    │   │   │   ├── GettingStarted.jsx
    │   │   │   ├── APIReference.jsx
    │   │   │   ├── CLITool.jsx
    │   │   │   ├── Integrations.jsx
    │   │   │   ├── Authentication.jsx
    │   │   │   └── SDK.jsx
    │   │   └── ... other pages
    │   ├── Components/
    │   ├── context/
    │   ├── hooks/
    │   └── api/
    ├── vite.config.js
    ├── tailwind.config.js
    └── SETUP.md (Frontend guide)
```

## ✨ What's New

**Latest Updates:**
- ✅ 6 comprehensive documentation pages with full content
- ✅ Unified DocLayout component with sidebar navigation
- ✅ Mobile hamburger menu for documentation
- ✅ "Back to Home" buttons in navbar and sidebar
- ✅ Active page highlighting in sidebar
- ✅ Responsive design for all devices
- ✅ CodeBlock component with copy functionality
- ✅ Smooth animations and transitions
- ✅ Search functionality in sidebar
- ✅ Complete API error handling

---

**Status: ✅ Complete & Ready for Development**

Start coding and enjoy! 🎉
