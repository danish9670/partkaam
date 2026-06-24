import { useEffect, useState } from 'react'
import JobCard, { type Job } from './JobCard'
import JobCardSkeleton from './JobCardSkeleton'
import FilterSidebar, { type Filters } from './FilterSidebar'

const API_URL = 'http://127.0.0.1:8787'

const defaultFilters: Filters = {
  jobType: { remote: false, onsite: false, hybrid: false },
  categories: [],
  hours: [],
  payTypes: [],
}

interface JobListingsProps {
  keyword: string
  city: string
}

interface ApiJob {
  id: string
  title: string
  employer_id: string
  description: string
  category: string
  job_type: 'remote' | 'on-site' | 'hybrid'
  city: string
  pay_amount: number
  pay_type: string
  hours_per_week: number
  status: string
  created_at: string
}

function mapApiJobToJob(apiJob: ApiJob): Job {
  return {
    id: apiJob.id,
    title: apiJob.title,
    company: apiJob.employer_id,
    location: apiJob.city,
    payAmount: apiJob.pay_type === 'hourly'
      ? `₹${apiJob.pay_amount}/hr`
      : apiJob.pay_type === 'monthly'
      ? `₹${apiJob.pay_amount}/mo`
      : `₹${apiJob.pay_amount}`,
    payLabel: apiJob.pay_type,
    jobType: apiJob.job_type === 'remote'
      ? 'Remote'
      : apiJob.job_type === 'on-site'
      ? 'On-site'
      : 'Hybrid',
    tags: [apiJob.category],
    hoursInfo: `${apiJob.hours_per_week} hrs/week`,
    postedInfo: `Posted ${new Date(apiJob.created_at).toLocaleDateString('en-IN')}`,
  }
}

function JobListings({ keyword, city }: JobListingsProps) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const fetchJobs = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (keyword) params.append('keyword', keyword)
      if (city && city !== 'All of India') params.append('city', city)

      const res = await fetch(`${API_URL}/api/jobs?${params.toString()}`)
      const data = await res.json() as { success: boolean; jobs: ApiJob[] }

      if (!data.success) throw new Error('Failed to fetch')

      setJobs(data.jobs.map(mapApiJobToJob))
    } catch {
      setError('Failed to load jobs. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [keyword, city])

  // Client-side job type filter
  const filteredJobs = jobs.filter((job) => {
    const { remote, onsite, hybrid } = filters.jobType
    if (!remote && !onsite && !hybrid) return true
    if (remote && job.jobType === 'Remote') return true
    if (onsite && job.jobType === 'On-site') return true
    if (hybrid && job.jobType === 'Hybrid') return true
    return false
  })

  const handleApply = (jobId: string) => {
    console.log('Applying to job:', jobId)
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <p className="text-sm text-red-700 mb-3">{error}</p>
        <button
          onClick={fetchJobs}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md cursor-pointer"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">
        <div className="hidden md:block">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>
        <div>
          <h2 className="text-base font-medium text-gray-900 mb-4">
            {isLoading
              ? 'Loading jobs...'
              : filteredJobs.length === 0
              ? 'No jobs found'
              : `${filteredJobs.length} job${filteredJobs.length > 1 ? 's' : ''} found`}
          </h2>
          <div className="flex flex-col gap-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <JobCardSkeleton key={i} />)
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-gray-500">No jobs match your search.</p>
                <p className="text-xs text-gray-400 mt-1">Try a different keyword or city.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={handleApply} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobListings