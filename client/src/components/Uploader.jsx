import React, {useState, useRef} from 'react'
import axios from 'axios'
import {API_BASE} from '../config'

export default function Uploader(){
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileRef = useRef()

  async function sendFile(f){
    setLoading(true); setResult(null)
    const fd = new FormData(); fd.append('file', f)
    try{
      const res = await axios.post(`${API_BASE}/api/upload`, fd, { headers:{'Content-Type':'multipart/form-data'} })
      setResult(res.data)
    }catch(e){
      setResult({ error: e.response?.data?.error || e.message })
    }finally{ setLoading(false) }
  }

  function onPick(e){
    const f = e.target.files[0]; if (!f) return
    setFile(f); sendFile(f)
  }

  function onDrop(e){
    e.preventDefault()
    const f = e.dataTransfer.files[0]; if (!f) return
    setFile(f); sendFile(f)
  }

  return (
    <div>
      <div className="uploader" onDrop={onDrop} onDragOver={(e)=>e.preventDefault()}>
        <p>Drag & drop a PDF or image here, or</p>
        <div className="controls">
          <input ref={fileRef} type="file" onChange={onPick} />
          <button onClick={()=>fileRef.current.click()}>Choose file</button>
          {loading && <span className="loading">Processing...</span>}
        </div>
      </div>

      {result && result.error && <div className="summary">Error: {result.error}</div>}

      {result && !result.error && (
        <>
          <div className="summary"><h3>Short Summary</h3><p>{result.summaryShort}</p></div>
          <div className="summary"><h3>Medium Summary</h3><p>{result.summaryMedium}</p></div>
          <div className="summary"><h3>Long Summary</h3><p>{result.summaryLong}</p></div>
          <div className="summary"><h3>Full Extracted Text (truncated)</h3><p>{result.text ? result.text.slice(0,2000) : ''}</p></div>
        </>
      )}
    </div>
  )
}
