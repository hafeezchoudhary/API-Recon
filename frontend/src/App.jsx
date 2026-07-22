import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)
  const [analysis, setAnalysis] = useState(null);
  const [selectedFile, setSelectedFile] = useState("")
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    if (!file) {
      return alert("Select a file first")
    }
    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: formData
      })

      const data = await response.json()
      setAnalysis(data)
      setLoading(false)

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

  const downloadReport = async () => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/download-report`
      );

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "APILens_Report.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.log(error);

      alert("Failed to download report.");

    }
  };

  return (
    <>
      <Navbar></Navbar> 
      {/* <Home></Home> */}
      <Hero
        analysis={analysis}
        loading={loading}
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
      />

      {analysis && (
        <Dashboard
          analysis={analysis}
          downloadReport={downloadReport} 
        />
      )}
      <Footer></Footer>
    </>
  )
}

export default App
