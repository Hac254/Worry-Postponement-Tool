import { NavLink } from 'react-router-dom'
import { Home, PenLine, Clock, BookOpen, Lightbulb } from 'lucide-react'

export function Navigation() {
  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/log', icon: PenLine, label: 'Log' },
    { to: '/worry-time', icon: Clock, label: 'Worry Time' },
    { to: '/problem-solving', icon: Lightbulb, label: 'Problem Solving' },
    { to: '/learn', icon: BookOpen, label: 'Learn' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 px-2 py-1 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-around">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-purple-600'
                    : 'text-gray-500 hover:text-purple-500'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
