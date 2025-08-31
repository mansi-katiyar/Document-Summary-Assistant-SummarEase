import React from 'react'
import Uploader from './components/Uploader'
export default function App(){
  return (
    <div className="app">
      <header><h1>Document Summary Assistant</h1></header>
      <main>
        <Uploader />
      </main>
      <footer>Built for assessment — includes PDF and image OCR + optional OpenAI summarization</footer>
    </div>
  )
}
