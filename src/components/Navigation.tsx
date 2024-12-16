import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, PenLine, Clock, BookOpen, Brain, Menu, X } from 'lucide-react'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-pink-100 text-orange-700'
        : 'text-gray-600 hover:bg-pink-50'
    }`

  return (
    <nav className="bg-white shadow-sm border-b border-Pink-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="text-pink-500" size={24} />
            <span className="font-bold text-gray-800">PauseWorry</span>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={linkClass}>
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/log" className={linkClass}>
              <PenLine size={20} />
              <span>Log</span>
            </NavLink>
            <NavLink to="/worry-time" className={linkClass}>
              <Clock size={20} />
              <span>Worry Time</span>
            </NavLink>
            <NavLink to="/learn" className={linkClass}>
              <BookOpen size={20} />
              <span>Learn</span>
            </NavLink>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2 border-t border-purple-100">
            <div className="flex flex-col gap-1">
              <NavLink 
                to="/" 
                className={linkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={20} />
                <span>Home</span>
              </NavLink>
              <NavLink 
                to="/log" 
                className={linkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <PenLine size={20} />
                <span>Log</span>
              </NavLink>
              <NavLink 
                to="/worry-time" 
                className={linkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <Clock size={20} />
                <span>Worry Time</span>
              </NavLink>
              <NavLink 
                to="/learn" 
                className={linkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen size={20} />
                <span>Learn</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
