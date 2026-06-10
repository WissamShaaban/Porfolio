import { useState } from 'react'
import { z } from 'zod'
import { useApp } from '../../context/ProjectsContext'
import type { Project } from '../../types'

const projectSchema = z.object({
  title: z.string().min(2, 'Titre requis'),
  description: z.string().min(10, 'Description trop courte'),
  fullDescription: z.string().optional(),
  image: z.string().optional(),
  tags: z.string(),
  link: z.string().url('URL invalide').optional().or(z.literal('')),
  imageOnLeft: z.boolean(),
})

type ProjectFormData = z.infer<typeof projectSchema>

const emptyForm: ProjectFormData = {
  title: '',
  description: '',
  fullDescription: '',
  image: '',
  tags: '',
  link: '',
  imageOnLeft: false,
}

export default function AdminProjects() {
  const { state, addProject, updateProject, deleteProject } = useApp()
  const [editing, setEditing] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<ProjectFormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({})
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setErrors({})
    setShowForm(true)
  }

  const openEdit = (project: Project) => {
    setEditing(project)
    setForm({
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription ?? '',
      image: project.image,
      tags: project.tags.join(', '),
      link: project.link ?? '',
      imageOnLeft: project.imageOnLeft,
    })
    setErrors({})
    setShowForm(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
    if (errors[name as keyof ProjectFormData]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSave = () => {
    const result = projectSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ProjectFormData, string>> = {}
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ProjectFormData
        if (!fieldErrors[field]) fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return
    }
    const data = result.data
    const project: Project = {
      id: editing?.id ?? crypto.randomUUID(),
      title: data.title,
      description: data.description,
      fullDescription: data.fullDescription || undefined,
      image: data.image || '',
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      link: data.link || undefined,
      imageOnLeft: data.imageOnLeft,
    }
    editing ? updateProject(project) : addProject(project)
    setShowForm(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projets</h1>
          <p className="text-sm text-gray-400 mt-1">{state.projects.length} projet(s)</p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition-colors"
        >
          + Nouveau projet
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-8 flex flex-col gap-5">
            <h2 className="text-xl font-bold text-gray-900">
              {editing ? 'Modifier le projet' : 'Nouveau projet'}
            </h2>

            {(['title', 'description', 'fullDescription', 'image', 'tags', 'link'] as const).map(field => (
              <div key={field} className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 capitalize">{field}</label>
                {field === 'description' || field === 'fullDescription' ? (
                  <textarea
                    name={field}
                    value={form[field] ?? ''}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 outline-none resize-none transition-colors
                      ${errors[field] ? 'border-red-400' : 'border-gray-200 focus:border-yellow-400'}`}
                  />
                ) : (
                  <input
                    name={field}
                    value={form[field] as string}
                    onChange={handleChange}
                    placeholder={field === 'tags' ? 'Figma, UX, Design (séparés par des virgules)' : ''}
                    className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 outline-none transition-colors
                      ${errors[field] ? 'border-red-400' : 'border-gray-200 focus:border-yellow-400'}`}
                  />
                )}
                {errors[field] && <p className="text-xs text-red-500">{errors[field]}</p>}
              </div>
            ))}

            <label className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="imageOnLeft"
                checked={form.imageOnLeft}
                onChange={handleChange}
                className="w-4 h-4 accent-yellow-400"
              />
              Image à gauche
            </label>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition-colors"
              >
                Sauvegarder
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full flex flex-col gap-5 text-center">
            <p className="text-lg font-semibold text-gray-900">Supprimer ce projet ?</p>
            <p className="text-sm text-gray-500">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button
                onClick={() => { deleteProject(confirmDelete); setConfirmDelete(null) }}
                className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {state.projects.map(project => (
          <div key={project.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            {project.image && (
              <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">{project.title}</p>
              <p className="text-sm text-gray-400 truncate">{project.description}</p>
              {project.tags.length > 0 && (
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => openEdit(project)}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Modifier"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button
                onClick={() => setConfirmDelete(project.id)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                aria-label="Supprimer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {state.projects.length === 0 && (
          <p className="text-center text-gray-400 py-20">Aucun projet. Créez-en un !</p>
        )}
      </div>
    </div>
  )
}
