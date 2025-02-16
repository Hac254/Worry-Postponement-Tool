import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { Navigation } from './components/Navigation'
import { SplashScreen } from './components/SplashScreen'
import { Home } from './pages/Home'
import { LogWorries } from './pages/LogWorries'
import { WorryTime } from './pages/WorryTime'
import { Learn } from './pages/Learn'
import { ProblemSolving } from './pages/ProblemSolving'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash ? (
        <SplashScreen onStart={() => setShowSplash(false)} />
      ) : (
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
            <main className="px-4 py-6 max-w-4xl mx-auto pb-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/log" element={<LogWorries />} />
                <Route path="/worry-time" element={<WorryTime />} />
                <Route path="/problem-solving" element={<ProblemSolving />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Navigation />
          </div>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
