import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle, XCircle, ArrowRight, Clock } from 'lucide-react'
import { Worry } from '../types'

interface DecisionTreeProps {
  worry: Worry
  onComplete: (decisions: {
    isHappeningNow: boolean
    concernsMe: boolean
    canTakeAction: boolean
    goodUseOfResources: boolean
  }) => void
  onPostpone: () => void
}

const questions = [
  {
    key: 'isHappeningNow',
    question: 'Is this thing happening now?',
    helper: 'Consider if this is a current situation or a future hypothetical.',
  },
  {
    key: 'concernsMe',
    question: 'Does this worry concern me?',
    helper: 'Reflect if you have direct involvement or control over this situation.',
  },
  {
    key: 'canTakeAction',
    question: 'Can I take action that will directly resolve it?',
    helper: 'Determine if there are concrete steps you can take to address this.',
  },
  {
    key: 'goodUseOfResources',
    question: 'Is it a good use of the limited resources available to me?',
    helper: 'Consider your time, energy, and other resources.',
  },
]

export function DecisionTree({ worry, onComplete, onPostpone }: DecisionTreeProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [decisions, setDecisions] = useState({
    isHappeningNow: false,
    concernsMe: false,
    canTakeAction: false,
    goodUseOfResources: false,
  })

  const handleDecision = (answer: boolean) => {
    const currentQuestion = questions[currentStep]
    const newDecisions = {
      ...decisions,
      [currentQuestion.key]: answer,
    }
    setDecisions(newDecisions)

    if (!answer || currentStep === questions.length - 1) {
      onComplete(newDecisions)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto py-2">
        {questions.map((q, index) => (
          <div
            key={index}
            className={`flex items-center shrink-0 ${
              index > 0 ? 'ml-2' : ''
            }`}
          >
            {index > 0 && (
              <ArrowRight
                size={16}
                className={`mr-2 ${
                  index <= currentStep
                    ? 'text-purple-500'
                    : 'text-gray-300'
                }`}
              />
            )}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === currentStep
                  ? 'bg-purple-100 text-purple-600 border-2 border-purple-500'
                  : index < currentStep
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 border border-purple-100 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {questions[currentStep].question}
            </h3>
            
            <div className="flex items-start gap-2 text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
              <AlertCircle size={20} className="shrink-0 text-purple-500" />
              <p>{questions[currentStep].helper}</p>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="font-medium text-gray-700 mb-4">Your worry:</p>
              <div className="bg-gray-50 p-3 rounded-lg text-gray-600">
                {worry.content}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => handleDecision(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <CheckCircle size={20} />
                Yes
              </button>
              <button
                onClick={() => handleDecision(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <XCircle size={20} />
                No
              </button>
            </div>

            <button
              onClick={onPostpone}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-2 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <Clock size={20} />
              Postpone for Later
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        {Object.entries(decisions).map(([key, value], index) => {
          const question = questions.find((q) => q.key === key)
          if (!question || index > currentStep) return null

          return (
            <div
              key={key}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                value ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {value ? (
                <CheckCircle size={16} className="shrink-0" />
              ) : (
                <XCircle size={16} className="shrink-0" />
              )}
              <span className="text-sm">{question.question}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
