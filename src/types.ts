export interface Project {
  id: number
  title: string
  description: string
  supporters: number
  fundingGoal: number
  currentFunding: number
  impact: string
  category: string
  location: string
  carbonOffset: number
}

export interface UtilizationStep {
  date: string
  description: string
  amount: number
  percentage: number
}

export interface Donation {
  id: number
  projectId: number
  projectTitle: string
  amount: number
  date: string
  status: string
  utilization: UtilizationStep[]
}