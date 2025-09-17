import type { User } from '~/types/user'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getUsersByRole: (state) => (role: string) => {
      return state.users.filter(user => user.role === role)
    },
    getUserById: (state) => (id: number) => {
      return state.users.find(user => user.id === id)
    },
  },

  actions: {
    async fetchUsers(): Promise<void> {
      if (this.users.length > 0) return
      
      this.loading = true
      this.error = null
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        this.users = [
          {
            id: 1,
            username: 'admin',
            email: 'admin@pulse.com',
            role: 'admin',
            name: 'Admin',
            firstLogin: true
          },
          {
            id: 2,
            username: 'trainer',
            email: 'trainer@pulse.com',
            role: 'trainer',
            name: 'Entrenador',
            firstLogin: true
          },
          {
            id: 3,
            username: 'trainee',
            email: 'trainee@pulse.com',
            role: 'trainee',
            name: 'Trainee',
            firstLogin: true
          }
        ]
      } catch (error) {
        this.error = 'Error al cargar los usuarios'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createUser(userData: Omit<User, 'id'>): Promise<User | null> {
      this.loading = true
      try {
        const newUser: User = {
          ...userData,
          id: Date.now(),
        }
        
        this.users.push(newUser)
        return newUser
      } catch (error) {
        this.error = 'Error al crear el usuario'
        console.error(error)
        return null
      } finally {
        this.loading = false
      }
    },

    async updateUser(userId: number, userData: Partial<Omit<User, 'id'>>): Promise<boolean> {
      try {
        const userIndex = this.users.findIndex(u => u.id === userId)
        if (userIndex === -1) return false
        
        this.users[userIndex] = {
          ...this.users[userIndex],
          ...Object.fromEntries(
            Object.entries(userData).filter(([_, v]) => v !== undefined)
          )
        } as User;

        return true
      } catch (error) {
        console.error('Error updating user:', error)
        return false
      }
    },
  },
})