# ⚡ Quick Start - 5 Minutes

**Goal:** Get both backend and frontend running in 5 minutes.

**Important:** Make sure MongoDB is running first! See [MONGODB_SETUP.md](MONGODB_SETUP.md)

```bash
net start MongoDB  # Windows
```

## Prerequisites
- Node.js 16+ installed
- MongoDB installed and running locally
- Two terminal windows

---

## ⏱️ Step-by-Step (5 min)

### Terminal 1 - Backend (2 min)
```bash
cd backend
npm install              # ~1 min
npm run dev             # ~10 sec
```

**Expected:**
```
socket and api connected
mongodb succesfuly connected!
```

✅ **Backend ready at http://localhost:5000**

### Terminal 2 - Frontend (2 min)
```bash
cd frontend
npm install              # ~1 min
npm run dev             # ~10 sec
```

**Expected:**
```
VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

✅ **Frontend ready at http://localhost:5173**

### Open Browser (1 min)
1. Click: http://localhost:5173/
2. See the home page ✅
3. Click "Documentation" button
4. Browse the docs! ✅

---

## 🗺️ Quick Navigation

**At Home:**
- Click "Documentation" → Goes to `/docs`

**At Documentation Hub:**
- Click any doc in sidebar → View that page
- Click hamburger menu (mobile) → Show sidebar
- Click "← Home" → Return to home

**At Doc Pages:**
- Sidebar highlights current page (coral)
- Click other docs to navigate
- Click "← Home" to return
- Copy code blocks with "Copy" button

---

## 🆘 If Something Breaks

### Backend Won't Start
```bash
# Check MongoDB is running
mongod

# Or restart everything
cd backend
npm install
npm run dev
```

### Frontend Won't Start
```bash
# Clear cache
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Can't Connect
- Backend: http://localhost:5000
- Frontend: http://localhost:5173
- Check both are running in separate terminals

---

## ✅ You're Done!

Both servers running ✅
Documentation working ✅
Navigation complete ✅

**Start developing!**

For full docs, see:
- README.md (Project overview)
- backend/SETUP.md (Backend details)
- frontend/SETUP.md (Frontend details)
- VERIFICATION.md (Testing guide)
