import { Link } from 'react-router-dom'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={`flex flex-col lg:flex-row items-center gap-10 py-12 ${project.imageOnLeft ? 'lg:flex-row-reverse' : ''}`}>
      <div className="flex-1 flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
        <p className="text-gray-500 leading-relaxed">{project.description}</p>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          to={`/projects/${project.id}`}
          className="self-start px-6 py-2.5 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-colors mt-2"
        >
          View Project
        </Link>
      </div>
      <div className="flex-1 w-full">
        {project.image
          ? <img src={project.image} alt={project.title} className="w-full h-72 object-cover rounded-2xl shadow-sm" />
          : <div className="w-full h-72 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">Image</div>
        }
      </div>
    </article>
  )
}
