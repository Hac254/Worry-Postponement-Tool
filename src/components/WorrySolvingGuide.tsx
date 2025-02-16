import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

interface Step {
  title: string;
  description: string;
  action?: string;
}

const STEPS: Step[] = [
  {
    title: "Step 1: Identify the worry",
    description: "Choose one practical worry you would like to focus on solving. Pick something that has a potential practical solution and feels manageable.",
    action: "Write down your chosen worry:"
  },
  {
    title: "Step 2: Convert to practical problem",
    description: "Convert your worry into a specific, actionable problem that can be solved. For example, instead of 'I haven't paid the gas bill', write 'I need to sort the overdue gas bill by Thursday'.",
    action: "Rewrite your worry as a practical problem:"
  },
  {
    title: "Step 3: Identify solutions",
    description: "List as many potential solutions as you can think of. Don't reject any ideas at this stage - even seemingly ridiculous solutions can lead to practical ones.",
    action: "List your potential solutions (one per line):"
  },
  {
    title: "Step 4: Analyze solutions",
    description: "Consider the strengths and weaknesses of each solution. Think about resources needed, feasibility, and how you feel about each option.",
    action: "For each solution, list pros and cons:"
  },
  {
    title: "Step 5: Select a solution",
    description: "Based on your analysis, choose the most practical and feasible solution to implement.",
    action: "Write down your chosen solution:"
  },
  {
    title: "Step 6: Develop a plan",
    description: "Create a detailed plan using the 'Four Ws': what, where, when, and with whom. Make your steps specific and realistic.",
    action: "Detail your action plan:"
  },
  {
    title: "Step 7: Put plan into action",
    description: "Execute your plan and keep track of what you did and how it went.",
    action: "Record your progress and any challenges:"
  },
  {
    title: "Step 8: Review your plan",
    description: "Evaluate how well your solution worked. Consider if you need to try a different solution or if this approach can help with other worries.",
    action: "Write your review and reflections:"
  }
]

export function WorrySolvingGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const handleResponse = (step: number, value: string) => {
    setResponses(prev => ({ ...prev, [step]: value }))
  }

  const markStepComplete = (step: number) => {
    setCompletedSteps(prev => new Set([...prev, step]))
  }

  const canProgress = responses[currentStep]?.trim().length > 0

  return (
    <div className="bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100">
        <div 
          className="h-full bg-purple-500 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {STEPS[currentStep].title}
          </h3>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {STEPS.length}
          </span>
        </div>

        <p className="text-gray-600 mb-6">
          {STEPS[currentStep].description}
        </p>

        {STEPS[currentStep].action && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {STEPS[currentStep].action}
            </label>
            <textarea
              value={responses[currentStep] || ''}
              onChange={(e) => handleResponse(currentStep, e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-300"
              rows={4}
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 flex items-center gap-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={() => {
                markStepComplete(currentStep)
                setCurrentStep(prev => Math.min(STEPS.length - 1, prev + 1))
              }}
              disabled={!canProgress}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg flex items-center gap-2 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={() => markStepComplete(currentStep)}
              disabled={!canProgress}
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete
              <Check size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Steps overview */}
      <div className="border-t border-gray-100 p-6 bg-gray-50">
        <h4 className="font-medium text-gray-700 mb-4">Progress Overview</h4>
        <div className="grid grid-cols-4 gap-2">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className={`p-2 rounded text-center text-sm ${
                completedSteps.has(index)
                  ? 'bg-green-100 text-green-700'
                  : index === currentStep
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              Step {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
