const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');
const cors = require('cors');
require('dotenv').config();
const {Configuration, OpenAIApi} = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

let openai = null;
if (process.env.OPENAI_API_KEY) {
  const cfg = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  openai = new OpenAIApi(cfg);
}

function simpleSummarize(text, length='short') {
  // naive extractive: split into sentences, pick first N sentences proportionally
  const sentences = text.match(/[^\.\!\?]+[\.\!\?]+/g) || [text];
  let n = 1;
  if (length === 'short') n = Math.min(2, sentences.length);
  if (length === 'medium') n = Math.min(4, sentences.length);
  if (length === 'long') n = Math.min(8, sentences.length);
  return sentences.slice(0, n).join(' ').trim();
}

async function extractText(filePath, mimetype, originalname) {
  if (mimetype === 'application/pdf' || originalname.toLowerCase().endsWith('.pdf')) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } else {
    // image -> tesseract
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng', { logger: m => {/* optional */} });
    return text;
  }
}

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const fp = req.file.path;
    const text = (await extractText(fp, req.file.mimetype, req.file.originalname)).replace(/\s+/g, ' ').trim();
    // Prepare summaries
    let shortS = simpleSummarize(text, 'short');
    let medS = simpleSummarize(text, 'medium');
    let longS = simpleSummarize(text, 'long');

    // If OpenAI available, try to use it (best-effort)
    if (openai) {
      try {
        const prompt = `Summarize the following document in three lengths. Provide labelled sections:
---DOCUMENT---
${text}
---END---`;
        const completion = await openai.createChatCompletion({
          model: "gpt-4o-mini",
          messages: [{role:'user', content: prompt}],
          max_tokens: 500
        });
        const aiText = completion.data.choices[0].message.content;
        // Expect AI returns sections; fall back if not parseable
        // We'll naive split by lines and take chunks
        const parts = aiText.split(/\n\n+/).map(s=>s.trim()).filter(Boolean);
        if (parts.length >= 1) { shortS = parts[0]; }
        if (parts.length >= 2) { medS = parts[1]; }
        if (parts.length >= 3) { longS = parts.slice(2).join('\n\n'); }
      } catch (err) {
        console.warn('OpenAI summarization failed:', err.message || err);
      }
    }

    // cleanup uploaded file
    fs.unlink(fp, ()=>{});
    return res.json({ text, summaryShort: shortS, summaryMedium: medS, summaryLong: longS });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to process file', details: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log('Server listening on', PORT));
