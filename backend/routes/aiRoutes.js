const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const { 
  optimizeResume, 
  auditResume, 
  generateCoverLetter, 
  generateInterviewPrep,
  parseResume 
} = require('../services/aiService');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/parse', upload.single('resume'), async (req, res) => {
    console.log("--- INCOMING PARSE REQUEST ---");
    if (!req.file) {
        console.error("No file received");
        return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log("File Type:", req.file.mimetype);
    console.log("File Size:", req.file.size, "bytes");

    let extractedText = "";
    try {
        if (req.file.mimetype === 'application/pdf') {
            const data = await pdf(req.file.buffer);
            extractedText = data.text;
        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.extractRawText({ buffer: req.file.buffer });
            extractedText = result.value;
        } else {
            // Text file fallback
            extractedText = req.file.buffer.toString('utf8');
        }

        console.log("Extracted Text Length:", extractedText.length);
        if (extractedText.length < 10) {
            throw new Error("Could not extract enough text from file. The file might be an image-only PDF.");
        }

        const structuredData = await parseResume(extractedText);
        console.log("AI Parse Successful");
        res.json(structuredData);
    } catch (error) {
        console.error("PARSE FAILED:", error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/optimize', async (req, res) => {
    const { resumeData, jobDescription } = req.body;
    try {
        const data = await optimizeResume(resumeData, jobDescription);
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/audit', async (req, res) => {
    const { resumeText, jobDescription } = req.body;
    try {
        const data = await auditResume(resumeText, jobDescription);
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/letter', async (req, res) => {
    const { resumeData, jobDescription } = req.body;
    try {
        const data = await generateCoverLetter(resumeData, jobDescription);
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/prep', async (req, res) => {
    const { resumeData, jobDescription } = req.body;
    try {
        const data = await generateInterviewPrep(resumeData, jobDescription);
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;
