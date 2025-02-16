import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Lightbulb, ArrowRight, XCircle } from 'lucide-react'
import { Worry } from '../types'

interface PastReflectionsProps {
  worries: Worry[]
}

export function PastReflections({ worries }: PastReflectionsProps) {
  // Filter out completed worries with reflections
  const dealtWithWorries = worries
    .filter(w => w.status === 'completed' && w.isDealtWith && w.reflection)
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

  const categorizeWorry = (worry: Worry) => {
    if (!worry.reflection?.decisionTree) return null;

    const { isHappeningNow, concernsMe, canTakeAction, goodUseOfResources } = worry.reflection.decisionTree;

    if (isHappeningNow && concernsMe && canTakeAction && goodUseOfResources) {
      return {
        category: 'Action Required',
        description: 'Needs immediate attention',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-100',
        icon: CheckCircle,
      };
    } else if (isHappeningNow && concernsMe) {
      return {
        category: 'Monitor',
        description: 'Keep an eye on this',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-100',
        icon: AlertCircle,
      };
    } else if (!isHappeningNow && concernsMe) {
      return {
        category: 'Future Consideration',
        description: 'Review later',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        icon: ArrowRight,
      };
    } else {
      return {
        category: 'Let Go',
        description: 'No action needed',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-100',
        icon: XCircle,
      };
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Past Reflections</h2>
        <span className="text-sm text-purple-600">
          {dealtWithWorries.length} completed
        </span>
      </div>

      {dealtWithWorries.length > 0 ? (
        <div className="space-y-6">
          {dealtWithWorries.map((worry, index) => {
            const category = categorizeWorry(worry);
            if (!category) return null;
            
            const Icon = category.icon;

            return (
              <motion.div
                key={worry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative pl-6 border-l-2 ${category.borderColor}`}
              >
                <div className="absolute -left-[11px] top-0 bg-white p-1">
                  <Icon size={20} className={category.color} />
                </div>
                
                <div className={`${category.bgColor} rounded-lg p-4`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <p className="text-gray-700 mb-2">{worry.content}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${category.color}`}>
                          {category.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          - {category.description}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {formatDistanceToNow(new Date(worry.createdAt))} ago
                    </span>
                  </div>

                  {worry.reflection?.insights && (
                    <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-gray-100 mt-3">
                      <Lightbulb size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-600">
                        {worry.reflection.insights}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    {worry.reflection?.decisionTree && 
                      Object.entries(worry.reflection.decisionTree).map(([key, value]) => (
                        <div
                          key={key}
                          className={`p-2 rounded-lg flex items-center gap-2 
                            ${value ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}
                        >
                          {value ? <CheckCircle size={14} /> : <XCircle size={14} />}
                          <span>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No past reflections yet.</p>
          <p className="text-sm mt-2">Complete some worry reflections and they'll appear here.</p>
        </div>
      )}
    </div>
  );
}
