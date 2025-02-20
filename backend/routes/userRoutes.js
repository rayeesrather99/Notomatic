const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

module.exports = router;
