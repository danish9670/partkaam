import { useEffect, useState } from 'react'
import JobCard, { type Job } from './JobCard'
import JobCardSkeleton from './JobCardSkeleton'
import FilterSidebar, { type Filters } from './FilterSidebar'

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Online Maths Tutor',
    company: 'BrightMinds EdTech',
    location: 'Bangalore',
    payAmount: '₹300/hr',
    payLabel: 'Hourly',
    jobType: 'Remote',
    tags: ['Class 9–12', 'Weekend ok'],
    hoursInfo: '8–12 hrs/week',
    postedInfo: 'Posted 2 days ago',
    isNew: true,
  },
  {
    id: '2',
    title: 'Content Writer — Social Media',
    company: 'GrowthHive Agency',
    location: 'Mumbai',
    payAmount: '₹8,000/mo',
    payLabel: 'Stipend',
    jobType: 'Remote',
    tags: ['Internship', 'Instagram · LinkedIn'],
    hoursInfo: '15 hrs/week',
    postedInfo: 'Posted today',
  },
  {
    id: '3',
    title: 'Food Delivery Partner',
    company: 'QuickBite',
    location: 'Delhi NCR',
    payAmount: '₹180/hr',
    payLabel: '+ tips',
    jobType: 'On-site',
    tags: ['2-wheeler needed'],
    hoursInfo: 'Choose your shifts',
    postedInfo: 'Posted today',
    isNew: true,
  },
  {
    id: '4',
    title: 'Data Entry Operator',
    company: 'InfoTech Solutions',
    location: 'Hyderabad',
    payAmount: '₹150/hr',
    payLabel: 'Hourly',
    jobType: 'Remote',
    tags: ['MS Excel', 'Typing speed 40wpm'],
    hoursInfo: '10–15 hrs/week',
    postedInfo: 'Posted 3 days ago',
  },
  {
    id: '5',
    title: 'Graphic Design Intern',
    company: 'CreativeBox Studio',
    location: 'Pune',
    payAmount: '₹6,000/mo',
    payLabel: 'Stipend',
    jobType: 'Hybrid',
    tags: ['Canva', 'Figma', 'Internship'],
    hoursInfo: '20 hrs/week',
    postedInfo: 'Posted 1 day ago',
    isNew: true,
  },
]

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

function JobListings({ keyword, city }: JobListingsProps) {
  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const loadJobs = () => {
    setIsLoading(true)
    setError(null)
    setTimeout(() => {
      try {
        setAllJobs(mockJobs)
        setFilteredJobs(mockJobs)
        setIsLoading(false)
      } catch {
        setError('Failed to load jobs. Please try again.')
        setIsLoading(false)
      }
    }, 800)
  }

  useEffect(() => {
    loadJobs()
  }, [])

  // Filter jobs whenever keyword, city or filters change
  useEffect(() => {
    let result = allJobs

    // Keyword filter
    if (keyword.trim()) {
      const kw = keyword.toLowerCase()
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(kw) ||
          job.company.toLowerCase().includes(kw) ||
          job.tags.some((t) => t.toLowerCase().includes(kw))
      )
    }

    // City filter
    if (city && city !== 'All of India') {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(city.toLowerCase())
      )
    }

    // Job type filter
    const { remote, onsite, hybrid } = filters.jobType
    if (remote || onsite || hybrid) {
      result = result.filter((job) => {
        if (remote && job.jobType === 'Remote') return true
        if (onsite && job.jobType === 'On-site') return true
        if (hybrid && job.jobType === 'Hybrid') return true
        return false
      })
    }

    setFilteredJobs(result)
  }, [keyword, city, filters, allJobs])

  const handleApply = (jobId: string) => {
    console.log('Applying to job:', jobId)
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <p className="text-sm text-red-700 mb-3">{error}</p>
        <button
          onClick={loadJobs}
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

        {/* Filters Sidebar */}
        <div className="hidden md:block">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        {/* Job Cards */}
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