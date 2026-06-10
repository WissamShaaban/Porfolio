import { useState } from 'react'
import { useApp } from '../../context/ProjectsContext'
import type { ContactMessage } from '../../types'

export default function AdminContacts() {
  const { state, markContactRead } = useApp()
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  const handleSelect = (contact: ContactMessage) => {
    setSelected(contact)
    if (!contact.read) markContactRead(contact.id)
  }

  const unread = state.contacts.filter(c => !c.read).length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-sm text-gray-400 mt-1">
          {state.contacts.length} message(s) · {unread} non lu(s)
        </p>
      </div>

      {state.contacts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-gray-400">Aucun message pour l'instant.</p>
          <p className="text-sm text-gray-300 mt-1">Les messages du formulaire de contact apparaîtront ici.</p>
        </div>
      ) : (
        <div className="flex gap-6">
          <div className="w-72 flex-shrink-0 flex flex-col gap-2">
            {state.contacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => handleSelect(contact)}
                className={`w-full text-left p-4 rounded-2xl border transition-colors
                  ${selected?.id === contact.id
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
              >
                <div className="flex items-center gap-2">
                  {!contact.read && (
                    <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                  )}
                  <p className={`text-sm truncate ${contact.read ? 'font-normal text-gray-700' : 'font-semibold text-gray-900'}`}>
                    {contact.name}
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{contact.email}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{contact.message}</p>
                <p className="text-xs text-gray-300 mt-1">
                  {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit', month: 'short', year: 'numeric',
                  })}
                </p>
              </button>
            ))}
          </div>

          <div className="flex-1">
            {selected ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
                    <a href={`mailto:${selected.email}`} className="text-sm text-yellow-600 hover:underline">
                      {selected.email}
                    </a>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(selected.createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit', month: 'long', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="w-full h-px bg-gray-100 mb-6" />
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                <div className="mt-8">
                  <a
                    href={`mailto:${selected.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition-colors"
                  >
                    Répondre par email
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400 bg-white rounded-2xl border border-gray-100">
                Sélectionnez un message pour le lire
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
