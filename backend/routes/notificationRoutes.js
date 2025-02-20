const express = require('express');
const router = express.Router();
const Notification = require('../models/Notifications');

// Create notification
router.post('/', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const newNotification = new Notification({ userId, message, read: false });
    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating notification' });
  }
});

// Get notifications by user
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
});

module.exports = router;
