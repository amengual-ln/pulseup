export interface TeamMember {
  userId: number
  role: 'admin' | 'trainer' | 'member'
  joinedAt: Date
}

export interface Team {
  id: number
  name: string
  description: string
  createdAt: Date
  members: TeamMember[]
}

export const useTeamStore = defineStore('team', {
  state: () => ({
    teams: [] as Team[],
    currentTeam: null as Team | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    userTeams: (state) => (userId: number) => {
      return state.teams.filter(team => 
        team.members.some(member => member.userId === userId)
      )
    },
    
    isTeamAdmin: (state) => (userId: number, teamId: number) => {
      const team = state.teams.find(t => t.id === teamId)
      if (!team) return false
      
      const member = team.members.find(m => m.userId === userId)
      return member?.role === 'admin'
    },
  },

  actions: {
    async fetchUserTeams(userId: number): Promise<void> {
      this.loading = true
      try {
        // TODO: Implementar llamada a API
        // this.teams = await api.getUserTeams(userId)
      } catch (error) {
        this.error = 'Error al cargar los equipos'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createTeam(teamData: Omit<Team, 'id' | 'createdAt' | 'members'>, creatorId: number): Promise<Team | null> {
      this.loading = true
      try {
        const newTeam: Team = {
          ...teamData,
          id: Date.now(), // Temporal, debería venir del backend
          createdAt: new Date(),
          members: [{
            userId: creatorId,
            role: 'admin',
            joinedAt: new Date()
          }]
        }
        
        this.teams.push(newTeam)
        return newTeam
      } catch (error) {
        this.error = 'Error al crear el equipo'
        console.error(error)
        return null
      } finally {
        this.loading = false
      }
    },

    async addTeamMember(teamId: number, userId: number, role: TeamMember['role'] = 'member'): Promise<boolean> {
      try {
        const team = this.teams.find(t => t.id === teamId)
        if (!team) return false

        // Evitar duplicados
        if (team.members.some(m => m.userId === userId)) {
          return false
        }

        team.members.push({
          userId,
          role,
          joinedAt: new Date()
        })

        return true
      } catch (error) {
        console.error('Error adding team member:', error)
        return false
      }
    },

    async removeTeamMember(teamId: number, userId: number): Promise<boolean> {
      try {
        const team = this.teams.find(t => t.id === teamId)
        if (!team) return false

        const initialLength = team.members.length
        team.members = team.members.filter(m => m.userId !== userId)
        
        // Si no quedan miembros, eliminar el equipo
        if (team.members.length === 0) {
          this.teams = this.teams.filter(t => t.id !== teamId)
        }

        return team.members.length < initialLength
      } catch (error) {
        console.error('Error removing team member:', error)
        return false
      }
    },
  },
})
