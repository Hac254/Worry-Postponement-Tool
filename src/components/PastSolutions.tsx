import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Lightbulb } from 'lucide-react'
import { ProblemSolution } from '../types'

interface PastSolutionsProps {
  solutions: ProblemSolution[]
}

export function PastSolutions({ solutions }: PastSolutionsProps) {
  const completedSolutions = solutions
    .filter(s => s.status === 'completed')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Past Solutions</h2>
      
      {completedSolutions.length > 0 ? (
        <div className="space-y-8">
          {completedSolutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-6 border-l-2 border-green-100"
            >
              <div className="absolute -left-[11px] top-0 bg-white p-1">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Original Worry</h3>
                    <p className="text-gray-700">{solution.worry}</p>
                  </div>
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    {solution.completedAt && formatDistanceToNow(new Date(solution.completedAt))} ago
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-3 rounded border border-green-100">
                    <h4 className="font-medium text-gray-700 mb-2">Practical Problem</h4>
                    <p className="text-gray-600">{solution.practicalProblem}</p>
                  </div>

                  <div className="bg-white p-3 rounded border border-green-100">
                    <h4 className="font-medium text-gray-700 mb-2">Chosen Solution</h4>
                    <p className="text-gray-600">{solution.chosenSolution}</p>
                  </div>
                </div>

                <div className="mt-4 bg-white p-3 rounded border border-green-100">
                  <div className="flex items-start gap-2">
                    <Lightbulb size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Review & Outcomes</h4>
                      <p className="text-sm text-gray-600">{solution.review}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-green-600">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Clock size={24} className="mx-auto mb-2" />
          <p>No completed solutions yet</p>
          <p className="text-sm mt-2">
            As you solve problems, they'll appear here for future reference
          </p>
        </div>
      )}
    </div>
  )
}
