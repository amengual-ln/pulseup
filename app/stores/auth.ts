import type { User } from '~/types/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null as User | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isAdmin: (state) => state.currentUser?.role === 'admin',
    currentUserName: (state) => state.currentUser?.name || '',
  },

  actions: {
    async login(username: string, password: string): Promise<boolean> {
      this.loading = true
      this.error = null
      
      try {
        const usersStore = useUsersStore()
        await usersStore.fetchUsers()
        
        const user = usersStore.users.find(u => u.username === username)
        
        if (user) {
          this.currentUser = user
          this.isAuthenticated = true
          return true
        }
        
        throw new Error('Usuario o contraseña incorrectos')
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error al iniciar sesión'
        return false
      } finally {
        this.loading = false
      }
    },

    logout(): void {
      this.currentUser = null
      this.isAuthenticated = false
      // Redirigir al login
      const router = useRouter()
      router.push('/login')
    },
  },
})