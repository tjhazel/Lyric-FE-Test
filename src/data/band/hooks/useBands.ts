import { useState, useEffect } from 'react'
import type { Band } from '../band-model'
import { fetchBands } from '../api/band-fetcher'

interface UseBandsResult {
  data: Band[]
  loading: boolean
  error: string | null
}

export function useBands(): UseBandsResult {
  const [data, setData] = useState<Band[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBands()
      .then(setData)
      .catch(() => setError('Failed to load bands. Please refresh the page.'))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
