import React from 'react'
import { getBackendStatus } from '../services/api'
import { useState } from 'react'

export default function Home() {
    const [backendMessage, setBackendMessage] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
    const[Error, setError] = useState("") 
    const handleCheckBackend = async () => {
    const result = await getBackendStatus()
        setBackendMessage(result.message)
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    } 

    const handleUpload = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", selectedFile)

        try {
            if (!selectedFile) {
                console.log("File not found")
            } else {
                const response = await fetch("http://localhost:5000/upload", {
                    method: "POST",
                    body: formData
                })
                const data = response.json()
                if (response.ok) {
                    console.log(data.message)
                } else {
                    console.log("error")
                } 
            }
        } catch (e) {
            console.error(e)

        }
        
    }

    return (
        <div>
            <h1>API-Lens</h1>
            <button onClick={handleCheckBackend}>check backend</button>
            <div>{backendMessage}</div>  

            <div>
                <form method='post'> 
                    <input type="file" onChange={handleFileChange} accept='.json' /> 
                    <button type="submit" onClick={handleUpload}>upload</button>
                    {selectedFile && <p> selected File : {selectedFile.name}</p>}
                </form>

            </div>

    </div>
  )
}
