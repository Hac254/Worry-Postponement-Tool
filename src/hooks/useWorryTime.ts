import { useState, useEffect } from 'react'
import { WorryTimeSettings } from '../types'

export function useWorryTime() {
  const [worryTime, setWorryTime] = useState<WorryTimeSettings>(() => {
    const saved = localStorage.getItem('worryTime')
    return saved ? JSON.parse(saved) : { hour: 17, minute: 0, duration: 15 }
  })

  useEffect(() => {
    localStorage.setItem('worryTime', JSON.stringify(worryTime))
  }, [worryTime])

  return { worryTime, setWorryTime }
}
