import ProjectCard from './ProjectCard'
import { useApp } from '../context/ProjectsContext'

export default function SectionProjects() {
  const { state } = useApp()

  return (
    <section className="px-10 lg:px-20 py-20" id="projets">
      <h2 className="text-4xl font-bold text-gray-900 mb-2">Projects</h2>
      <div className="w-16 h-1 bg-yellow-400 mb-12" />
      <div className="flex flex-col divide-y divide-gray-100">
        {state.projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
