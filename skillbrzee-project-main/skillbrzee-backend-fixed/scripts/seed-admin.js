/**
 * scripts/seed-admin.js
 * Run once to create the admin user: node scripts/seed-admin.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const db     = require('../utils/db');

async function seedAdmin() {
  const email    = process.env.ADMIN_EMAIL    || 'admin@skillbrzee.in';
  const password = process.env.ADMIN_PASSWORD || 'Admin@Skillbrzee123';
  const name     = 'Skillbrzee Admin';

  const existing = db.findOne('users', u => u.email === email);
  if (existing) {
    // Ensure role is admin
    if (existing.role !== 'admin') {
      db.updateById('users', existing.id, { role: 'admin' });
      console.log('✅ Upgraded existing user to admin:', email);
    } else {
      console.log('ℹ️  Admin already exists:', email);
    }
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  db.insert('users', {
    name,
    email,
    phone:            '',
    password:         hashed,
    role:             'admin',
    enrolledPackages: [],
  });

  console.log('✅ Admin user created!');
  console.log('   Email:   ', email);
  console.log('   Password:', password);
  console.log('\n⚠️  Remember to change the password after first login!\n');
}

seedAdmin().catch(console.error);
