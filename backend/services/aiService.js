const Groq = require("groq-sdk");
require('dotenv').config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

/**
 * AI Resume Parser
 * Using 8b model for better availability and stability.
 */
async function parseResume(extractedText) {
    const prompt = `
    Analyze this resume text and convert it into a structured JSON object.
    CRITICAL: YOU MUST RETURN THE FULL JSON STRUCTURE EVEN IF FIELDS ARE EMPTY.
    
    Optimize the summary and descriptions to be high-impact, professional, and ATS-friendly.
    IMPORTANT: Provide experience and project descriptions as a series of BULLET POINTS, with each bullet on a new line starting with "• ".
    
    Structure Required: 
    {
      "personal": { "name": "", "email": "", "phone": "", "location": "", "summary": "" },
      "experience": [ { "company": "", "role": "", "duration": "", "description": "• Accomplishment 1\n• Accomplishment 2" } ],
      "education": [ { "school": "", "degree": "", "duration": "", "gpa": "" } ],
      "projects": [ { "title": "", "link": "", "description": "• Key feature\n• Tech used" } ],
      "skills": [],
      "certifications": [],
      "customSections": [ { "title": "Achievements", "items": [ { "label": "", "value": "" } ] } ]
    }
    
    Return ONLY a JSON object. No extra text.

    Text:
    ${extractedText.substring(0, 10000)}
    `;

    try {
        const comp = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });
        return JSON.parse(comp.choices[0].message.content);
    } catch (e) { 
        console.error("AI Parse Error Details:", e);
        throw new Error(`AI Parsing failed: ${e.message}`); 
    }
}

async function optimizeResume(resumeData, jobDescription) {
    const prompt = `
    Act as a professional resume writer and ATS expert. 
    Optimize the PROVIDED resume data to perfectly match the Job Description (JD).
    Target an ATS score of 95+.
    
    Instructions:
    1. Rewrite experience and project descriptions to include keywords from the JD.
    2. Use the STAR method (Situation, Task, Action, Result) for achievements.
    3. Ensure the summary is tailored to the role.
    4. Suggest additional skills or certifications if missing.
    5. Maintain the existing JSON structure exactly.
    
    Return a JSON object with:
    {
      "optimizedData": { ...all fields from original resumeData but optimized },
      "suggestions": ["suggestion 1", ...],
      "matchScore": 95
    }

    Resume: ${JSON.stringify(resumeData)}
    JD: ${jobDescription}
    `;
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });
        return JSON.parse(chatCompletion.choices[0].message.content);
    } catch (error) { throw new Error("AI Optimization Error"); }
}

async function auditResume(resumeText, jobDescription) {
    const isGeneralAudit = !jobDescription || jobDescription.trim().length < 5;
    const prompt = isGeneralAudit ? `
    Act as a Tier-1 Executive Talent Auditor. Perform a Professional Profile Deep-Dive.
    
    EVALUATION CATEGORIES & WEIGHTS:
    1. Keyword Density & Placement (30%): Are skills strategically placed in Summary + Experience + Skills?
    2. Role Relevance & Continuity (25%): Past titles and career progression impact.
    3. Quantified Achievements (20%): Metrics, ROI, numbers (%, $, #).
    4. Action Verbs & Tone (15%): Strength of verbs (Built, Led, Optimized) vs weak ones.
    5. Formatting & Categorization (10%): Standard headings, skill grouping (Tech/Tools/Soft).

    STRICT RULES:
    - Penalize tables, images, columns, and non-standard layouts.
    - Check for "Education", "Experience", and "Skills" headings.
    - Identify keyword stuffing (repetition without context).
    - Ensure tense consistency (Past tense for previous roles).

    Return a JSON object:
    {
      "score": 0-100,
      "breakdown": {
        "keywords": 0-30,
        "relevance": 0-25,
        "impact": 0-20,
        "verbs": 0-15,
        "formatting": 0-10
      },
      "verdict": "Sophisticated brand summary",
      "improvements": ["Critical structural/content fix 1", ...],
      "matchingKeywords": ["Strong skill matches", ...],
      "missingKeywords": ["Mandatory industry skills missing", ...],
      "formattingRisks": ["Specific layout blockers", ...],
      "impactAnalysis": "Detailed strategy on quantifying results better.",
      "strategicMoves": ["Actionable career pivot 1", "step 2", ...]
    }

    Resume: ${resumeText}
    ` : `
    Act as a Stringent ATS Scanner. Perform a High-Stakes Profile Analysis against this JD.
    
    CALIBRATION WEIGHTS (TOTAL 100):
    1. JD Keyword Match & Placement (30%): Must appear in Summary, Experience, AND Skills.
    2. Direct Experience Relevance (25%): Do recent roles match JD expectations?
    3. Quantified Impact (20%): Does the candidate prove results with numbers?
    4. Action Verb Strength (15%): Use of "Developed", "Built", "Implemented" etc.
    5. Grammar, Tense & Formatting (10%): Consistency and standard ATS structure.

    STRICT PENALTIES:
    - -10% for using tables/columns/images in formatting.
    - -5% for missing any of the 3 standard headings.
    - -10% if NO metrics/numbers are found in Experience.
    - -5% for weak verbs or inconsistent tenses.
    - -10% for obvious keyword stuffing.

    Return a JSON object:
    {
      "score": 1-100 (Objective match score based on weights above),
      "breakdown": {
        "keywords": 0-30,
        "relevance": 0-25,
        "impact": 0-20,
        "verbs": 0-15,
        "formatting": 0-10
      },
      "verdict": "Hard match evaluation summary",
      "improvements": ["Specific gap fix 1", ...],
      "mandatoryKeywords": ["Core JD requirements missing", ...],
      "matchingKeywords": ["Keyword matches found", ...],
      "missingKeywords": ["Keywords to add for optimization", ...],
      "formattingRisks": ["ATS compatibility issues detected", ...],
      "impactAnalysis": "How to align accomplishments with this specific JD requirements.",
      "strategicMoves": ["Pivot strategy for this specific role 1", ...]
    }

    Resume: ${resumeText}
    JD: ${jobDescription}
    `;
    try {
        const comp = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });
        return JSON.parse(comp.choices[0].message.content);
    } catch (e) { throw new Error("AI Audit Error"); }
}

async function generateCoverLetter(resumeData, jobDescription) {
    const prompt = `Write a professional, ATS-friendly cover letter. JSON: { "letter": "..." }. Resume: ${JSON.stringify(resumeData)}. JD: ${jobDescription}`;
    try {
        const comp = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });
        return JSON.parse(comp.choices[0].message.content);
    } catch (e) { throw new Error("AI Letter Error"); }
}

async function generateInterviewPrep(resumeData, jobDescription) {
    const prompt = `Generate 5 interview questions + tips based on this resume and JD. JSON: { "questions": [ { "q": "...", "tip": "..." } ] }. Resume: ${JSON.stringify(resumeData)}. JD: ${jobDescription}`;
    try {
        const comp = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });
        return JSON.parse(comp.choices[0].message.content);
    } catch (e) { throw new Error("AI Prep Error"); }
}

module.exports = { parseResume, optimizeResume, auditResume, generateCoverLetter, generateInterviewPrep };
