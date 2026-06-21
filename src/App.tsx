import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import JobListings from './components/JobListings'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import SalaryPage from './pages/SalaryPage'

function Home() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchCity, setSearchCity] = useState('All of India')

  const handleSearch = (keyword: string, city: string) => {
    setSearchKeyword(keyword)
    setSearchCity(city)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero onSearch={handleSearch} />
      <JobListings keyword={searchKeyword} city={searchCity} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/:jobId" element={<ChatPage />} />
        <Route path="/salary" element={<SalaryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App