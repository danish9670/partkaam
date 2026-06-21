import { Clock, Calendar, MapPin } from 'lucide-react'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  payAmount: string
  payLabel: string
  jobType: 'Remote' | 'On-site' | 'Hybrid'
  tags: string[]
  hoursInfo: string
  postedInfo: string
  isNew?: boolean
}

interface JobCardProps {
  job: Job
  onApply: (jobId: string) => void
}

const jobTypeStyles: Record<string, string> = {
  Remote: 'bg-orange-50 text-orange-700',
  'On-site': 'bg-amber-50 text-amber-700',
  Hybrid: 'bg-green-50 text-green-700',
}

function JobCard({ job, onApply }: JobCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors duration-150">
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-gray-500">
              {job.company.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-[15px] font-medium text-gray-900">
              {job.title}
              {job.isNew && (
                <span className="ml-2 text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">
                  New
                </span>
              )}
            </h3>
            <p className="text-[13px] text-gray-500">{job.company} · {job.location}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-[15px] font-medium text-green-700">{job.payAmount}</div>
          <div className="text-[11px] text-gray-500">{job.payLabel}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-2.5">
        <span className={`text-[11px] px-2 py-0.5 rounded-full ${jobTypeStyles[job.jobType]}`}>
          {job.jobType}
        </span>
        {job.tags.map((tag) => (
          <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={13} /> {job.hoursInfo}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={13} /> {job.postedInfo}
          </span>
        </div>
        <button
          onClick={() => onApply(job.id)}
          className="border border-orange-500 text-orange-500 hover:bg-orange-50 text-[13px] px-3.5 py-1.5 rounded-md transition-colors duration-150 cursor-pointer"
        >
          Apply now
        </button>
      </div>
    </div>
  )
}

export default JobCard