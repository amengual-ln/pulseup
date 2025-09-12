export type TeamType = 'gym' | 'personal'

export interface Team {
  id: string
  name: string
  type: TeamType
  settings: {
    gym?: {
      maxMembers?: number
    }
    personal?: {
      maxClients?: number
      enableProgressTracking?: boolean
      enableMealPlans?: boolean
    }
  }
  members: TeamMember[]
  createdAt: Date
}

export interface TeamMember {
  userId: string
  role: 'admin' | 'trainer' | 'member'
  joinedAt: Date
}