# Backend - Document Summary Assistant

Requirements:
- Node.js 18+ recommended
- Install dependencies: `npm install`

Environment:
- Create a `.env` file in server/ with:
  ```
  PORT=4000
  OPENAI_API_KEY=your_openai_api_key   # optional
  ```
Run:
- Development: `npm run dev`
- Production: `npm start`

API:
- POST /api/upload  -> multipart/form-data with `file` field
  Returns JSON: { text: "...", summaryShort, summaryMedium, summaryLong }

Notes:
- Uses `pdf-parse` for PDFs and `tesseract.js` for images.
- If OPENAI_API_KEY is present, the server will attempt to call OpenAI's ChatCompletion.
