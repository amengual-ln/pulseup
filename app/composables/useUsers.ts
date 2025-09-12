import { ref } from 'vue'

type UserRole = 'admin' | 'trainee'

interface User {
  id: number
  username: string
  email: string
  role: UserRole
  name: string
}

const users = ref<User[]>([
  {
    id: 1,
    username: 'admin',
    email: 'admin@pulse.com',
    role: 'admin',
    name: 'Admin'
  },
  {
    id: 2,
    username: 'trainee',
    email: 'trainee@pulse.com',
    role: 'trainee',
    name: 'Trainee'
  }
])

const currentUser = ref<User | null>(null)

export const useUsers = () => {
  const login = (username: string, password: string): User | null => {
    // Esto despues iría a una api. por ahora entra con cualquier contraseña
    const user = users.value.find(u => u.username === username)
    
    if (user) {
      currentUser.value = user
      return user
    }
    
    return null
  }

  const logout = (): void => {
    currentUser.value = null
  }

  const isAuthenticated = (): boolean => {
    return currentUser.value !== null
  }

  const hasRole = (role: UserRole): boolean => {
    return currentUser.value?.role === role
  }

  return {
    // State
    currentUser: readonly(currentUser),
    
    // Methods
    login,
    logout,
    isAuthenticated,
    hasRole
  }
}
