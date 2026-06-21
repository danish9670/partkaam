import { useState } from 'react'
import { Briefcase, Eye, EyeOff } from 'lucide-react'

type Role = 'student' | 'employer'
type Mode = 'login' | 'register'

function LoginPage() {
  const [role, setRole] = useState<Role>('student')
  const [mode, setMode] = useState<Mode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    companyName: '',
    city: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError(null)
  }

  const validate = () => {
    if (!form.email.includes('@')) return 'Please enter a valid email'
    if (form.password.length < 8) return 'Password must be at least 8 characters'
    if (mode === 'register' && !form.name.trim()) return 'Please enter your name'
    if (mode === 'register' && role === 'student' && !form.college.trim()) return 'Please enter your college name'
    if (mode === 'register' && role === 'employer' && !form.companyName.trim()) return 'Please enter your company name'
    return null
  }

  const handleSubmit = () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError(null)

    // TODO: connect to Cloudflare Workers auth API
    setTimeout(() => {
      setIsLoading(false)
      console.log('Form submitted:', { role, mode, form })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Briefcase className="text-orange-500" size={22} />
          <span className="text-lg font-medium text-gray-900">
            Part<span className="text-orange-500">Kaam</span>
          </span>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
          {(['student', 'employer'] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 text-sm py-2 rounded-md transition-colors duration-150 cursor-pointer capitalize ${
                role === r
                  ? 'bg-white text-gray-900 font-medium shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {r === 'student' ? 'I am a Student' : 'I am an Employer'}
            </button>
          ))}
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-5 border-b border-gray-100 pb-4">
          {(['login', 'register'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(null) }}
              className={`text-sm pb-1 cursor-pointer capitalize transition-colors duration-150 ${
                mode === m
                  ? 'text-orange-500 border-b-2 border-orange-500 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {m === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-3">

          {/* Name — only on register */}
          {mode === 'register' && (
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Rahul Sharma"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors duration-150"
              />
            </div>
          )}

          {/* College — student register only */}
          {mode === 'register' && role === 'student' && (
            <div>
              <label className="text-xs text-gray-500 mb-1 block">College Name</label>
              <input
                name="college"
                type="text"
                value={form.college}
                onChange={handleChange}
                placeholder="Delhi University"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors duration-150"
              />
            </div>
          )}

          {/* Company — employer register only */}
          {mode === 'register' && role === 'employer' && (
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Company Name</label>
              <input
                name="companyName"
                type="text"
                value={form.companyName}
                onChange={handleChange}
                placeholder="GrowthHive Agency"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors duration-150"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="rahul@email.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors duration-150"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors duration-150 pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white text-sm font-medium py-2.5 rounded-lg transition-colors duration-150 cursor-pointer mt-1"
          >
            {isLoading
              ? 'Please wait...'
              : mode === 'login'
              ? `Login as ${role}`
              : `Register as ${role}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage 