import { useState } from 'react'
import { WorryTimeSettings } from '../components/WorryTimeSettings'
import { PastReflections } from '../components/PastReflections'
import { useWorries } from '../hooks/useWorries'
import { useWorryTime } from '../hooks/useWorryTime'
import { Worry } from '../types'
import { Check, X, MessageSquare } from 'lucide-react'

export function WorryTime() {
  const { worries, updateWorry } = useWorries()
  const { worryTime, setWorryTime } = useWorryTime()
  const [selectedWorry, setSelectedWorry] = useState<Worry | null>(null)
  const [reflection, setReflection] = useState({
    isSolvable: undefined as boolean | undefined,
    actionSteps: [] as string[],
    insights: ''
  })

  const handleReflection = () => {
    if (!selectedWorry) return
    
    updateWorry({
      ...selectedWorry,
      reflection: {
        ...reflection
      },
      isDealtWith: true
    })
    setSelectedWorry(null)
    setReflection({
      isSolvable: undefined,
      actionSteps: [],
      insights: ''
    })
  }

  const activeWorries = worries.filter(w => !w.isDealtWith)

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Worry Time</h1>
      
      <WorryTimeSettings 
        worryTime={worryTime}
        onWorryTimeChange={setWorryTime}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-purple-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Active Worries</h2>
          <div className="space-y-4">
            {activeWorries.map(worry => (
              <button
                key={worry.id}
                onClick={() => setSelectedWorry(worry)}
                className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all ${
                  selectedWorry?.id === worry.id
                    ? 'bg-purple-50 border-purple-200'
                    : 'bg-white border-gray-200 hover:border-purple-200'
                }`}
              >
                <p className="text-gray-700">{worry.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Added {new Date(worry.createdAt).toLocaleString()}
                </p>
              </button>
            ))}
            {activeWorries.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No active worries to process
              </p>
            )}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-purple-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Reflection</h2>
          {selectedWorry ? (
            <div className="space-y-4">
              <p className="text-gray-700 font-medium">{selectedWorry.content}</p>
              
              <div className="space-y-2">
                <p className="text-gray-600">Is this worry solvable?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setReflection(r => ({...r, isSolvable: true}))}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      reflection.isSolvable === true
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => setReflection(r => ({...r, isSolvable: false}))}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      reflection.isSolvable === false
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-600">Your insights</label>
                <textarea
                  value={reflection.insights}
                  onChange={e => setReflection(r => ({...r, insights: e.target.value}))}
                  className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-purple-100 focus:border-purple-300"
                  placeholder="What have you learned about this worry?"
                  rows={3}
                />
              </div>

              <button
                onClick={handleReflection}
                className="w-full py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Complete Reflection
              </button>
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
