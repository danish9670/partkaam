import { useState } from 'react'

const categories = ['Tutoring', 'Data Entry', 'Delivery', 'Sales', 'Design', 'Content']
const hoursOptions = ['Less than 10 hrs', '10–20 hrs', '20–30 hrs']
const payTypes = ['Hourly', 'Per task', 'Monthly stipend']

export interface Filters {
  jobType: { remote: boolean; onsite: boolean; hybrid: boolean }
  categories: string[]
  hours: string[]
  payTypes: string[]
}

interface FilterSidebarProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const toggleJobType = (type: keyof Filters['jobType']) => {
    onChange({ ...filters, jobType: { ...filters.jobType, [type]: !filters.jobType[type] } })
  }

  const toggleArray = (key: 'categories' | 'hours' | 'payTypes', value: string) => {
    const current = filters[key]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ ...filters, [key]: updated })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 h-fit">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Filters</h3>

      {/* Job Type */}
      <div className="mb-5">
        <p className="text-xs text-gray-500 mb-2">Job type</p>
        {[
          { label: 'Remote', key: 'remote' },
          { label: 'On-site', key: 'onsite' },
          { label: 'Hybrid', key: 'hybrid' },
        ].map(({ label, key }) => (
          <label key={key} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.jobType[key as keyof Filters['jobType']]}
              onChange={() => toggleJobType(key as keyof Filters['jobType'])}
              className="accent-orange-500 w-3.5 h-3.5"
            />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      {/* Category */}
      <div className="mb-5">
        <p className="text-xs text-gray-500 mb-2">Category</p>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleArray('categories', cat)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors duration-150 cursor-pointer ${
                filters.categories.includes(cat)
                  ? 'bg-orange-50 border-orange-300 text-orange-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hours per week */}
      <div className="mb-5">
        <p className="text-xs text-gray-500 mb-2">Hours per week</p>
        {hoursOptions.map((h) => (
          <label key={h} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hours.includes(h)}
              onChange={() => toggleArray('hours', h)}
              className="accent-orange-500 w-3.5 h-3.5"
            />
            <span className="text-sm text-gray-700">{h}</span>
          </label>
        ))}
      </div>

      {/* Pay type */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Pay type</p>
        {payTypes.map((p) => (
          <label key={p} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.payTypes.includes(p)}
              onChange={() => toggleArray('payTypes', p)}
              className="accent-orange-500 w-3.5 h-3.5"
            />
            <span className="text-sm text-gray-700">{p}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default FilterSidebar