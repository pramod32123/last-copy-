import React, { useState, useEffect } from 'react'
import { ThumbsUp, Users, DollarSign, Leaf, Search, Wallet } from 'lucide-react'
import DonationModal from '../components/DonationModal'
import { Project, Donation } from '../types'

interface ProjectsProps {
  addDonation: (donation: Donation) => void
}

const Projects: React.FC<ProjectsProps> = ({ addDonation }) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [walletBalance, setWalletBalance] = useState(1000) // Example initial balance
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch projects from an API or load from a local data source
    const fetchProjects = async () => {
      setIsLoading(true)
      // This is a placeholder. Replace with actual API call or data loading logic
      const dummyProjects: Project[] = [
        {
          id: 1,
          title: "Solar Power for Rural Schools",
          description: "Bringing renewable energy to underserved educational institutions.",
          supporters: 120,
          fundingGoal: 50000,
          currentFunding: 35000,
          impact: "Provide clean energy to 10 schools",
          category: "renewable-energy",
          location: "Rural India",
          carbonOffset: 500
        },
        {
          id: 2,
          title: "Reforestation Initiative",
          description: "Planting trees to combat deforestation and climate change.",
          supporters: 250,
          fundingGoal: 100000,
          currentFunding: 75000,
          impact: "Plant 10,000 trees",
          category: "conservation",
          location: "Amazon Rainforest",
          carbonOffset: 1000
        },
        {
          id: 3,
          title: "Clean Water for Communities",
          description: "Providing access to clean and safe drinking water in developing regions.",
          supporters: 180,
          fundingGoal: 75000,
          currentFunding: 45000,
          impact: "Bring clean water to 5,000 people",
          category: "clean-water",
          location: "Sub-Saharan Africa",
          carbonOffset: 200
        },
        {
          id: 4,
          title: "Sustainable Agriculture Program",
          description: "Implementing eco-friendly farming practices to improve crop yields and reduce environmental impact.",
          supporters: 90,
          fundingGoal: 60000,
          currentFunding: 20000,
          impact: "Train 500 farmers in sustainable methods",
          category: "sustainable-agriculture",
          location: "Southeast Asia",
          carbonOffset: 300
        },
        {
          id: 5,
          title: "Urban Green Spaces Initiative",
          description: "Creating and maintaining green areas in cities to improve air quality and community well-being.",
          supporters: 150,
          fundingGoal: 80000,
          currentFunding: 55000,
          impact: "Develop 10 new urban parks",
          category: "conservation",
          location: "Global Cities",
          carbonOffset: 400
        }
      ]
      setTimeout(() => {
        setProjects(dummyProjects)
        setIsLoading(false)
      }, 1500) // Simulating API delay
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === '' || project.category === categoryFilter)
  )

  const handleSupportProject = (project: Project) => {
    setSelectedProject(project)
    setShowDonationModal(true)
  }

  const handleDonation = (amount: number) => {
    if (selectedProject) {
      const newDonation: Donation = {
        id: Date.now(), // Use a proper ID generation in a real app
        projectId: selectedProject.id,
        projectTitle: selectedProject.title,
        amount: amount,
        date: new Date().toISOString(),
        status: 'Completed',
        utilization: [
          { date: '2024-10-15', description: 'Initial project setup and planning', amount: amount * 0.2, percentage: 20 },
          { date: '2024-11-30', description: 'Equipment procurement', amount: amount * 0.3, percentage: 30 },
          { date: '2025-01-15', description: 'On-site implementation begins', amount: amount * 0.25, percentage: 25 },
          { date: '2025-03-01', description: 'Community training programs', amount: amount * 0.15, percentage: 15 },
          { date: '2025-04-30', description: 'Final project evaluation and reporting', amount: amount * 0.1, percentage: 10 }
        ]
      }
      addDonation(newDonation)
      setWalletBalance(prevBalance => prevBalance - amount)
      setShowDonationModal(false)
      // Update project funding (this is a simplification, in a real app you'd update the backend)
      setProjects(prevProjects => 
        prevProjects.map(p => 
          p.id === selectedProject.id 
            ? {...p, currentFunding: p.currentFunding + amount, supporters: p.supporters + 1}
            : p
        )
      )
    }
  }

  const handleLoadWallet = () => {
    setIsLoading(true)
    // Simulating wallet loading process
    setTimeout(() => {
      setWalletBalance(prevBalance => prevBalance + 500)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Community Projects</h1>
      
      {/* Wallet Box */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <Wallet className="h-6 w-6 text-green-500 mr-2" />
          <span className="font-semibold">Wallet Balance: ${walletBalance.toLocaleString()}</span>
        </div>
        <button
          onClick={handleLoadWallet}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load Funds'}
        </button>
      </div>
      
      {/* Search and filter controls */}
      <div className="mb-6 flex items-center">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full p-2 pl-10 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select
          className="p-2 border rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="renewable-energy">Renewable Energy</option>
          <option value="conservation">Conservation</option>
          <option value="sustainable-agriculture">Sustainable Agriculture</option>
          <option value="clean-water">Clean Water</option>
        </select>
      </div>

      {/* Project list */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="flex items-center text-green-600">
                  <Users className="h-5 w-5 mr-1" />
                  {project.supporters} supporters
                </span>
                <span className="flex items-center text-blue-600">
                  <Leaf className="h-5 w-5 mr-1" />
                  {project.carbonOffset} tons CO2 offset
                </span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>${project.currentFunding.toLocaleString()} raised</span>
                  <span>${project.fundingGoal.toLocaleString()} goal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <button
                onClick={() => handleSupportProject(project)}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
              >
                Support Project
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Donation Modal */}
      {showDonationModal && selectedProject && (
        <DonationModal
          project={selectedProject}
          onClose={() => setShowDonationModal(false)}
          onDonate={handleDonation}
          walletBalance={walletBalance}
        />
      )}
    </div>
  )
}

export default Projects