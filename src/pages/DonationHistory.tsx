import React, { useState } from 'react'
import { Calendar, DollarSign, ChevronDown, ChevronUp, Leaf } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AIChatbot from '../components/AIChatbot'

interface UtilizationStep {
  date: string
  description: string
  amount: number
  percentage: number
}

interface Donation {
  id: number
  projectId: number
  projectTitle: string
  amount: number
  date: string
  status: string
  utilization: UtilizationStep[]
}

interface DonationHistoryProps {
  donations: Donation[]
}

const DonationHistory: React.FC<DonationHistoryProps> = ({ donations }) => {
  const [expandedDonations, setExpandedDonations] = useState<number[]>([])
  const [openChatbots, setOpenChatbots] = useState<number[]>([])

  const toggleDonation = (id: number) => {
    setExpandedDonations(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const toggleChatbot = (id: number) => {
    setOpenChatbots(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-green-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Green Impact Journey
      </motion.h1>
      {donations.length === 0 ? (
        <motion.p 
          className="text-center text-gray-500 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You haven't made any donations yet. Start your journey to make a difference!
        </motion.p>
      ) : (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {donations.map((donation) => (
            <motion.div 
              key={donation.id} 
              className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start justify-between cursor-pointer" onClick={() => toggleDonation(donation.id)}>
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-green-700">{donation.projectTitle}</h2>
                    <p className="text-gray-600">{new Date(donation.date).toLocaleDateString()}</p>
                    <div className="flex items-center text-green-600 mt-1">
                      <DollarSign className="h-5 w-5 mr-1" />
                      <span className="font-semibold">${donation.amount}</span>
                      <span className="ml-2 text-gray-500">({donation.status})</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {expandedDonations.includes(donation.id) ? (
                    <ChevronUp className="h-6 w-6 text-green-500" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-green-500" />
                  )}
                </motion.div>
              </div>
              <AnimatePresence>
                {expandedDonations.includes(donation.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-4 border-t pt-4">
                      <h3 className="text-lg font-semibold mb-2 text-green-700">Donation Utilization Timeline</h3>
                      <div className="space-y-4">
                        {donation.utilization.map((step, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center bg-green-50 p-3 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="w-1/4">
                              <p className="font-semibold text-green-700">{new Date(step.date).toLocaleDateString()}</p>
                            </div>
                            <div className="w-1/2">
                              <p className="text-gray-700">{step.description}</p>
                            </div>
                            <div className="w-1/4 text-right">
                              <p className="font-semibold text-green-600">${step.amount.toFixed(2)}</p>
                              <p className="text-sm text-gray-500">({step.percentage}% of total)</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 border-t pt-4">
                      <motion.button
                        onClick={() => toggleChatbot(donation.id)}
                        className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {openChatbots.includes(donation.id) ? 'Close' : 'Open'} Project AI Assistant
                      </motion.button>
                      <AnimatePresence>
                        {openChatbots.includes(donation.id) && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <AIChatbot projectTitle={donation.projectTitle} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default DonationHistory