import { useState, useEffect } from 'react'
import type { BandDetail } from '../band-model'
import { fetchBandDetail } from '../api/band-fetcher'

interface UseBandDetailResult {
  data: BandDetail | null
  loading: boolean
  error: string | null
}

export function useBandDetail(id: string): UseBandDetailResult {
  const [data, setData] = useState<BandDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBandDetail(id)
      .then(setData)
      .catch(() => setError('Failed to load band detail'))
      .finally(() => setLoading(false))
  }, [id])

  return { data, loading, error }
}
