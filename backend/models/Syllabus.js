const mongoose = require('mongoose');

const SyllabusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  filePath: { type: String, required: true },
  topics: [{ type: String }],
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'uploaded', enum: ['uploaded', 'parsed', 'notes_generated'] }
});

module.exports = mongoose.model('Syllabus', SyllabusSchema);
