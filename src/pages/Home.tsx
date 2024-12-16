import { Brain } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="text-pink-500" size={40} />
          <h1 className="text-4xl font-bold text-gray-800">Welcome to PauseWorry</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-xl mx-auto">
          A mindful approach to managing your worries through scheduled reflection
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
        <Link
          to="/log"
          className="bg-white p-6 rounded-lg shadow-sm border border-purple-100 hover:border-purple-200 transition-colors"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Log Worries</h2>
          <p className="text-gray-600">Capture your thoughts and postpone them for later</p>
        </Link>

        <Link
          to="/worry-time"
          className="bg-white p-6 rounded-lg shadow-sm border border-purple-100 hover:border-purple-200 transition-colors"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Worry Time</h2>
          <p className="text-gray-600">Process and reflect on your concerns mindfully</p>
        </Link>

        <Link
          to="/learn"
          className="bg-white p-6 rounded-lg shadow-sm border border-purple-100 hover:border-purple-200 transition-colors"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Learn More</h2>
          <p className="text-gray-600">Understand the science behind worry postponement</p>
        </Link>
      </div>
    </div>
  )
}
