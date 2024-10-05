import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import CommunityForum from './pages/CommunityForum'
import DonationHistory from './pages/DonationHistory'
import { Donation } from './types'

function App() {
  const [donations, setDonations] = useState<Donation[]>([])

  const addDonation = (donation: Donation) => {
    setDonations(prevDonations => [...prevDonations, donation])
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-blur">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects addDonation={addDonation} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/community" element={<CommunityForum />} />
            <Route path="/donation-history" element={<DonationHistory donations={donations} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App