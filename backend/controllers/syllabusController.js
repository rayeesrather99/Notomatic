const fs = require("fs").promises;
const path = require("path");
const pdfParse = require("pdf-parse");
const multer = require("multer");
const Syllabus = require("../models/Syllabus");
const notesController = require("./notesController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Helper function to extract text from PDF
async function extractSyllabusContent(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error("Failed to read PDF file.");
  }
}

// Upload and process syllabus
// Upload and process syllabus
async function uploadSyllabus(req, res) {
  upload.single('file')(req, res, async (err) => {
      if (err) {
       console.error('File upload failed:', err);
       return res.status(400).json({ error: 'File upload failed: ' + err.message });
      }
    if (!req.file) {
       console.error('No file provided');
     return res.status(400).json({ error: 'No file provided.' });
    }
    try {
        const syllabusContent = await extractSyllabusContent(req.file.path);
       const syllabus = new Syllabus({
            userId: req.user.id,
            filename: req.file.originalname,
           filePath: req.file.path,
            topics: syllabusContent.split('\n').filter(line => line.trim() !== ''),
            noteType: req.body.noteType,
            academicLevel: req.body.academicLevel,
            fontSize: req.body.fontSize,
           fontFamily: req.body.fontFamily,
           language: req.body.language,
        });
        await syllabus.save();
      // Call notes generation
        const { generateSyllabusNotes } = await import('./notesController.js');
       const generatedNotes = await generateSyllabusNotes(
             { ...req, params: { syllabusId: syllabus._id },
               body: {
                   noteType: req.body.noteType,
                 academicLevel: req.body.academicLevel,
                 fontSize: req.body.fontSize,
                fontFamily: req.body.fontFamily,
                 language: req.body.language,
             }},
              res
         );
       res.status(200).json({ message: 'Syllabus uploaded successfully! Notes generated Successfully', syllabus, notes: generatedNotes });
      } catch (error) {
       console.error('Error processing syllabus:', error);
        res.status(500).json({ error: 'Error processing syllabus.', message: error.message });
   }
 });
}

module.exports = {
  uploadSyllabus,
};
