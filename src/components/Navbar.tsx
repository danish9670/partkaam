import { Briefcase, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Briefcase className="text-orange-500" size={24} />
            <span className="text-lg font-medium text-gray-900">
              Part<span className="text-orange-500">Kaam</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors duration-150">
              Browse Jobs
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors duration-150">
              For Employers
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors duration-150">
              How it Works
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-gray-600 hover:text-orange-500 px-4 py-2 transition-colors duration-150 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-150 cursor-pointer"
            >
              Post a Job
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 py-2">
              Browse Jobs
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 py-2">
              For Employers
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 py-2">
              How it Works
            </a>
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-gray-600 hover:text-orange-500 text-left py-2 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md w-fit cursor-pointer"
            >
              Post a Job
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar