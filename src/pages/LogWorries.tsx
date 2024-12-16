import { WorryInput } from '../components/WorryInput'
import { WorryList } from '../components/WorryList'
import { useWorries } from '../hooks/useWorries'
import { useWorryTime } from '../hooks/useWorryTime'

export function LogWorries() {
  const { worries, addWorry, toggleWorry } = useWorries()
  const { worryTime } = useWorryTime()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Log Your Worries</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
        <WorryInput onAddWorry={addWorry} />
        <div className="mt-6">
          <WorryList 
            worries={worries} 
            onToggleWorry={toggleWorry}
            worryTime={worryTime}
          />
        </div>
      </div>
    </div>
  )
}
