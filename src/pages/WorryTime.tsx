import { useState } from 'react'
import { WorryTimeSettings } from '../components/WorryTimeSettings'
import { PastReflections } from '../components/PastReflections'
import { DecisionTree } from '../components/DecisionTree'
import { useWorries } from '../hooks/useWorries'
import { useWorryTime } from '../hooks/useWorryTime'
import { Worry } from '../types'
import { MessageSquare, Brain, ArrowRight, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export function WorryTime() {
  const { worries, updateWorry } = useWorries()
  const { worryTime, setWorryTime } = useWorryTime()
  const [selectedWorry, setSelectedWorry] = useState<Worry | null>(null)
  const [showInsights, setShowInsights] = useState(false)
  const [insights, setInsights] = useState('')

  const handleDecisionTreeComplete = (decisions: {
    isHappeningNow: boolean
    concernsMe: boolean
    canTakeAction: boolean
    goodUseOfResources: boolean
  }) => {
    if (selectedWorry) {
      const updatedWorry = {
        ...selectedWorry,
        reflection: {
          ...selectedWorry.reflection,
          decisionTree: decisions,
        },
        status: 'in-progress' as const,
      }
      updateWorry(updatedWorry)
    }
    setShowInsights(true)
  }

  const handlePostpone = () => {
    if (!selectedWorry) return

    const nextWorryTime = new Date()
    nextWorryTime.setHours(worryTime.hour)
    nextWorryTime.setMinutes(worryTime.minute)
    if (nextWorryTime < new Date()) {
      nextWorryTime.setDate(nextWorryTime.getDate() + 1)
    }

    const updatedWorry: Worry = {
      ...selectedWorry,
      status: 'postponed',
      reflection: {
        ...selectedWorry.reflection,
        postponedUntil: nextWorryTime.toISOString(),
      },
    }

    updateWorry(updatedWorry)
    setSelectedWorry(null)
    setShowInsights(false)
    setInsights('')
  }

  const handleComplete = () => {
    if (!selectedWorry) return

    const updatedWorry: Worry = {
      ...selectedWorry,
      reflection: {
        ...selectedWorry.reflection,
        insights,
      },
      isDealtWith: true,
      status: 'completed',
    }

    updateWorry(updatedWorry)
    setSelectedWorry(null)
    setShowInsights(false)
    setInsights('')
  }

  // Get new worries (unprocessed)
  const newWorries = worries.filter(w => w.status === 'new')
  
  // Get postponed worries
  const postponedWorries = worries.filter(w => w.status === 'postponed')

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <Brain className="text-purple-500" size={32} />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Worry Time
        </h1>
      </div>

      <WorryTimeSettings worryTime={worryTime} onWorryTimeChange={setWorryTime} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* New Worries Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                New Worries
              </h2>
              <span className="text-sm text-purple-600">
                {newWorries.length} to process
              </span>
            </div>
            
            <div className="space-y-4">
              {newWorries.map((worry) => (
                <button
                  key={worry.id}
                  onClick={() => {
                    setSelectedWorry(worry)
                    setShowInsights(false)
                    setInsights('')
                  }}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all ${
                    selectedWorry?.id === worry.id
                      ? 'bg-purple-50 border-purple-200'
                      : 'bg-white border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-gray-700">{worry.content}</p>
                    <AlertCircle className="text-purple-400" size={20} />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Added {new Date(worry.createdAt).toLocaleString()}
                  </p>
                </button>
              ))}
              {newWorries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle size={24} className="mx-auto mb-2 text-gray-400" />
                  <p>No new worries to process</p>
                </div>
              )}
            </div>
          </div>

          {/* Postponed Worries Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Postponed Worries
              </h2>
              <span className="text-sm text-purple-600">
                {postponedWorries.length} waiting
              </span>
            </div>
            
            <div className="space-y-4">
              {postponedWorries.map((worry) => (
                <button
                  key={worry.id}
                  onClick={() => {
                    setSelectedWorry(worry)
                    setShowInsights(false)
                    setInsights('')
                  }}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all ${
                    selectedWorry?.id === worry.id
                      ? 'bg-purple-50 border-purple-200'
                      : 'bg-white border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-gray-700">{worry.content}</p>
                    <Clock className="text-purple-400" size={20} />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Postponed until: {new Date(worry.reflection?.postponedUntil || '').toLocaleString()}
                  </p>
                </button>
              ))}
              {postponedWorries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock size={24} className="mx-auto mb-2 text-gray-400" />
                  <p>No postponed worries</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-purple-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Reflection Process
          </h2>
          {selectedWorry ? (
            <div className="space-y-6">
              {!showInsights ? (
                <DecisionTree
                  worry={selectedWorry}
                  onComplete={handleDecisionTreeComplete}
                  onPostpone={handlePostpone}
                />
              ) : (
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-medium text-purple-800 mb-2">
                      Final Reflection
                    </h3>
                    <p className="text-purple-600 text-sm">
                      Take a moment to note down any insights or action steps from
                      this reflection.
                    </p>
                  </div>

                  <textarea
                    value={insights}
                    onChange={(e) => setInsights(e.target.value)}
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-purple-100 focus:border-purple-300"
                    placeholder="What have you learned about this worry? What actions will you take?"
                    rows={4}
                  />

                  <div className="flex gap-4">
                    <button
                      onClick={handlePostpone}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <Clock size={20} />
                      Postpone
                    </button>
                    <button
                      onClick={handleComplete}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Complete
                      <CheckCircle size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <MessageSquare size={32} className="mb-2" />
              <p>Select a worry to reflect on</p>
            </div>
          )}
        </div>
      </div>

      <PastReflections worries={worries} />
    </div>
  )
}
