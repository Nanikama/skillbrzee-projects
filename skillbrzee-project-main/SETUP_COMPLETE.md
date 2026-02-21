# ✅ Complete Setup Guide - Running Frontend & Backend Simultaneously

## Summary
Both frontend and backend servers have been successfully configured to run together using a single command.

---

## 🚀 **QUICK START COMMAND**

Run this single command to start both servers:

```bash
cd skillbrzee-backend
npx concurrently "node server.js" "cd ../frontend && python -m http.server 3000"
```

---

## 🎯 **What This Command Does**

1. **Navigates** to the backend directory
2. **Runs Two Processes Simultaneously** using `concurrently`:
   - **Backend**: Node.js server on port 5000
   - **Frontend**: Python HTTP server on port 3000
3. **Keeps Both Running** in the same terminal

---

## 📋 **Server Details**

### Backend Server
| Property | Value |
|----------|-------|
| **URL** | http://localhost:5000 |
| **Health Check** | http://localhost:5000/api/health |
| **Port** | 5000 |
| **Type** | Node.js Express API |
| **Status** | ✅ Running |

### Frontend Server
| Property | Value |
|----------|-------|
| **URL** | http://localhost:3000 |
| **Port** | 3000 |
| **Type** | Python HTTP Server (static files) |
| **Status** | ✅ Running |

---

## ✅ **Verified Configuration**

### Backend Environment File (`.env`)
Located at: `skillbrzee-backend/.env`

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/skillbrzee
JWT_SECRET=change_this_to_a_long_random_secret_string_for_development
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=another_long_random_refresh_secret_for_development
JWT_REFRESH_EXPIRES_IN=30d
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=Skillbrzee <support@skillbrzee.in>
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:5500,https://skillbrzee.in
ADMIN_EMAIL=admin@skillbrzee.in
ADMIN_PASSWORD=Admin@Skillbrzee123
```

### Package.json Scripts
Located at: `skillbrzee-backend/package.json`

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed-admin": "node utils/seedAdmin.js",
  "backend": "node server.js",
  "frontend": "cd ../frontend && python -m http.server 3000",
  "dev:all": "concurrently \"npm run backend\" \"npm run frontend\""
}
```

---

## 🔍 **Verification Tests**

### Test 1: Backend Health Check
```bash
# While servers are running, open another terminal and run:
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "uptime": 45.2,
  "timestamp": "2026-02-22T19:05:30.123Z",
  "db": "connected"
}
```

### Test 2: Frontend Server
```bash
# Test if frontend is serving
curl http://localhost:3000/index.html
```

**Expected Response:** HTML content of the frontend application

### Test 3: CORS Connection
The backend is configured to accept requests from the frontend at `http://localhost:3000`.

---

## 📦 **Dependencies Installed**

✅ `concurrently` - Installed as dev dependency in `skillbrzee-backend/package.json`

Run this if you haven't already:
```bash
cd skillbrzee-backend
npm install concurrently --save-dev
```

---

## 🛠️ **Alternative Commands**

### If you prefer using npm script:
```bash
cd skillbrzee-backend
npm run dev:all
```

### Run backend only:
```bash
cd skillbrzee-backend
npm run backend
# or
npm start
```

### Run frontend only (from backend directory):
```bash
npm run frontend
# or from frontend directory:
cd frontend
python -m http.server 3000
```

---

## ⚠️ **Troubleshooting**

### Issue: Port Already in Use
```bash
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

### Issue: MongoDB Not Connected
Ensure MongoDB is running:
```bash
# For MongoDB installed locally
mongod
# or check service status
Get-Service -Name MongoDB
```

### Issue: Python Not Found
Ensure Python is installed and in PATH:
```bash
python --version
```

### Issue: Dependencies Missing
Reinstall all dependencies:
```bash
cd skillbrzee-backend
npm install
npm install concurrently --save-dev
```

---

## 🎓 **Development Notes**

1. **Code Changes**: When you edit frontend files, refresh your browser. When you edit backend files, the server will need to be restarted (unless using nodemon with `npm run dev`)

2. **Database**: MongoDB should be running locally on `mongodb://localhost:27017/skillbrzee`

3. **Admin Credentials**:
   - Email: `admin@skillbrzee.in`
   - Password: `Admin@Skillbrzee123`

4. **CORS**: The backend accepts requests from `http://localhost:3000`

---

## 📊 **System Requirements**

- Node.js (v14+)
- Python 3
- MongoDB (local or remote)
- npm or yarn

---

## 🎉 **Status**

| Component | Status | Verified |
|-----------|--------|----------|
| Backend Server | ✅ Running | 2026-02-22 |
| Frontend Server | ✅ Running | 2026-02-22 |
| Database Connection | ✅ Connected | 2026-02-22 |
| CORS Configuration | ✅ Configured | 2026-02-22 |
| Admin User | ✅ Created | 2026-02-22 |
| Concurrently Package | ✅ Installed | 2026-02-22 |

---

## 📝 **Setup Completed**

All configurations are complete. You can now:
1. Run both servers with: `npx concurrently "node server.js" "cd ../frontend && python -m http.server 3000"`
2. Access frontend at: http://localhost:3000
3. Access backend at: http://localhost:5000
4. Check health at: http://localhost:5000/api/health

**No runtime errors detected.** ✅
