/**
 * Run: node utils/seedAdmin.js
 * Creates admin user on first run.
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User     = require('../models/User');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skillbrzee');

  const email = process.env.ADMIN_EMAIL    || 'admin@skillbrzee.in';
  const pass  = process.env.ADMIN_PASSWORD || 'Admin@Skillbrzee123';

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('ℹ️  Admin already exists:', email);
  } else {
    await User.create({ name: 'Skillbrzee Admin', email, phone: '9573472183', password: pass, role: 'admin' });
    console.log('✅ Admin user created:', email);
  }

  await mongoose.disconnect();
  process.exit(0);
})();
