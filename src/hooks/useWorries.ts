import { useState, useEffect } from 'react'
import { Worry } from '../types'

export function useWorries() {
  const [worries, setWorries] = useState<Worry[]>(() => {
    const saved = localStorage.getItem('worries')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('worries', JSON.stringify(worries))
  }, [worries])

  const addWorry = (content: string) => {
    const newWorry: Worry = {
      id: crypto.randomUUID(),
      content,
      createdAt: new Date().toISOString(),
      isDealtWith: false,
      status: 'new'
    }
    setWorries(prev => [newWorry, ...prev])
  }

  const toggleWorry = (id: string) => {
    setWorries(prev =>
      prev.map(worry =>
        worry.id === id ? { ...worry, isDealtWith: !worry.isDealtWith } : worry
      )
    )
  }

  const updateWorry = (updatedWorry: Worry) => {
    setWorries(prev =>
      prev.map(worry =>
        worry.id === updatedWorry.id ? updatedWorry : worry
      )
    )
  }

  return { worries, addWorry, toggleWorry, updateWorry }
}
