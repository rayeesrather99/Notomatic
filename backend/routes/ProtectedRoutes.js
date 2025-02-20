const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
  if (!req.user) {
    return res.redirect('/login'); // Frontend login page
  }
  res.json({ message: 'Welcome to the dashboard!' });
});

router.post('/upload', authMiddleware, (req, res) => {
  res.json({ message: 'File uploaded successfully!' });
});

module.exports = router;
