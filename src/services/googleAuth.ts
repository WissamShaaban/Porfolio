import type { User } from '../types'

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string

export function parseGoogleCredential(credential: string): User {
  const payload = JSON.parse(atob(credential.split('.')[1])) as {
    sub: string
    email: string
    name: string
    picture?: string
  }
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    avatar: payload.picture,
  }
}
