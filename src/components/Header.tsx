import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, DollarSign, Users, MessageCircle, Clock } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8" />
          <span className="text-xl font-bold">EcoFinance Civic</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-green-200 flex items-center"><Leaf className="h-4 w-4 mr-1" /> Home</Link></li>
            <li><Link to="/projects" className="hover:text-green-200 flex items-center"><Users className="h-4 w-4 mr-1" /> Projects</Link></li>
            <li><Link to="/dashboard" className="hover:text-green-200 flex items-center"><DollarSign className="h-4 w-4 mr-1" /> Dashboard</Link></li>
            <li><Link to="/community" className="hover:text-green-200 flex items-center"><MessageCircle className="h-4 w-4 mr-1" /> Community</Link></li>
            <li><Link to="/donation-history" className="hover:text-green-200 flex items-center"><Clock className="h-4 w-4 mr-1" /> Donation History</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header