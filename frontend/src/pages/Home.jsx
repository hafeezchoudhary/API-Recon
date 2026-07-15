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
        if (!selectedFile) {
            return alert("Select a file first")
        } 
        const formData = new FormData()
        formData.append("file", selectedFile)

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData
            })

            const data = await response.json()
            setAnalysis(data) 
            
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
                    <div>
                        <h2>Collection Information</h2>
                        <span>Name: </span>{analysis.collection.name} <br />
                        <span>Schema: </span>{analysis.collection.schema} <br />
                        <span>Postman_id: </span>{analysis.collection.postman_id} <br />

                        <p>-----------------------------------------------------------------------------------</p>
                        
                        <h3>Summary</h3>
                        <span>Total Requests: </span>{analysis.summary.total_requests} <br />
                        <span>Total Folders: </span>{analysis.summary.total_folders} 

                        <h3>Methods</h3>
                        <span>Get: </span>{analysis.methods.GET} <br />
                        <span>Post: </span>{analysis.methods.POST} <br />
                        <span>Put: </span>{analysis.methods.PUT} <br /> 
                        <span>Delete: </span>{analysis.methods.DELETE} <br />
                        <span>Patch: </span>{analysis.methods.PATCH} <br />
                    </div>
                } 
            </div>

    </div>
  )
}
