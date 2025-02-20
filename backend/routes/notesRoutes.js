const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const authMiddleware = require('../middlewares/authMiddleware');
const Notes = require('../models/Notes')

router.post('/generate/:syllabusId', authMiddleware, notesController.generateSyllabusNotes);

// New route to fetch user notes
router.get('/user', authMiddleware,  notesController.getUserNotes );

router.get('/download/:noteId', authMiddleware, notesController.downloadNote);

// New route to delete a note
router.delete('/:noteId', authMiddleware, notesController.deleteNote);


router.put('/:noteId', authMiddleware, async (req, res) => {

  const { content } = req.body;
  const noteId = req.params.noteId

  try {
      const updatedNote = await Notes.findByIdAndUpdate(noteId, { content }, { new: true });
    if (!updatedNote) {
         return  res.status(404).json({ error: 'Note not found.' });
    }
      res.status(200).json({ message: 'Note updated successfully', updatedNote });

  } catch (error) {
     console.error('Error updating the note', error);
    res.status(500).json({ error: 'Error updating the note.', message: error.message });
  }
});
module.exports = router;