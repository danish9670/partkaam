import { useState, useEffect } from 'react'
import { ArrowLeft, CheckCircle, Clock, AlertCircle, IndianRupee } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type PaymentStatus = 'paid' | 'pending' | 'overdue'

interface SalaryRecord {
  id: string
  month: string
  amount: number
  status: PaymentStatus
  dueDate: string
  paidDate?: string
  jobTitle: string
  company: string
}

const mockSalaryHistory: SalaryRecord[] = [
  {
    id: '1',
    month: 'June 2025',
    amount: 8000,
    status: 'pending',
    dueDate: '30 Jun 2025',
    jobTitle: 'Content Writer — Social Media',
    company: 'GrowthHive Agency',
  },
  {
    id: '2',
    month: 'May 2025',
    amount: 8000,
    status: 'paid',
    dueDate: '31 May 2025',
    paidDate: '29 May 2025',
    jobTitle: 'Content Writer — Social Media',
    company: 'GrowthHive Agency',
  },
  {
    id: '3',
    month: 'April 2025',
    amount: 8000,
    status: 'paid',
    dueDate: '30 Apr 2025',
    paidDate: '28 Apr 2025',
    jobTitle: 'Content Writer — Social Media',
    company: 'GrowthHive Agency',
  },
  {
    id: '4',
    month: 'March 2025',
    amount: 6000,
    status: 'overdue',
    dueDate: '31 Mar 2025',
    jobTitle: 'Content Writer — Social Media',
    company: 'GrowthHive Agency',
  },
]

const statusConfig = {
  paid: {
    label: 'Paid',
    icon: CheckCircle,
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-100',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-100',
  },
  overdue: {
    label: 'Overdue',
    icon: AlertCircle,
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-100',
  },
}

function SalaryPage() {
  const navigate = useNavigate()
  const [records, setRecords] = useState<SalaryRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setRecords(mockSalaryHistory)
      setIsLoading(false)
    }, 700)
  }, [])

  const totalPaid = records
    .filter((r) => r.status === 'paid')
    .reduce((sum, r) => sum + r.amount, 0)

  const totalPending = records
    .filter((r) => r.status === 'pending' || r.status === 'overdue')
    .reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="text-sm font-medium text-gray-900">Salary Tracker</p>
          <p className="text-xs text-gray-500">Only visible to you and your employer</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5">

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Total Received</p>
            <div className="flex items-center gap-1">
              <IndianRupee size={16} className="text-green-700" />
              <span className="text-xl font-medium text-green-700">
                {isLoading ? '—' : totalPaid.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Pending / Overdue</p>
            <div className="flex items-center gap-1">
              <IndianRupee size={16} className="text-amber-700" />
              <span className="text-xl font-medium text-amber-700">
                {isLoading ? '—' : totalPending.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Salary History */}
        <h2 className="text-sm font-medium text-gray-900 mb-3">Payment History</h2>

        <div className="flex flex-col gap-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-32 bg-gray-200 rounded" />
                  </div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                </div>
                <div className="mt-3 flex justify-between">
                  <div className="h-3 w-28 bg-gray-200 rounded" />
                  <div className="h-5 w-20 bg-gray-200 rounded" />
                </div>
              </div>
            ))
          ) : (
            records.map((record) => {
              const config = statusConfig[record.status]
              const Icon = config.icon
              return (
                <div
                  key={record.id}
                  className="bg-white border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{record.month}</p>
                      <p className="text-xs text-gray-500">{record.company}</p>
                    </div>
                    <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${config.bg} ${config.text} ${config.border}`}>
                      <Icon size={11} />
                      {config.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {record.status === 'paid'
                        ? `Paid on ${record.paidDate}`
                        : `Due: ${record.dueDate}`}
                    </div>
                    <div className="flex items-center gap-0.5 text-base font-medium text-gray-900">
                      <IndianRupee size={14} />
                      {record.amount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Employer action — mark as paid */}
                  {record.status === 'pending' && (
                    <button
                      onClick={() => {
                        setRecords((prev) =>
                          prev.map((r) =>
                            r.id === record.id
                              ? { ...r, status: 'paid', paidDate: 'Today' }
                              : r
                          )
                        )
                      }}
                      className="mt-3 w-full text-xs border border-orange-300 text-orange-600 hover:bg-orange-50 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
                    >
                      Mark as Paid
                    </button>
                  )}

                  {record.status === 'overdue' && (
                    <div className="mt-2 text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">
                      Payment overdue — please contact your employer
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default SalaryPage