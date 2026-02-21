# Technical Review Summary — Skillbrzee

This document summarizes the comprehensive technical review and fixes applied to the Skillbrzee project (frontend, backend, and configuration).

---

## 1. Backend Fixes

### Server (`skillbrzee-backend/server.js`)
- **MongoDB URI**: Server now accepts both `MONGO_URI` and `MONGODB_URI` (previously only `MONGO_URI` was used while `.env.example` had `MONGODB_URI`).
- **Uploads directories**: `uploads/` and `uploads/resources/` are created at startup if missing (avoids Multer errors on first upload).
- **`/api/files` route**: The files route was implemented but not mounted; added `app.use('/api/files', require('./routes/files'))` so the file-based resources API is available (e.g. for FRONTEND_INTEGRATION flow).
- **CORS**: Added common dev origins (localhost:5000, 8080, 5173, 127.0.0.1 variants) and a fallback so any `localhost` / `127.0.0.1` origin is allowed in non-production.
- **`fs` require**: Moved `fs` to the top-level requires for clarity.

### Environment (`.env.example`)
- **MongoDB**: Documented that either `MONGO_URI` or `MONGODB_URI` can be used.
- **Razorpay**: Replaced invalid placeholder value for `RAZORPAY_KEY_SECRET` with a safe placeholder (`your_razorpay_key_secret`).

### Routes – Files (`routes/files.js`)
- **Auth alignment**: Replaced `utils/auth`’s `authMiddleware` with the main app’s `protect` and `adminOnly` from `middleware/auth.js`, so one JWT (from `/api/auth/login`) works for both the main API and the files API.
- **Admin check**: Removed JSON-db–based `isAdmin(userId)`; admin is now determined by `req.user.role === 'admin'` (Mongoose user from JWT).
- **Enrollment for `/enrolled`**: Enrollment is now derived from `req.user.enrolledPackages` (Mongoose User) instead of the JSON `users` store (which was not populated from MongoDB).
- **`uploadedBy`**: Stored as `String(req.user._id)` so the files JSON store stays consistent with the main app’s user id.

### Routes – Payments (`routes/payments.js`)
- **Dev/mock payments**: Mock payment path is used when Razorpay keys are missing or placeholders (e.g. `your_razorpay_*`), so local dev works without real keys. `getRazorpay()` is called to decide; if it throws, mock is used.
- **`getRazorpay()`**: Placeholder detection extended to cover `your_razorpay`, `YOUR_KEY`, `xxxx`, `change_this` so invalid keys don’t break startup.

### Routes – Resources (`routes/resources.js`)
- **UUID dependency**: Replaced ESM-only `uuid` with Node’s built-in `crypto.randomBytes(16).toString('hex')` for upload filenames to avoid `ERR_REQUIRE_ESM` and remove the `uuid` dependency.

### Seed script (`utils/seedCourses.js`)
- **MongoDB URI**: Uses `MONGO_URI || MONGODB_URI` for consistency.
- **Course schema**: Seed data now maps to the Course model’s `order` field (and `isActive: true`) instead of relying on `sortOrder`, so seeded courses sort correctly.

### Package (`package.json`)
- **uuid**: Removed `uuid` dependency; resource uploads use `crypto` for unique filenames.

### README
- **Env table**: Updated to mention that either `MONGO_URI` or `MONGODB_URI` can be used.

---

## 2. Frontend Fixes

### API base (`frontend/index.html`)
- **Local development**: When the app is opened from `localhost` or `127.0.0.1`, `API_BASE` defaults to `http://localhost:5000/api` so the same HTML works locally without setting `localStorage`.

### Admin dashboard
- **Stats**: “Enrolled Students” now uses `enrolledCount` from `/api/admin/stats` when present (and falls back to `totalUsers`), so the dashboard reflects backend semantics.

---

## 3. What Was Verified

- **Auth**: Login/register use Mongoose User and JWT; `protect` and `adminOnly` are used consistently; admin panel only opens when `data.user.role === 'admin'`.
- **Admin CRUD**: Admin stats, users list, and resources list/delete use `/api/admin/*` and `/api/resources` with the same JWT; files route uses the same auth after the changes above.
- **Payments**: Create order → (Razorpay or mock) → verify / dev-confirm → enrollment and email; dev mode works when Razorpay keys are not configured.
- **Database**: Backend uses MongoDB (Mongoose) for users, courses, resources, payments; `db.js` (JSON store) is only used by the optional `/api/files` routes.
- **Frontend–backend**: Same JWT for auth, resources, admin, and payments; CORS and API base support local and production.

---

## 4. How to Run Locally

### Backend
1. **MongoDB**: Install and run MongoDB locally, or use a cloud URI in `.env`.
2. **Env**: Copy `.env.example` to `.env` and set at least:
   - `MONGO_URI` or `MONGODB_URI`
   - `JWT_SECRET` (and optionally `JWT_REFRESH_SECRET`)
   - For production payments: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
3. **Install and start**:
   ```bash
   cd skillbrzee-project-main/skillbrzee-backend
   npm install
   npm start
   ```
   Admin user is seeded on first start (from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`; default `admin@skillbrzee.in` / `Admin@Skillbrzee123`).

### Frontend
- Serve `skillbrzee-project-main/frontend/index.html` from any static server (e.g. `npx serve`, Live Server, or `python -m http.server 3000`). When opened from `localhost`, it will call `http://localhost:5000/api` automatically.

### Quick checks
- **Health**: `GET http://localhost:5000/api/health`
- **Login**: Use admin email/password in the “Admin” link in the footer, or register/login as a normal user.
- **Payments**: Without real Razorpay keys, create order returns a mock; use “Confirm” (or the dev-confirm flow) to complete enrollment locally.

---

## 5. Optional / Follow-ups

- **Security**: Run `npm audit` in the backend; consider upgrading `multer` to 2.x when feasible (see audit output).
- **Crypto package**: The `crypto` npm package in `package.json` is deprecated (Node’s built-in `crypto` is used in code). You can remove the `crypto` dependency from `package.json` if nothing else depends on it.
- **Production**: Set `NODE_ENV=production`, use a strong `JWT_SECRET`, real Razorpay keys, and a proper MongoDB URI and CORS origins.

---

All listed changes are in place so the app can run end-to-end locally with a stable, consistent auth and payment flow and a working admin dashboard.
