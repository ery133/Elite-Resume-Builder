const express = require('express');
const router = express.Router();
const { generateWord, generatePDF } = require('../services/fileService');

router.post('/download', async (req, res) => {
    const { resumeData, format } = req.body;

    if (!resumeData || !format) {
        return res.status(400).json({ error: 'Missing resume data or format' });
    }

    try {
        let buffer;
        let contentType;
        let fileName = `resume_${Date.now()}`;

        if (format === 'word') {
            buffer = await generateWord(resumeData);
            contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            fileName += '.docx';
        } else if (format === 'pdf') {
            // Simple HTML for PDF preview
            const html = `
                <html>
                    <body style="font-family: sans-serif; padding: 40px;">
                        <h1 style="text-transform: uppercase;">${resumeData.name}</h1>
                        <p>${resumeData.email} | ${resumeData.phone}</p>
                        <hr/>
                        <h2>Experience</h2>
                        ${(resumeData.experience || []).map(exp => `
                            <div>
                                <strong>${exp.company}</strong> - ${exp.role} (${exp.duration})
                                <p>${exp.description}</p>
                            </div>
                        `).join('')}
                    </body>
                </html>
            `;
            buffer = await generatePDF(html);
            contentType = 'application/pdf';
            fileName += '.pdf';
        } else {
            return res.status(400).json({ error: 'Invalid format' });
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.send(buffer);
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Failed to generate file' });
    }
});

module.exports = router;
