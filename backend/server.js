require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Notes = require('./models/Notes');

// Routes
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedbackRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/notesRoutes');
const syllabusRoutes = require('./routes/syllabusRoutes.js');

// Middleware
const authenticateToken = require('./middlewares/authMiddleware.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Routes with Authentication
app.use('/api/auth', authRoutes);
app.use('/api/feedback', authenticateToken, feedbackRoutes);
app.use('/api/notifications', authenticateToken, notificationRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/syllabus', authenticateToken, syllabusRoutes);
app.use('/api/notes', authenticateToken, notesRoutes);


app.get('/api/dashboard', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Problem line
        const totalNotes = await Notes.countDocuments({ userId });
        const totalCollaborators = 0;
        const lastEdited = new Date().toLocaleDateString();
        const categories = 5;

        const dashboardData = {
          totalNotes,
          totalCollaborators,
          lastEdited,
          categories,
         };

      const jsonData = JSON.stringify(dashboardData);

       const etag = crypto.createHash('md5').update(jsonData).digest('hex');

      if (req.headers['if-none-match'] === etag) {
        console.log("Returning 304 Not Modified");
        return res.status(304).end();
        }

        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('ETag', etag);


      console.log("Response body:", dashboardData);
       res.status(200).json(dashboardData);

       } catch (error) {
       console.error('Error during fetching the dashboard', error);
        res.status(500).json({ error: 'Error loading dashboard', message: error.message });
      }
    });


// Health Check Route
app.get('/api/health', (req, res) => {
   res.status(200).json({ status: 'OK', uptime: process.uptime() });
 });
   app.use((err, req, res, next) => {
      console.error('Global Error:', err.stack);
     if (req.originalUrl.startsWith('/api')) {
      return  res.status(500).json({ error: 'Internal Server Error', message: err.message });
     }
     next(err);
   });
// Server Startup
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful Shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await mongoose.disconnect();
    process.exit(0);
});