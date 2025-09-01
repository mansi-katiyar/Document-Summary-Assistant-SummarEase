# 📑 Document Summary Assistant

A deployable **Document Summary Assistant** built with React (frontend) and Node.js/Express (backend).  
This app allows users to upload PDF or image documents, extract their text, and generate **short, medium, or long summaries**.  
It uses **OCR (Tesseract.js)** for scanned documents and integrates with **OpenAI API** for AI-powered summaries (if a key is provided).  

---

## 🔎 Overview

The Document Summary Assistant is designed as a technical assessment project that demonstrates:
- Practical file handling (upload PDFs/images)
- Text extraction via parsing and OCR
- Automatic summarization with AI fallback
- Clean, modular frontend and backend code
- Deployment-ready structure for platforms like Vercel (frontend) and Render/Heroku (backend)

---

## 🚀 Features

- 📂 Upload PDFs or image files (drag & drop or file picker)  
- 📝 Extract text using:
  - `pdf-parse` (for PDFs)  
  - `tesseract.js` (for images/scanned documents)  
- ✨ Summarization:
  - Short, medium, and long summaries  
  - Uses **OpenAI API** if `OPENAI_API_KEY` is provided  
  - Falls back to a simple keyword-based summarizer if no API key  
- 📱 Responsive React frontend (works on desktop & mobile)  
- ⚡ Error handling and loading states  

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (>= 18.x)  
- npm (comes with Node.js)  
- (Optional) OpenAI API Key → [Get Key](https://platform.openai.com/)  

---

## ⚙️ Installation

### 1. Clone the repository
git clone https://github.com/yourusername/document-summary-assistant.git
cd document-summary-assistant

### 2. Backend Setup
cd server
npm install
npm run dev


Runs on http://localhost:4000

Create a .env file inside server/:

PORT=4000
OPENAI_API_KEY=your_api_key_here   # optional

### 3. Frontend Setup
cd client
npm install
npm run dev

---

## 📂 Project Structure
document-summary-assistant/
├── client/                 # React + Vite frontend

│   ├── src/                # Components, styles, config

│   ├── public/

│   └── package.json

│

├── server/                 # Node.js backend

│   ├── uploads/            # Uploaded files

│   ├── server.js           # Express API

│   ├── package.json

│   └── .env.example

│

├── BRIEF_WRITEUP.md        # Approach summary

├── README.md               # Documentation

└── .gitignore
---
## 📡 API Endpoints
### POST /upload

-Description: Uploads a file (PDF or image), extracts text, and returns summaries.

-Request: multipart/form-data with file field

-Response:

{
  "text": "Full extracted text...",
  "summary": {
    "short": "Short summary...",
    "medium": "Medium summary...",
    "long": "Long summary..."
  }
}
---
## 💻 Frontend Usage

1. Start backend (npm run dev inside server/).

2. Start frontend (npm run dev inside client/).

3. Open http://localhost:5173 in your browser.

4. Upload a PDF or image → wait for extraction → view summaries.
---
## 🧰 Technologies Used

-Frontend: React, Vite, Axios

-Backend: Node.js, Express, Multer, pdf-parse, Tesseract.js

-AI Summarization: OpenAI API (fallback extractive summarizer included)

-Other: dotenv, cors, nodemon
---
## 🐞 Troubleshooting

-npm install fails → Ensure Node.js v18+ is installed (node -v).

-Backend not starting → Check if port 4000 is free, and .env file exists.

-OpenAI summarization not working → Add valid OPENAI_API_KEY in .env.

-Frontend can't reach backend → Make sure both servers are running.
---
## 🔮 Future Enhancements

-✅ User authentication & saved history of uploads

-✅ More advanced ML summarizers (e.g., HuggingFace transformers)

-✅ Multi-language OCR support

-✅ Export summaries as PDF/Word

-✅ Drag & drop multiple file uploads
---
##📜 License

This project is licensed under the MIT License — free to use, modify, and distribute.
---
##🖼️ Workflow (Setup Diagram)
![img url]([workflow.png](https://github.com/mansi-katiyar/Document-Summary-Assistant-SummarEase/blob/084a4f2e78bc8ce87dda602efbec1bdd0cb451ca/Screenshot%202025-09-01%20050551.png))
