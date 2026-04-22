const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const fs = require('fs');
const puppeteer = require('puppeteer-core');

/**
 * Generates a Word document from resume data.
 * @param {Object} data - The resume data.
 * @returns {Promise<Buffer>} - The generated .docx file as a buffer.
 */
async function generateWord(data) {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: data.name || "Name Not Provided",
                    heading: HeadingLevel.TITLE,
                }),
                new Paragraph({
                    children: [
                        new TextRun(data.email || ""),
                        new TextRun({ text: " | ", bold: true }),
                        new TextRun(data.phone || ""),
                    ],
                }),
                new Paragraph({ text: "Experience", heading: HeadingLevel.HEADING_1 }),
                ...(data.experience || []).map(exp => (
                    new Paragraph({
                        children: [
                            new TextRun({ text: exp.company + " - " + exp.role, bold: true }),
                            new TextRun({ text: " (" + exp.duration + ")", italics: true }),
                        ]
                    })
                )),
                new Paragraph({ text: "Skills", heading: HeadingLevel.HEADING_1 }),
                new Paragraph({ text: (data.skills || []).join(", ") }),
            ],
        }],
    });

    return await Packer.toBuffer(doc);
}

/**
 * Generates a PDF document from HTML content.
 * @param {string} htmlContent - The HTML to print.
 * @returns {Promise<Buffer>} - The generated PDF as a buffer.
 */
async function generatePDF(htmlContent) {
    // Note: In a production environment, you'd need the path to Chrome/Chromium.
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Standard Windows path
        headless: true
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    return pdfBuffer;
}

module.exports = { generateWord, generatePDF };
