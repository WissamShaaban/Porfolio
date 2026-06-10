import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { Project, ContactMessage, Testimonial } from '../types'

interface AppState {
  projects: Project[]
  contacts: ContactMessage[]
  testimonials: Testimonial[]
}

type AppAction =
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_CONTACT'; payload: ContactMessage }
  | { type: 'MARK_CONTACT_READ'; payload: string }
  | { type: 'TOGGLE_TESTIMONIAL'; payload: string }

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project Name',
    description: 'I created this personal project in order to show how to create an interface in Figma using a portfolio as an example.',
    fullDescription: 'A complete UX/UI design project built with Figma, showcasing user research, wireframing, and high-fidelity prototyping. The project demonstrates end-to-end product design thinking.',
    image: '/src/assets/images/projet-1.jpg',
    tags: ['Figma', 'UX Research', 'Prototyping'],
    imageOnLeft: false,
  },
  {
    id: '2',
    title: 'Project Name',
    description: 'What was your role, your deliverables. If the project was personal, freelancing.',
    fullDescription: 'A freelance web design project delivering a complete brand identity and web presence. Includes responsive design, design system, and component library.',
    image: '/src/assets/images/projet-2.jpg',
    tags: ['Web Design', 'Branding', 'Responsive'],
    imageOnLeft: true,
  },
  {
    id: '3',
    title: 'Project Name',
    description: 'You can also add in this description the type of the project, if it was for web, mobile, electron.',
    fullDescription: 'A mobile-first design project targeting iOS and Android platforms. Features include onboarding flows, dashboard design, and complex data visualization.',
    image: '/src/assets/images/projet-3.jpg',
    tags: ['Mobile', 'iOS', 'Android'],
    imageOnLeft: false,
  },
]

const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Sophie Martin',
    role: 'Product Manager',
    content: 'Excellent travail, design soigné et livraison dans les délais. Je recommande vivement.',
    visible: true,
  },
  {
    id: '2',
    author: 'Thomas Dupont',
    role: 'CEO, StartupX',
    content: 'Notre identité visuelle a été transformée. Un vrai professionnel avec un sens du détail remarquable.',
    visible: true,
  },
  {
    id: '3',
    author: 'Léa Bernard',
    role: 'Développeuse Front-end',
    content: 'Les maquettes étaient si bien documentées que l\'intégration a été un plaisir. Merci !',
    visible: false,
  },
]

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p => p.id === action.payload.id ? action.payload : p),
      }
    case 'DELETE_PROJECT':
      return { ...state, projects: state.projects.filter(p => p.id !== action.payload) }
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] }
    case 'MARK_CONTACT_READ':
      return {
        ...state,
        contacts: state.contacts.map(c => c.id === action.payload ? { ...c, read: true } : c),
      }
    case 'TOGGLE_TESTIMONIAL':
      return {
        ...state,
        testimonials: state.testimonials.map(t =>
          t.id === action.payload ? { ...t, visible: !t.visible } : t
        ),
      }
  }
}

interface AppContextType {
  state: AppState
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  deleteProject: (id: string) => void
  addContact: (contact: ContactMessage) => void
  markContactRead: (id: string) => void
  toggleTestimonial: (id: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    projects: initialProjects,
    contacts: [],
    testimonials: initialTestimonials,
  })

  return (
    <AppContext.Provider value={{
      state,
      addProject: (p) => dispatch({ type: 'ADD_PROJECT', payload: p }),
      updateProject: (p) => dispatch({ type: 'UPDATE_PROJECT', payload: p }),
      deleteProject: (id) => dispatch({ type: 'DELETE_PROJECT', payload: id }),
      addContact: (c) => dispatch({ type: 'ADD_CONTACT', payload: c }),
      markContactRead: (id) => dispatch({ type: 'MARK_CONTACT_READ', payload: id }),
      toggleTestimonial: (id) => dispatch({ type: 'TOGGLE_TESTIMONIAL', payload: id }),
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
