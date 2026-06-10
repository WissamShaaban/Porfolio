interface SkeletonProps {
  className?: string
}

function SkeletonBlock({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
  )
}

export function ProjectCardSkeleton() {
  return (
    <article className="flex flex-col lg:flex-row items-center gap-10 py-12">
      <div className="flex-1 flex flex-col gap-4 w-full">
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-3/4" />
        <div className="flex gap-2">
          <SkeletonBlock className="h-6 w-16 rounded-full" />
          <SkeletonBlock className="h-6 w-20 rounded-full" />
        </div>
        <SkeletonBlock className="h-10 w-36 rounded-full" />
      </div>
      <SkeletonBlock className="flex-1 w-full h-72 rounded-2xl" />
    </article>
  )
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-4">
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-5/6" />
      <SkeletonBlock className="h-4 w-2/3" />
      <div className="mt-auto flex flex-col gap-1">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-3 w-16" />
      </div>
    </div>
  )
}

export function AdminRowSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
      <SkeletonBlock className="w-16 h-16 rounded-xl flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="h-3 w-64" />
        <div className="flex gap-1.5">
          <SkeletonBlock className="h-5 w-14 rounded-full" />
          <SkeletonBlock className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonBlock
