import { useState, useEffect, useRef } from 'react'
import { Send, Lock, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  isOwn: boolean
}

// Mock messages — will be replaced by Cloudflare Workers API later
const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'employer1',
    senderName: 'GrowthHive Agency',
    content: 'Hi! We reviewed your profile and are interested in your application for the Content Writer role.',
    timestamp: '10:30 AM',
    isOwn: false,
  },
  {
    id: '2',
    senderId: 'student1',
    senderName: 'Rahul Sharma',
    content: 'Thank you! I am very interested. When can we schedule a quick call?',
    timestamp: '10:32 AM',
    isOwn: true,
  },
  {
    id: '3',
    senderId: 'employer1',
    senderName: 'GrowthHive Agency',
    content: 'How about tomorrow at 3 PM? We can do a 15 minute intro call.',
    timestamp: '10:35 AM',
    isOwn: false,
  },
]

function ChatPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading messages from API
    setTimeout(() => {
      setMessages(mockMessages)
      setIsLoading(false)
    }, 600)
  }, [])

  useEffect(() => {
    // Auto scroll to bottom when new message arrives
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'student1',
      senderName: 'Rahul Sharma',
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage('')
    // TODO: send to Cloudflare Workers API with encryption
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-sm font-medium text-orange-600 flex-shrink-0">
          G
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">GrowthHive Agency</p>
          <p className="text-xs text-gray-500">Content Writer — Social Media</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <Lock size={11} />
          <span>Private</span>
        </div>
      </div>

      {/* Encryption Notice */}
      <div className="text-center py-2 px-4">
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
          <Lock size={10} />
          Messages are private and visible only to you and the employer
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 max-w-2xl w-full mx-auto">
        {isLoading ? (
          // Skeleton loading for messages
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className="h-10 w-48 bg-gray-200 rounded-2xl animate-pulse" />
            </div>
          ))
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.isOwn
                  ? 'bg-orange-500 text-white rounded-br-sm'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
              }`}>
                <p>{msg.content}</p>
                <p className={`text-[10px] mt-1 ${msg.isOwn ? 'text-orange-100' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 sticky bottom-0">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors duration-150"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 text-white p-2.5 rounded-xl transition-colors duration-150 cursor-pointer"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage