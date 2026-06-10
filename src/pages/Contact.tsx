import { useForm } from '../hooks/useForm'
import { z } from 'zod'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useApp } from '../context/ProjectsContext'
import type { ContactMessage } from '../types'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
  const { addContact } = useApp()
  const { values, errors, handleChange, handleSubmit, isSubmitting, isSuccess, reset } =
    useForm<ContactFormData>(
      { name: '', email: '', message: '' },
      contactSchema,
      async (data) => {
        const message: ContactMessage = {
          id: crypto.randomUUID(),
          name: data.name,
          email: data.email,
          message: data.message,
          createdAt: new Date().toISOString(),
          read: false,
        }
        addContact(message)
        await new Promise(r => setTimeout(r, 500))
      }
    )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-10 py-20">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact</h1>
          <div className="w-16 h-1 bg-yellow-400 mb-10" />

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center flex flex-col gap-4">
              <p className="text-2xl font-bold text-green-800">Message envoyé !</p>
              <p className="text-green-600">Merci de m'avoir contacté, je vous répondrai rapidement.</p>
              <button
                onClick={reset}
                className="self-center px-6 py-2.5 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Nom</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 outline-none transition-colors
                    ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-yellow-400'}`}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 outline-none transition-colors
                    ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-yellow-400'}`}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  rows={6}
                  className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 outline-none transition-colors resize-none
                    ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-yellow-400'}`}
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="self-start px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer'}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
