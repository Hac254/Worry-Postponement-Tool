import { useState, useEffect } from 'react'
import { PlusCircle, Trash2, Brain, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react'
import { ProblemSolution } from '../types'
import { PastSolutions } from '../components/PastSolutions'

const INITIAL_STATE: ProblemSolution = {
  id: '',
  createdAt: '',
  worry: '',
  practicalProblem: '',
  solutions: [],
  analysis: [],
  chosenSolution: '',
  actionPlan: [],
  progress: '',
  review: '',
  status: 'in-progress',
}

const STEPS = [
  {
    title: 'Identify the Worry',
    description: 'What specific worry would you like to work on solving?',
    guidance: 'Choose a worry that feels manageable and has potential for practical action. This helps break down bigger concerns into solvable pieces.',
    field: 'worry',
    placeholder: 'Describe your worry in detail...',
  },
  {
    title: 'Define the Problem',
    description: 'Convert your worry into a specific, practical problem that can be solved.',
    guidance: 'Make it specific and actionable. Instead of "I\'m worried about money," try "I need to reduce my monthly expenses by $200."',
    field: 'practicalProblem',
    placeholder: 'Reframe your worry as a concrete problem...',
  },
  {
    title: 'Generate Solutions',
    description: 'List all possible solutions, without judging them yet.',
    guidance: 'Include both obvious and creative solutions. Don\'t evaluate them yet – even seemingly impractical ideas can lead to good solutions.',
    field: 'solutions',
    placeholder: 'Add a potential solution...',
  },
  {
    title: 'Analyze Solutions',
    description: 'Consider the pros and cons of each solution.',
    guidance: 'Be realistic about the resources (time, money, energy) needed for each solution. Consider both short-term and long-term impacts.',
    field: 'analysis',
  },
  {
    title: 'Choose Solution',
    description: 'Select the most practical and feasible solution.',
    guidance: 'Pick the solution that offers the best balance of effectiveness and feasibility. It doesn\'t have to be perfect – you can adjust as needed.',
    field: 'chosenSolution',
    placeholder: 'Describe your chosen solution and why you picked it...',
  },
  {
    title: 'Create Action Plan',
    description: 'Break down your chosen solution into specific steps.',
    guidance: 'Make each step concrete and achievable. Include who, what, when, and where for each action item.',
    field: 'actionPlan',
    placeholder: 'Add an action step...',
  },
  {
    title: 'Track Progress',
    description: 'Note your progress and any challenges faced.',
    guidance: 'Regular progress updates help you stay accountable and identify what\'s working or needs adjustment.',
    field: 'progress',
    placeholder: 'Describe your progress so far...',
  },
  {
    title: 'Review',
    description: 'Reflect on how well the solution worked.',
    guidance: 'Consider what worked, what didn\'t, and what you learned. This helps improve your problem-solving skills for the future.',
    field: 'review',
    placeholder: 'Write your reflection...',
  },
]

function isValidField(field: string): field is keyof ProblemSolution {
  return ['worry', 'practicalProblem', 'solutions', 'analysis', 'chosenSolution', 'actionPlan', 'progress', 'review'].includes(field)
}

function getSolutionField(solution: ProblemSolution, field: string): string {
  if (!isValidField(field)) return ''
  return solution[field] as string
}

export function ProblemSolving() {
  const [solutions, setSolutions] = useState<ProblemSolution[]>(() => {
    const saved = localStorage.getItem('problemSolutions')
    return saved ? JSON.parse(saved) : []
  })
  const [currentSolution, setCurrentSolution] = useState<ProblemSolution>(INITIAL_STATE)
  const [step, setStep] = useState(0)
  const [currentItem, setCurrentItem] = useState('')

  useEffect(() => {
    localStorage.setItem('problemSolutions', JSON.stringify(solutions))
  }, [solutions])

  const handleInputChange = (value: string) => {
    const field = STEPS[step].field
    if (field === 'solutions' || field === 'actionPlan') {
      setCurrentItem(value)
    } else {
      setCurrentSolution(prev => ({ ...prev, [field]: value }))
    }
  }

  const addItem = () => {
    const field = STEPS[step].field
    if (currentItem.trim() && (field === 'solutions' || field === 'actionPlan')) {
      setCurrentSolution(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), currentItem.trim()],
      }))
      setCurrentItem('')
    }
  }

  const removeItem = (index: number) => {
    const field = STEPS[step].field
    if (field === 'solutions' || field === 'actionPlan') {
      setCurrentSolution(prev => ({
        ...prev,
        [field]: (prev[field] as string[]).filter((_, i) => i !== index),
      }))
    }
  }

  const addAnalysis = (solution: string, type: 'pros' | 'cons', value: string) => {
    setCurrentSolution(prev => ({
      ...prev,
      analysis: prev.analysis.map(a =>
        a.solution === solution
          ? { ...a, [type]: [...a[type], value] }
          : a
      ),
    }))
  }

  const removeAnalysis = (solution: string, type: 'pros' | 'cons', index: number) => {
    setCurrentSolution(prev => ({
      ...prev,
      analysis: prev.analysis.map(a =>
        a.solution === solution
          ? { ...a, [type]: a[type].filter((_, i) => i !== index) }
          : a
      ),
    }))
  }

  const canProgress = () => {
    const field = STEPS[step].field
    if (!isValidField(field)) return false
    
    if (field === 'solutions' || field === 'actionPlan') {
      return (currentSolution[field] as string[]).length > 0
    }
    if (field === 'analysis') {
      return currentSolution.analysis.length === currentSolution.solutions.length
    }
    return Boolean(currentSolution[field])
  }

  const renderCurrentStep = () => {
    const { title, description, guidance, field, placeholder } = STEPS[step]

    return (
      <div className="space-y-6">
        {/* Step header */}
        <div className="flex items-center justify-between border-b border-green-100 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
          <span className="text-green-600 font-medium">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>

        {/* Guidance card */}
        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg text-green-700">
          <HelpCircle className="shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-medium mb-1">Guidance</p>
            <p className="text-sm">{guidance}</p>
          </div>
        </div>

        {/* Input section */}
        {field === 'solutions' || field === 'actionPlan' ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentItem}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-300"
                placeholder={placeholder}
              />
              <button
                onClick={addItem}
                className="p-3 text-green-600 hover:text-green-700 transition-colors"
              >
                <PlusCircle size={24} />
              </button>
            </div>

            <div className="space-y-2">
              {(currentSolution[field] as string[]).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-700">{item}</span>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : field === 'analysis' ? (
          <div className="space-y-6">
            {currentSolution.solutions.map((solution) => {
              const analysis = currentSolution.analysis.find(
                (a) => a.solution === solution
              ) || { solution, pros: [], cons: [] }

              return (
                <div key={solution} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-4">{solution}</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {(['pros', 'cons'] as const).map((type) => (
                      <div key={type}>
                        <h4 className="font-medium text-gray-700 mb-2 capitalize">
                          {type}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder={`Add ${type}...`}
                              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-300"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const value = (e.target as HTMLInputElement).value
                                  if (value.trim()) {
                                    addAnalysis(solution, type, value.trim())
                                    ;(e.target as HTMLInputElement).value = ''
                                  }
                                }
                              }}
                            />
                            <button
                              onClick={() => {
                                const input = document.querySelector(
                                  `input[placeholder="Add ${type}..."]`
                                ) as HTMLInputElement
                                if (input.value.trim()) {
                                  addAnalysis(solution, type, input.value.trim())
                                  input.value = ''
                                }
                              }}
                              className="p-2 text-green-600 hover:text-green-700 transition-colors"
                            >
                              <PlusCircle size={24} />
                            </button>
                          </div>
                          
                          {analysis[type].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                            >
                              <span className="text-gray-700">{item}</span>
                              <button
                                onClick={() => removeAnalysis(solution, type, index)}
                                className="text-red-500 hover:text-red-600 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <textarea
            value={getSolutionField(currentSolution, field)}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-300"
            rows={4}
            placeholder={placeholder}
          />
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Brain className="text-green-500" size={32} />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Problem Solving Guide
        </h1>
      </div>

      {/* Main content */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
        {/* Progress dots */}
        <div className="flex items-center justify-between mb-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i < step ? 'bg-green-500 text-white' : 
                i === step ? 'bg-green-100 text-green-600 border-2 border-green-500' : 
                'bg-gray-100 text-gray-400'
              }`}
            >
              {i < step ? <CheckCircle2 size={16} /> : i + 1}
            </div>
          ))}
        </div>

        {renderCurrentStep()}

        {/* Navigation */}
        <div className="flex justify-between gap-4 mt-8 pt-4 border-t border-gray-100">
          {step > 0 && (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowRight className="rotate-180" size={20} />
              Previous Step
            </button>
          )}
          
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              disabled={!canProgress()}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={() => {
                const newSolution = {
                  ...currentSolution,
                  id: crypto.randomUUID(),
                  createdAt: new Date().toISOString(),
                  completedAt: new Date().toISOString(),
                  status: 'completed' as const,
                }
                setSolutions(prev => [...prev, newSolution])
                setCurrentSolution(INITIAL_STATE)
                setStep(0)
              }}
              disabled={!canProgress()}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete
              <CheckCircle2 size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Past Solutions */}
      <PastSolutions solutions={solutions} />
    </div>
  )
}
