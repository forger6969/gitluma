# MongoDB Setup & Connection Guide

## Problem
MongoDB service is not running on your system. The backend is trying to connect to `mongodb://localhost:27017` but it's not available.

## Solution - Start MongoDB

### Option 1: MongoDB is Installed (Recommended)

**On Windows - Using Command Prompt (as Administrator):**

```bash
# Start MongoDB service
net start MongoDB
```

If you get an error like "service not found", go to Option 2.

**Check if MongoDB is running:**
```bash
mongosh
# If connected successfully, type: exit
```

### Option 2: MongoDB is NOT Installed

**Download & Install MongoDB Community Edition:**

1. Go to: https://www.mongodb.com/try/download/community
2. Select Windows
3. Click Download
4. Run the installer (.msi file)
5. Follow installation steps
6. Choose "Install MongoDB as a Service" (checked by default)
7. Finish installation

After installation:
```bash
# Start the MongoDB service
net start MongoDB
```

### Option 3: Using Docker (Alternative)

If you have Docker installed, run:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

## Quick Start Commands

Once MongoDB is running, run these in separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Expected output from Backend:**
```
[nodemon] starting `node server.js`
socket and api connected
mongodb succesfuly connected!
```

✅ When you see **"mongodb succesfuly connected!"** - MongoDB is working!

---

## Verify MongoDB is Working

**In a new terminal, test connection:**
```bash
mongosh
```

If it connects, type:
```javascript
db.version()
exit
```

---

## Troubleshooting

### Error: "The specified service does not exist as an installed service"
- MongoDB is not installed
- Follow Option 2 above to install it

### Error: "Access is denied"
- Run Command Prompt **as Administrator**
- Then run: `net start MongoDB`

### Error: "service is already running"
- MongoDB is already running ✅
- Skip to starting the backend

### Port 27017 Already in Use
```bash
# Find what's using port 27017
netstat -ano | findstr :27017

# If you need to use different port, change .env:
MONGODB_URI=mongodb://localhost:27018/gitluma
```

---

## Complete Setup Steps (First Time)

1. **Install MongoDB** (if not already installed)
   - Download from https://www.mongodb.com/try/download/community
   - Run installer with "Install as Service" checked

2. **Start MongoDB Service**
   ```bash
   net start MongoDB
   ```

3. **Verify Connection**
   ```bash
   mongosh
   # Should connect successfully
   exit
   ```

4. **Terminal 1 - Start Backend**
   ```bash
   cd c:\Users\User\Desktop\gitluma-output\backend
   npm run dev
   ```

5. **Terminal 2 - Start Frontend**
   ```bash
   cd c:\Users\User\Desktop\gitluma-output\frontend
   npm run dev
   ```

6. **Open Browser**
   - Frontend: http://localhost:5173/
   - Backend: http://localhost:5000/

✅ **Everything ready!**

---

## Keep MongoDB Running

**Option A: Windows Service (Recommended)**
- Runs automatically when you restart Windows
- Start: `net start MongoDB`
- Stop: `net stop MongoDB`

**Option B: Keep Command Window Open**
```bash
mongod --dbpath "C:\data\db"
```

**Option C: MongoDB Compass GUI**
- Download: https://www.mongodb.com/products/tools/compass
- Visual interface to manage MongoDB
- Auto-starts local MongoDB connection

---

## Quick Reference

| Task | Command |
|------|---------|
| Start MongoDB Service | `net start MongoDB` |
| Stop MongoDB Service | `net stop MongoDB` |
| Test MongoDB Connection | `mongosh` |
| Check MongoDB Status | `Get-Service MongoDB` (PowerShell) |
| Backend Start | `cd backend && npm run dev` |
| Frontend Start | `cd frontend && npm run dev` |
| Open Frontend | http://localhost:5173 |
| Open Backend | http://localhost:5000 |

---

## Success Indicators ✅

**Backend Console Should Show:**
```
socket and api connected
mongodb succesfuly connected!
```

**Frontend Console Should Show:**
```
VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

**You Can:**
- ✅ Open http://localhost:5173/
- ✅ Navigate to /docs
- ✅ Use all documentation pages
- ✅ Click "Back to Home"
- ✅ Search in sidebar

---

**Need Help?**

If MongoDB still won't connect:
1. Check Windows Services (services.msc) - look for "MongoDB"
2. Verify port 27017 is not blocked by firewall
3. Try Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`
4. Check .env file has correct MONGODB_URI

Let me know if you get stuck! 🚀
