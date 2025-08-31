Document Summary Assistant

This project implements a small, deployable Document Summary Assistant. The application is split into a React + Vite frontend and a Node.js + Express backend. The frontend provides a drag-and-drop/file-picker UI, displays upload progress and summaries, and supports three summary lengths (short, medium, long). The backend accepts uploaded files, distinguishes PDFs from images, and extracts text using `pdf-parse` for PDFs and `tesseract.js` for images. Extracted text is cleaned and then passed to a summarization step.

For summarization, the server attempts to call the OpenAI API when an `OPENAI_API_KEY` environment variable is present — this yields concise, context-aware summaries. If the key is not provided or the API call fails, the backend falls back to a simple extractive summarizer that picks top sentences by length and keyword presence. The system includes basic error handling, loading states, and clear success/error messages.

The repository is designed for a quick 8-hour implementation: clear separation of concerns, minimal dependencies, and configuration via environment variables. Deployment instructions for Vercel (frontend) and Render/Heroku (backend) are provided in the docs. This scaffold is production-ready for iterative polish and additional features like authentication, saved history, and more advanced ML summarizers.
