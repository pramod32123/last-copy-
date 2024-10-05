import React from 'react'
import { ArrowRight, Leaf, Users, DollarSign, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">EcoFinance Civic: Invest in a Greener Tomorrow</h1>
      <p className="text-xl mb-8">Where your financial decisions shape a sustainable future for all</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Link to="/projects" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Community Projects</h2>
          <p className="mb-4">Be the change you wish to see. Support local initiatives that matter.</p>
          <span className="text-green-500 flex items-center justify-center">
            Make a Difference <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>
        <Link to="/dashboard" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Impact Dashboard</h2>
          <p className="mb-4">Track your investments and see the real-world impact you're making.</p>
          <span className="text-green-500 flex items-center justify-center">
            Monitor Progress <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>
        <Link to="/community" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Community Forum</h2>
          <p className="mb-4">Join the conversation. Together, we can create a sustainable future.</p>
          <span className="text-green-500 flex items-center justify-center">
            Connect & Collaborate <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>
      </div>
      <div className="bg-green-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Our Collective Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-4xl font-bold text-green-600">$1.2M</p>
            <p className="text-lg">Invested in a greener future</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">5,000+</p>
            <p className="text-lg">EcoWarriors making a difference</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">10,000</p>
            <p className="text-lg">Tons of CO2 offset (and counting!)</p>
          </div>
        </div>
      </div>
      <div className="mt-12 text-xl">
        <p>"Small actions, when multiplied by millions of people, can transform the world."</p>
        <p className="font-bold mt-2">Join the EcoFinance movement today!</p>
      </div>
    </div>
  )
}

export default Home