export type UserRole = 'admin' | 'trainer' | 'trainee'

export interface User {
  id: number
  username: string
  email: string
  role: UserRole
  name: string
}

export interface AuthState {
  currentUser: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}