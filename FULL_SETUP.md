# 🚀 Complete Full Setup Guide - GitLuma

Follow these steps to get **everything working 100%**.

---

## Step 1: Install Prerequisites

### Node.js (if not installed)
- Download: https://nodejs.org/
- Install LTS version (16+)
- Verify: `node --version` and `npm --version`

### MongoDB (if not installed)

**Option A: Windows - MongoDB Service**
```bash
# 1. Download from https://www.mongodb.com/try/download/community
# 2. Run installer (.msi)
# 3. Check "Install as Service"
# 4. Finish installation

# 5. Start MongoDB
net start MongoDB

# 6. Verify connection
mongosh
# Type: exit
```

**Option B: Windows - MongoDB Portable (No Installation)**
```bash
# 1. Download MongoDB zip from https://www.mongodb.com/try/download/community-windows-x86_64-zip
# 2. Extract to C:\mongodb
# 3. Create data folder: C:\mongodb\data\db
# 4. Start MongoDB:
C:\mongodb\bin\mongod.exe --dbpath C:\mongodb\data\db
# Keep this window open
```

**Option C: Docker**
```bash
# If you have Docker installed
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

✅ **Check MongoDB is Running:**
```bash
mongosh
# If connected successfully, type: exit
```

---

## Step 2: Navigate to Backend Directory

```bash
cd c:\Users\User\Desktop\gitluma-output\backend
```

---

## Step 3: Install Backend Dependencies

```bash
npm install
```

Wait for all packages to install (~2 minutes)

---

## Step 4: Check Backend Configuration

**File:** `backend/.env`

Should contain:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gitluma
NODE_ENV=development
```

✅ If not, update it now

---

## Step 5: Start Backend Server

```bash
npm run dev
```

**Expected Output:**
```
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
socket and api connected
mongodb succesfuly connected!
```

✅ **If you see "mongodb succesfuly connected!" - MongoDB is working!**

Keep this terminal open.

---

## Step 6: Open New Terminal for Frontend

Open a **NEW** terminal window.

```bash
cd c:\Users\User\Desktop\gitluma-output\frontend
```

---

## Step 7: Install Frontend Dependencies

```bash
npm install
```

Wait for all packages to install (~1-2 minutes)

---

## Step 8: Start Frontend Server

```bash
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Frontend is running!

---

## Step 9: Open in Browser

Click this link: **http://localhost:5173/**

Or copy-paste in browser: `http://localhost:5173/`

---

## Step 10: Test Full Navigation

1. ✅ See landing page
2. ✅ Click "Documentation" button in navbar
3. ✅ Should go to `/docs` page
4. ✅ See sidebar with all 6 doc pages
5. ✅ Click "Getting Started"
6. ✅ See documentation with search, icons, back button
7. ✅ Click "← Back to Home" in navbar
8. ✅ Returns to home page

---

## Terminal Layout (3 Terminals Total)

**Terminal 1:**
```
MongoDB running (if using portable)
C:\mongodb\bin\mongod.exe --dbpath C:\mongodb\data\db
```

**Terminal 2:**
```
Backend server
$ npm run dev
✅ mongodb succesfuly connected!
```

**Terminal 3:**
```
Frontend server
$ npm run dev
✅ http://localhost:5173/
```

**Browser:**
```
http://localhost:5173/  ← Open this
```

---

## Troubleshooting

### Backend Shows "MongoDB connection error"

**Problem:** MongoDB is not running

**Solution:**
```bash
# Check if MongoDB service is running
net start MongoDB

# Or if using portable MongoDB, open that terminal window
```

### Frontend shows "Cannot GET /docs"

**Problem:** Routes are not set up correctly

**Solution:** 
- Ensure you're on http://localhost:5173/ (not :5000)
- Refresh page with Ctrl+R
- Check browser console for errors

### Port 5000 Already in Use

**Problem:** Something else is using port 5000

**Solution:**
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Or change port in backend/.env
PORT=5001
```

### Port 5173 Already in Use

**Problem:** Something else is using port 5173

**Solution:**
- Vite will auto-select a new port
- Check console for new URL like http://localhost:5174/

---

## Verify Everything is Working

### Backend ✅
- Opens on http://localhost:5000/
- Connects to MongoDB
- Shows "mongodb succesfuly connected!"

### Frontend ✅
- Opens on http://localhost:5173/
- All routes work
- Documentation pages load
- Search works in sidebar
- Back button works

### Full User Flow ✅
1. Home page loads
2. Click "Documentation" → goes to /docs
3. Click "Getting Started" → goes to /docs/getting-started
4. Page loads with content
5. Click "← Back to Home" → back to home
6. All working perfectly!

---

## What Each Terminal Does

**MongoDB Terminal** (Keep open)
- Stores all data
- Backend connects to this

**Backend Terminal** (Keep open)
```bash
npm run dev
```
- Node.js server on http://localhost:5000/
- Connects to MongoDB
- Provides API endpoints
- Auto-restarts on code changes (nodemon)

**Frontend Terminal** (Keep open)
```bash
npm run dev
```
- React app on http://localhost:5173/
- Communicates with backend at :5000
- Hot reloads on code changes (Vite)

---

## Daily Startup (After First Setup)

1. **Start MongoDB** (if not auto-started)
   ```bash
   net start MongoDB
   ```

2. **Terminal 1 - Backend**
   ```bash
   cd backend
   npm run dev
   ```

3. **Terminal 2 - Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open Browser**
   ```
   http://localhost:5173/
   ```

Done! Everything running! ✅

---

## Documentation

| File | Purpose |
|------|---------|
| README.md | Project overview |
| QUICKSTART.md | 5-minute quick start |
| MONGODB_SETUP.md | MongoDB installation & setup |
| VERIFICATION.md | Testing checklist |
| SETUP.md (backend) | Backend details |
| SETUP.md (frontend) | Frontend details |

---

## Next Steps

Once everything is running:
- ✅ Explore documentation pages
- ✅ Test all navigation
- ✅ Start developing features
- ✅ Add new routes and pages
- ✅ Build your features

---

## Support Quick Reference

### Ports Used
- Frontend: **5173**
- Backend: **5000**
- MongoDB: **27017**

### Key Files
- Backend config: `backend/.env`
- Backend server: `backend/server.js`
- Frontend router: `frontend/src/main.jsx`
- Documentation pages: `frontend/src/pages/docs/`

### Environment Variables
```bash
# backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gitluma
NODE_ENV=development
```

### Commands
```bash
# Backend development
npm run dev       # Start with auto-reload

# Frontend development  
npm run dev       # Start with hot reload
npm run build     # Build for production
npm run preview   # Preview production build
```

---

**Status: ✅ COMPLETE & FULLY SETUP**

Everything is installed and ready to use!

If you run into any issues, check:
1. MongoDB is running (`net start MongoDB`)
2. All dependencies installed (`npm install`)
3. Environment variables are correct (`.env` file)
4. No processes using ports 5000, 5173, or 27017

🎉 **Happy coding!**
