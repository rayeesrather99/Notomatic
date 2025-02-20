const fs = require('fs').promises;
 const { GoogleGenerativeAI } = require('@google/generative-ai');
 const Notes = require('../models/Notes');
 const Syllabus = require('../models/Syllabus');
 const PDFDocument = require('pdfkit');
 const crypto = require('crypto');

 // Initialize AI model
 const genAI = new GoogleGenerativeAI(process.env.API_KEY);
 const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

 // Helper function to generate notes using AI
 async function generateNotes(text,noteType,academicLevel,fontSize,fontFamily,language) {
  const prompt = {
    contents: [{
      parts: [{ text: `You are an expert note generator assistant. Your task is to generate concise and well-structured notes from the provided text. The text will be in the form of a syllabus, and you should generate a ${noteType} level of notes for a ${academicLevel} level student. Use font size of ${fontSize}, with font family ${fontFamily} and language ${language} . Generate a Detailed explanation of each topic in the syllabus.` },
               {text: text}
        ],
     }],
    };
    try {
        const result = await model.generateContent(prompt);
         if (!result || !result.response || !result.response.text()) {
              throw new Error('Failed to generate notes: No content in response.');
            }
         return result.response.text();
      } catch (error) {
        console.error('Error generating notes from Google Gemini:', error);
          throw new Error('Failed to generate notes.');
      }
  }
  async function generateSyllabusNotes(req, res) {
    try {
       const syllabus = await Syllabus.findById(req.params.syllabusId);
        if (!syllabus) {
          res.status(404).json({ error: 'Syllabus not found.' });
           return;
        }
  
      const { noteType, academicLevel, fontSize, fontFamily, language } = req.body;
  
        const notesContent = await generateNotes(syllabus.topics.join('\n'),noteType, academicLevel, fontSize, fontFamily, language);
  
        const notesArray = notesContent.split("\n").filter(note => note.trim() !== '').map((note) => {
          const parts = note.split(':');
          if (parts.length === 1) {
           return parts[0].trim();
          }
          const topic = parts[0].trim();
        const summary = parts.slice(1).join(':').trim();
          return `${topic}: ${summary}`;
        });
    const notesRecord = new Notes({
          syllabusId: syllabus._id,
           userId: req.user.id,
           noteType: noteType,
           content: notesArray.join("\n\n"),
      });
     await notesRecord.save();
  
     return { message: 'Notes generated successfully!', notes: notesRecord };
   } catch (error) {
      console.error("Error during note creation", error)
      throw error
   }
  }
 async function getUserNotes(req, res) {
     try {
       const userId = req.user.id;
         const notes = await Notes.find({ userId });
         const jsonData = JSON.stringify({ notes });
         const etag = crypto.createHash('md5').update(jsonData).digest('hex');

           if (req.headers['if-none-match'] === etag) {
             console.log("Returning 304 Not Modified");
             return res.status(304).end();
           }

            res.setHeader('Cache-Control', 'no-cache');
           res.setHeader('ETag', etag);


         res.status(200).json({ notes });
    } catch (error) {
         console.error('Error during fetching the notes', error);
         res.status(500).json({ error: 'Error fetching notes', message: error.message });
       }
 }

  async function downloadNote(req, res) {
     try {
         const noteId = req.params.noteId;
          const note = await Notes.findById(noteId);

           if (!note) {
                return res.status(404).json({ error: 'Note not found' });
          }
      const doc = new PDFDocument();
       doc.text(note.content); // Use the generated note content.
        res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `attachment; filename="note_${noteId}.pdf"`);
        doc.pipe(res);

          doc.end();
       } catch (error) {
          console.error('Error during downloading the note', error);
          res.status(500).json({ error: 'Error fetching notes', message: error.message });
      }
  }

 async function deleteNote(req, res) {
   const noteId = req.params.noteId
    try {
       const note = await Notes.findByIdAndDelete(noteId);
       if (!note) {
           return res.status(404).json({ error: 'Note not found' });
         }
      res.status(200).json({ message: 'Note deleted successfully', note });
     } catch (error) {
         console.error('Error deleting the note', error);
        res.status(500).json({ error: 'Error deleting the note.', message: error.message });
      }
 }

 module.exports = {
   generateSyllabusNotes,
     getUserNotes,
     downloadNote,
     deleteNote,
 };