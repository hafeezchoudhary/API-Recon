import React from 'react'
import { getBackendStatus } from '../services/api'
import { useState } from 'react'

export default function Home() {
    const [selectedFile, setSelectedFile] = useState("")
    const [analysis, setAnalysis] = useState(null)
    const[Error, setError] = useState("") 

    
    const handleUpload = async (file) => {
        if (!file) { 
            return alert("Select a file first")
        } 
        const formData = new FormData()
        formData.append("file", file) 

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

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setSelectedFile(file)
        handleUpload(file)
    } 

    const downloadreport = () => {
        window.open("http://localhost:5000/download-report")
    }

    return (
        <div>
            <h1>API-Lens</h1>  
            <div> 
                <input type="file" onChange={handleFileChange} accept='.json' /> 
                {analysis &&
                    <div>
                        <h2>Collection Information</h2>
                        <p>-----------------------------------------------------------------------------------</p>

                        <span>Name: </span>{analysis.collection.name} <br />
                        <span>Schema: </span>{analysis.collection.schema} <br />
                        <span>Postman_id: </span>{analysis.collection.postman_id} <br />

                        
                        <h3>Summary</h3>
                        <p>----------------------</p>

                        <span>Total Requests: </span>{analysis.summary.total_requests} <br />
                        <span>Total Folders: </span>{analysis.summary.total_folders} 

                        <h3>Methods</h3>
                        <p>-----------------------</p>

                        <span>Get: </span>{analysis.methods.GET} <br />
                        <span>Post: </span>{analysis.methods.POST} <br />
                        <span>Put: </span>{analysis.methods.PUT} <br /> 
                        <span>Delete: </span>{analysis.methods.DELETE} <br />
                        <span>Patch: </span>{analysis.methods.PATCH} <br />

                        <h3>Authentication</h3>
                        <p>-----------------------</p>
                        <span>Bearer: </span>{analysis.authentication.bearer} <br />
                        <span>API Key: </span>{analysis.authentication.apikey} <br />
                        <span>Basic: </span>{analysis.authentication.basic} <br />
                        <span>OAuth2: </span>{analysis.authentication.oauth2} <br />
                        <span>No Auth: </span>{analysis.authentication.noauth} <br />

                        <h3>Variables</h3>
                        <p>-----------------------</p>
                        <span>Total variables: </span>{analysis.variables.count} <br />
                        <span>Keys: </span><br />
                        <ul>
                            {analysis.variables.name.map((key) => (
                                <li key={key}>{key}</li>
                            ))}
                        </ul>

                        <h3>Endpoints</h3>
                        <p>-----------------------</p>
                        {analysis.endpoints.map((endpoint, index) => (
                            <div key={index}> 
                                {endpoint.method} - {endpoint.url}
                            </div>
                        ))}

                        <h3>Headers</h3>
                        <p>-----------------------</p>
                        {Object.entries(analysis.headers).map(([key, value]) => (
                            <div key={key}>
                                {key} : {value} 
                            </div>
                        ))}

                        <h3>Query parameters</h3>
                        <p>-----------------------</p>
                        {Object.entries(analysis.query_parameters).map(([key, value]) => (
                            <div key={key}>
                                {key} : {value}
                            </div>
                        ))}

                        <h3>Sensitive Data</h3>
                        <p>-----------------------</p>
                        {analysis.sensitive_data.map((keyword, index) => (
                            <div key={index}>
                                {keyword} 
                            </div>
                        ))}

                        <h3>Response</h3>
                        <p>-----------------------</p>
                        {analysis.response.map((res, index) => (
                            <div key={index}>
                                {res.code} : {res.status}
                            </div>
                        ))}


                        <button onClick={downloadreport}>Download Report</button>

                    </div>
                } 
            </div>

    </div>
  )
}
