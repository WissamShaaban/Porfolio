export interface Project {
  id: string
  title: string
  description: string
  fullDescription?: string
  image: string
  tags: string[]
  link?: string
  imageOnLeft: boolean
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
  read: boolean
}

export interface Testimonial {
  id: string
  author: string
  role: string
  content: string
  visible: boolean
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

export type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
