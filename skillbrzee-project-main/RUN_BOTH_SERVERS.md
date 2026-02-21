# SkillBrzee - Running Both Frontend and Backend Servers

## Quick Start - Single Command Setup

### Option 1: Using NPM Script (Recommended)
```bash
cd skillbrzee-backend
npm run dev:all
```

### Option 2: Using npx Concurrently (Direct)
```bash
cd skillbrzee-backend
npx concurrently "node server.js" "cd ../frontend && python -m http.server 3000"
```

---

## Server Configuration

### Backend Server
- **URL**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **Port**: 5000 (configured in `.env`)
- **Runtime**: Node.js with Express
- **Process**: node server.js

### Frontend Server
- **URL**: http://localhost:3000
- **Port**: 3000
- **Runtime**: Python HTTP Server
- **Serves**: Static HTML/CSS/JS files from `frontend/` directory

---

## Environment Configuration

### Backend .env File
Location: `skillbrzee-backend/.env`

**Current Configuration:**
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

### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:3000` ✅
- `http://127.0.0.1:5500`
- `https://skillbrzee.in`
- `file://` protocol (for local testing)

---

## Verification Checklist

### Check Backend Status
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "uptime": <seconds>,
  "timestamp": "<ISO-8601-timestamp>",
  "db": "connected"
}
```

### Check Frontend Server
```bash
curl http://localhost:3000/index.html
```

Should return the HTML content of the frontend application.

---

## NPM Scripts Reference

Available scripts in `skillbrzee-backend/package.json`:

| Script | Command | Purpose |
|--------|---------|---------|
| `npm start` | `node server.js` | Start backend server (single) |
| `npm run dev` | `nodemon server.js` | Start backend with auto-reload |
| `npm run backend` | `node server.js` | Start backend for concurrent use |
| `npm run frontend` | `cd ../frontend && python -m http.server 3000` | Start frontend server |
| `npm run dev:all` | `concurrently "npm run backend" "npm run frontend"` | Run both servers simultaneously |
| `npm run seed-admin` | `node utils/seedAdmin.js` | Seed admin user |

---

## Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" error:

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### MongoDB Connection Issues
Ensure MongoDB is running:
```bash
# Check if MongoDB service is running
Get-Service -Name MongoDB -ErrorAction SilentlyContinue
```

### Frontend Not Loading
Ensure Python is available:
```bash
python --version
```

### Package Dependencies Issue
Reinstall dependencies:
```bash
cd skillbrzee-backend
npm install
npm install concurrently --save-dev
```

---

## Development Workflow

### Step 1: Install Dependencies
```bash
cd skillbrzee-backend
npm install
npm install concurrently --save-dev
```

### Step 2: Configure Environment
Ensure `.env` file exists with proper settings (see Environment Configuration section).

### Step 3: Start Services
```bash
npm run dev:all
```

### Step 4: Access Application
- **Frontend**: Open browser to http://localhost:3000
- **Backend API**: Use http://localhost:5000

---

## Production Notes

For production deployment:

1. Update `NODE_ENV=production` in `.env`
2. Use a proper HTTP server for frontend (nginx, Apache, etc.)
3. Update `FRONTEND_URL` to production domain
4. Set strong JWT secrets
5. Configure proper email credentials (Gmail App Password)
6. Update Razorpay credentials
7. Update `ALLOWED_ORIGINS` in `.env` with production domain

---

## Created: 2026-02-22
## Last Verified: Backend ✅ | Frontend ✅ | Connection ✅
