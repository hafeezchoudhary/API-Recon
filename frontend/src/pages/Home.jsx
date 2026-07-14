import React from 'react'
import { getBackendStatus } from '../services/api'
import { useState } from 'react'

export default function Home() {
    const [selectedFile, setSelectedFile] = useState("")
    const [analysis, setAnalysis] = useState(null)
    const[Error, setError] = useState("") 

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    } 

    const handleUpload = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file", selectedFile)

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData
            })

            const data = await response.json()
            setAnalysis(data) 
            if (response.ok) { 
                console.log(data);
            } else {
                console.log(data.error || 'Upload failed.')
            } 
            
        } catch (e) {
            console.error('Error uploading file:', e)
            console.log('An error occurred during upload.')
        }
        
    }

    return (
        <div>
            <h1>API-Lens</h1>  
            <div> 
                    <input type="file" onChange={handleFileChange} accept='.json' /> 
                    <button type="submit" onClick={handleUpload}>upload</button> 
                {analysis &&
                    <p>{analysis.collection.name} <br /> {analysis.collection.schema} <br /> {analysis.collection.postman_id}</p>
                } 
            </div>

    </div>
  )
}
