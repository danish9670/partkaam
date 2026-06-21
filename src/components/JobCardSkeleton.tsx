function JobCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="space-y-2 flex flex-col items-end">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-10 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="flex gap-1.5 mb-3">
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
        <div className="h-5 w-14 bg-gray-200 rounded-full" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-7 w-20 bg-gray-200 rounded-md" />
      </div>
    </div>
  )
}

export default JobCardSkeleton