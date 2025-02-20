// syllabusRoutes.js
const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabusController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import authentication middleware

// Route for uploading syllabus, protect route with auth middleware
router.post('/upload', authMiddleware, syllabusController.uploadSyllabus);


module.exports = router;