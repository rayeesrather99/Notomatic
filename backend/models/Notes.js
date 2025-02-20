const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
  syllabusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Syllabus', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  noteType: { type: String, required: true, enum: ['detailed', 'summarized'] },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  downloadUrl: { type: String }
});

module.exports = mongoose.model('Notes', NotesSchema);
