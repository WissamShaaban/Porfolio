import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { AuthState, AuthAction, User } from '../types'

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, isLoading: false }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
  }
}

interface AuthContextType {
  state: AuthState
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (user: User) => dispatch({ type: 'LOGIN', payload: user })
  const logout = () => {
    localStorage.removeItem('auth_user')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
