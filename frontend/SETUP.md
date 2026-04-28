# GitLuma Frontend Setup Guide

## Prerequisites
- Node.js 16.0+ installed
- npm or yarn package manager

## Setup Steps

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

This will install:
- React & React Router
- Tailwind CSS
- Vite (build tool)
- All other required dependencies

### 3. Start development server
```bash
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 4. Open in browser
Visit: http://localhost:5173/

## Available Routes

### Main Pages
- `/` - Landing/Home page
- `/login` - Authentication
- `/dashboard` - Main dashboard (requires login)

### Documentation Pages (NEW)
- `/docs` - Documentation home
- `/docs/getting-started` - Getting started guide
- `/docs/api-reference` - REST API documentation
- `/docs/cli-tool` - CLI tool guide
- `/docs/integrations` - Third-party integrations
- `/docs/authentication` - OAuth 2.0 & security
- `/docs/sdk` - JavaScript SDK guide

## Navigation Features

### Home Page Navigation
- Top navbar with links to key sections
- "Documentation" button links to `/docs`
- CTA buttons for login/signup

### Documentation Navigation
- **Sidebar** (desktop): Quick links to all doc pages with active state highlighting
- **Mobile Menu** (mobile): Hamburger menu with navigation
- **"Back to Home" Button**: Available in both sidebar and navbar
- **Search**: Quick search functionality in sidebar (desktop)

## Available Scripts

### Development
```bash
npm run dev
```
Starts dev server with hot module replacement (HMR)

### Build
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### Preview
```bash
npm run preview
```
Preview production build locally

## Troubleshooting

### Port 5173 Already in Use
Vite will auto-select a new port:
```
➜  Local:   http://localhost:5174/
```

### Styling Issues
- Tailwind CSS cache: `npm run build` or restart dev server
- Check that `tailwind.config.js` exists in `CSS/` folder

### React Router Not Working
- Ensure all routes are properly defined in `main.jsx`
- Check component imports are correct
- Verify file paths in imports

### Memory Issues
If you see `JavaScript heap out of memory`:
```bash
node --max-old-space-size=4096 node_modules/vite/bin/vite.js
```

## Project Structure

```
frontend/
├── src/
│   ├── pages/           # Route pages
│   ├── Components/      # Reusable components
│   ├── context/         # React context
│   ├── hooks/           # Custom hooks
│   ├── api/             # API client
│   ├── locales/         # Internationalization
│   └── main.jsx         # Router & App setup
├── public/              # Static files
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind CSS config
```

## Development Tips

1. **Use React DevTools**: Install React DevTools browser extension
2. **Enable Source Maps**: Already enabled in dev mode for easy debugging
3. **Hot Module Replacement**: Changes save automatically - no manual refresh needed
4. **Inspect Network**: Use browser dev tools to check API calls to backend

## Connecting to Backend

Backend should be running on `http://localhost:5000`

API calls are configured in: `src/api/api.js`

To change backend URL:
```javascript
// src/api/api.js
const API_URL = 'http://localhost:5000'; // Change here
```

## Production Deployment

1. Build the app: `npm run build`
2. Upload `dist/` folder to hosting (Vercel, Netlify, etc.)
3. Set environment variables (if needed)
4. Configure backend URL for production

See `vercel.json` for Vercel deployment config.
