# Document Summary Assistant

A minimal Document Summary Assistant (frontend + backend) scaffold.
Features:
- Upload PDF or image files (drag & drop or file picker)
- Extract text from PDFs (pdf-parse) and images (Tesseract)
- Generate summaries using OpenAI (if OPENAI_API_KEY is set) or a simple fallback summarizer
- Simple responsive React UI (Vite)

See `server/README_BACKEND.md` and `client/README_FRONTEND.md` for run instructions.

Deliverables included:
- Working app (locally runnable)
- GitHub-friendly structure
- Brief write-up (200 words) in `BRIEF_WRITEUP.md`
---
- ## 📂 Project Folder Structure
  
document-summary-assistant
├── client/ # Frontend (React + Vite)

│ ├── public/ # Static files

│ ├── src/ # React source code

│ │ ├── components/ # React components

│ │ │ └── Uploader.jsx

│ │ ├── App.jsx

│ │ ├── main.jsx

│ │ ├── config.js

│ │ └── styles.css

│ ├── index.html

│ ├── package.json

│ └── vite.config.js

│
├── server/ # Backend (Node.js + Express)

│ ├── uploads/ # Temporary upload storage

│ ├── server.js # Express server

│ ├── package.json

│ ├── .env.example # Example environment file

│ └── README_BACKEND.md

│
├── .gitignore # Ignored files (node_modules, uploads, .env)

├── README.md # Main documentation

├── BRIEF_WRITEUP.md # 200-word approach write-up

└── package-lock.json


