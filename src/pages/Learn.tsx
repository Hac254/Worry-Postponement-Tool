import { BookOpen, Brain, Clock, CheckCircle } from 'lucide-react'

export function Learn() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Learn About Worry Postponement</h1>
      
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="text-purple-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">The Science Behind It</h2>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>
              Worry postponement is based on cognitive behavioral therapy principles.
              It works by helping you:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Break the cycle of repetitive worrying</li>
              <li>Reduce anxiety by containing worry to specific times</li>
              <li>Improve your ability to focus on the present moment</li>
              <li>Develop better emotional regulation skills</li>
            </ul>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-purple-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">How It Works</h2>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>The process involves three key steps:</p>
            <ol className="list-decimal list-inside space-y-4 ml-4">
              <li className="font-medium">Notice and Log
                <p className="font-normal mt-2">When a worry appears, acknowledge it and write it down instead of engaging with it immediately.</p>
              </li>
              <li className="font-medium">Postpone
                <p className="font-normal mt-2">Remind yourself that you'll address this concern during your designated worry time.</p>
              </li>
              <li className="font-medium">Review and Process
                <p className="font-normal mt-2">During your worry time, review your concerns mindfully and develop action plans for solvable worries.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="text-purple-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Decision Tree</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              During worry time, you'll use a decision tree to help determine if a worry needs immediate attention.
              You'll be asked:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
              <li>Is this thing happening now?</li>
              <li>Does this worry concern me?</li>
              <li>Can I take action that will directly resolve it?</li>
              <li>Is it a good use of the limited resources available to me?</li>
            </ul>
            <p className="text-gray-600">
              If you answer "no" to any of these questions, it's a sign that this worry can be postponed or let go.
              This helps you focus your energy on concerns that truly need your attention.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
