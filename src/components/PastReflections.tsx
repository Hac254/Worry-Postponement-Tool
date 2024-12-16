import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Lightbulb } from 'lucide-react'
import { Worry } from '../types'

interface PastReflectionsProps {
  worries: Worry[]
}

export function PastReflections({ worries }: PastReflectionsProps) {
  const dealtWithWorries = worries
    .filter(w => w.isDealtWith && w.reflection)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Past Reflections</h2>
      {dealtWithWorries.length > 0 ? (
        <div className="space-y-8">
          {dealtWithWorries.map((worry, index) => (
            <motion.div
              key={worry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-6 border-l-2 border-purple-100"
            >
              <div className="absolute -left-[11px] top-0 bg-white p-1">
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-gray-700">{worry.content}</p>
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    {formatDistanceToNow(new Date(worry.createdAt))} ago
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    {worry.reflection?.isSolvable ? (
                      <>
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-green-600">This was a solvable worry</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} className="text-orange-500" />
                        <span className="text-orange-600">This was an unsolvable worry</span>
                      </>
                    )}
                  </div>

                  {worry.reflection?.insights && (
                    <div className="flex items-start gap-2 bg-white p-3 rounded border border-gray-100">
                      <Lightbulb size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-600">
                        {worry.reflection.insights}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No past reflections yet.</p>
          <p className="text-sm mt-2">Complete some worry reflections and they'll appear here.</p>
        </div>
      )}
    </div>
  )
}
