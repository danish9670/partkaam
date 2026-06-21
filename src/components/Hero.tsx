import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const cities = ['All of India', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai']

interface HeroProps {
  onSearch: (keyword: string, city: string) => void
}

function Hero({ onSearch }: HeroProps) {
  const [keyword, setKeyword] = useState('')
  const [city, setCity] = useState('All of India')

  // Debounced search — waits 300ms after user stops typing before calling onSearch
  const debouncedSearch = useDebouncedCallback((kw: string, ct: string) => {
    console.log('Debounced search triggered:', { kw, ct })
    onSearch(kw, ct)
  }, 300)

  // Trigger debounced search whenever keyword or city changes
  useEffect(() => {
    debouncedSearch(keyword, city)
  }, [keyword, city])

  return (
    <div className="bg-gradient-to-br from-orange-50 to-green-50 px-4 sm:px-6 lg:px-8 py-9 text-center">
      <h1 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2 max-w-2xl mx-auto">
        Find part-time jobs near you — across India
      </h1>
      <p className="text-sm text-gray-600 mb-5">
        Flexible work for college students. No experience needed for most roles.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 flex-1 px-2">
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Job title, skill, or keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="text-sm text-gray-900 outline-none flex-1 py-2 min-w-0"
          />
        </div>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="text-sm text-gray-600 outline-none px-2 py-2 cursor-pointer border-t sm:border-t-0 sm:border-l border-gray-200"
        >
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={() => onSearch(keyword, city)}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default Hero