const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['admin', 'user', 'guest'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  preferences: {
    noteFormat: { type: String, default: 'detailed', enum: ['detailed', 'summarized'] },
    language: { type: String, default: 'English' }
  } 
});

module.exports = mongoose.model('User', UserSchema);
