import { useApp } from '../context/ProjectsContext'

export default function SectionTestimonials() {
  const { state } = useApp()
  const visible = state.testimonials.filter(t => t.visible)

  if (visible.length === 0) return null

  return (
    <section className="px-10 lg:px-20 py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-900 mb-2">Testimonials</h2>
      <div className="w-16 h-1 bg-yellow-400 mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map(t => (
          <blockquote key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <p className="text-gray-600 leading-relaxed italic">"{t.content}"</p>
            <footer className="mt-auto">
              <p className="font-semibold text-gray-900">{t.author}</p>
              <p className="text-sm text-gray-400">{t.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
