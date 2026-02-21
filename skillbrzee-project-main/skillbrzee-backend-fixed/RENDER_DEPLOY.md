# Render Deployment Guide

## 1. Render Settings
Go to your Render service → Settings and set:

| Setting        | Value                          |
|----------------|-------------------------------|
| Root Directory | `skillbrzee-backend`          |
| Build Command  | `npm install`                 |
| Start Command  | `node server.js`              |

## 2. Environment Variables
In Render → Environment, add these variables:

| Key                  | Value                                      |
|---------------------|--------------------------------------------|
| NODE_ENV            | production                                 |
| PORT                | 5000                                       |
| MONGO_URI           | (your MongoDB Atlas connection string)     |
| JWT_SECRET          | (long random string, 64+ chars)            |
| JWT_REFRESH_SECRET  | (different long random string)             |
| FRONTEND_URL        | (your frontend URL for CORS)               |
| BASE_URL            | (your Render backend URL)                  |
| ADMIN_EMAIL         | admin@skillbrzee.in                        |
| ADMIN_PASSWORD      | Admin@Skillbrzee123                        |
| RAZORPAY_KEY_ID     | (from Razorpay dashboard, optional)        |
| RAZORPAY_KEY_SECRET | (from Razorpay dashboard, optional)        |

## 3. MongoDB Atlas Setup
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Click "Connect" → "Drivers" → copy the connection string
4. Replace <password> with your DB user password
5. Paste as MONGO_URI in Render environment vars

## 4. Push to GitHub
Make sure your repo structure looks like:
```
your-repo/
  skillbrzee-backend/    ← set this as Root Directory in Render
    server.js
    package.json
    routes/
    models/
    ...
```

## 5. Bugs Fixed in This Version
- ✅ JWT_REFRESH_SECRET now falls back gracefully if not set
- ✅ /api/packages route now registered in server.js
- ✅ .env.example updated with all required variables
- ✅ node_modules excluded
