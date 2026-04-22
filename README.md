# EliteResume AI 🚀
### Next-Gen AI Resume Engine & ATS Optimizer

EliteResume AI is a high-performance, full-stack application designed to help job seekers bypass Applicant Tracking Systems (ATS) and land more interviews. Powered by **Llama 3.3 (via Groq)** and **Tesseract.js**, it offers a deep, data-driven approach to resume building.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-cyan.svg)
![Node](https://img.shields.io/badge/Node-20+-green.svg)
![AI](https://img.shields.io/badge/AI-Llama--3-orange.svg)

---

## ✨ Key Features

- **🤖 AI-Powered Parsing:** Instantly convert existing PDFs, Word docs, or even images into a structured, editable resume.
- **📊 Stringent ATS Scan:** A weighted scoring engine that analyzes keywords, action verbs, and impact metrics.
- **🔍 JD Matcher:** Paste a Job Description to get real-time optimization suggests to hit a 90+ match score.
- **🖼️ OCR Integration:** Built-in Tesseract.js allows you to scan physical documents or image files of JDs.
- **📄 Elite Export:** Professional PDF generation with `@react-pdf/renderer` and Word export support.
- **🧠 AI Agent Lab:** Generate tailored Cover Letters and Interview Prep questions in seconds.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS + Framer Motion (Animations)
- **Icons:** Lucide React
- **Logic:** Axios, Tesseract.js, PDF.js

### Backend
- **Runtime:** Node.js + Express
- **AI Orchestration:** Groq SDK (Llama 3.3 70B)
- **Document Handling:** Puppeteer, Multer, Mammoth, Docx

---

## ⚡ Quick Start

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/ery133/Elite-Resume-Builder.git

# Install dependencies for all parts
npm run install-all
```

### 2. Configure Environment
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
NODE_ENV=development
```

### 3. Run Development
```bash
# Start both Frontend and Backend concurrently
npm run dev
```

---

## 📸 Screenshots
*(Add your screenshots here to show off the premium UI!)*

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

---
*Built with ❤️ for every job seeker.*
