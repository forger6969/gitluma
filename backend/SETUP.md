# GitLuma Backend Setup Guide

## Prerequisites
- Node.js 14.0+ installed
- MongoDB running locally OR MongoDB Atlas connection string

## Setup Steps

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure MongoDB

**Option A: Local MongoDB (Recommended for development)**
```bash
# Windows - using MongoDB locally
# Make sure MongoDB is running on your machine
# Default: mongodb://localhost:27017/gitluma
```

**Option B: MongoDB Atlas (Cloud)**
```bash
# Update .env file with your connection string:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gitluma
```

### 4. Configure .env file
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gitluma
NODE_ENV=development
```

### 5. Start the server
```bash
npm run dev
```

Expected output:
```
socket and api connected
mongodb succesfuly connected!
```

## Troubleshooting

### MongoDB Connection Error
If you see: `MongooseError: The 'uri' parameter to openUri() must be a string`

**Solution:**
1. Check if MongoDB is running
2. Verify MONGODB_URI in .env file
3. On Windows, run MongoDB service:
   ```bash
   net start MongoDB
   ```
   Or install MongoDB Community Edition from https://www.mongodb.com/try/download/community

### Port Already in Use
If port 5000 is already in use:
```env
PORT=5001  # Change to any available port
```

### Connection Timeout
- Check your internet connection for MongoDB Atlas
- Verify firewall settings allow MongoDB connection
- Test MongoDB connection separately

## Development

The server includes:
- ✅ Express.js for API
- ✅ MongoDB with Mongoose ODM
- ✅ Socket.io for real-time communication
- ✅ Error handling middleware
- ✅ CORS support
- ✅ Hot reload with Nodemon

Start coding and the server will auto-restart on file changes!
