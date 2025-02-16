import { useState, useEffect } from 'react'
import { ProblemSolution } from '../types'

export function useSolutions() {
  const [solutions, setSolutions] = useState<ProblemSolution[]>(() => {
    const saved = localStorage.getItem('problemSolutions')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('problemSolutions', JSON.stringify(solutions))
  }, [solutions])

  const addSolution = (solution: ProblemSolution) => {
    setSolutions(prev => [...prev, solution])
  }

  const updateSolution = (updatedSolution: ProblemSolution) => {
    setSolutions(prev =>
      prev.map(solution =>
        solution.id === updatedSolution.id ? updatedSolution : solution
      )
    )
  }

  const deleteSolution = (id: string) => {
    setSolutions(prev => prev.filter(solution => solution.id !== id))
  }

  return {
    solutions,
    addSolution,
    updateSolution,
    deleteSolution,
  }
}
