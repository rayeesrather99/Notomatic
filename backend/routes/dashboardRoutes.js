// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const Notes = require('../models/Notes');
// const authMiddleware = require('../middlewares/authMiddlewares');


// router.get('/', authMiddleware, async (req, res) => {
//     try {
//           const userId = req.user.id;
//          const totalNotes = await Notes.countDocuments({ userId });
//         const totalCollaborators = 0;
//         const lastEdited = new Date().toLocaleDateString();
//         const categories = 5;

//          res.status(200).json({
//           totalNotes,
//            totalCollaborators,
//            lastEdited,
//           categories,
//          });
//        } catch (error) {
//         console.error('Error during fetching the dashboard', error);
//         res.status(500).json({ error: 'Error loading dashboard', message: error.message });
//       }
// });


// module.exports = router;