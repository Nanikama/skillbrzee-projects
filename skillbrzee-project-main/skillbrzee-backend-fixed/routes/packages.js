const express = require('express');
const router  = express.Router();

const PACKAGES = [
  { id:1, name:'STARTER PACKAGE',  price:'₹500',    rawPrice:500,   desc:'Begin your digital journey with fundamental skills.',                                                  featured:false },
  { id:2, name:'BASIC PACKAGE',    price:'₹1,499',  rawPrice:1499,  desc:'Expand your knowledge with essential digital marketing modules.',                                      featured:false },
  { id:3, name:'SILVER PACKAGE',   price:'₹2,999',  rawPrice:2999,  desc:'Build intermediate expertise with live mentoring and resources.',                                      featured:false },
  { id:4, name:'GOLD PACKAGE',     price:'₹5,499',  rawPrice:5499,  desc:'Master advanced strategies with real-world case studies and 1:1 mentoring.',                          featured:true  },
  { id:5, name:'DIAMOND PACKAGE',  price:'₹9,999',  rawPrice:9999,  desc:'Full suite of professional courses with personal mentoring and exclusive content.',                    featured:false },
  { id:6, name:'PREMIUM PACKAGE',  price:'₹14,999', rawPrice:14999, desc:'The ultimate package — all courses, all features, lifetime access and dedicated support.',             featured:false },
];

/* ── GET /api/packages ── */
router.get('/', (_req, res) => res.json({ packages: PACKAGES }));

/* ── GET /api/packages/:id ── */
router.get('/:id', (req, res) => {
  const pkg = PACKAGES.find(p => p.id === Number(req.params.id));
  if (!pkg) return res.status(404).json({ error: 'Package not found.' });
  res.json({ package: pkg });
});

module.exports = router;
