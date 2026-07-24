import { useState } from 'react'
import { getBandImageSrc } from '../api/band-fetcher'

type ImageState = 'primary' | 'fallback' | 'failed'

interface UseBandImageResult {
  data: string | null   // null = render placeholder, not an img
  loading: boolean
  error: boolean
  onError: () => void
}

export function useBandImage(id: string): UseBandImageResult {
  const [imgState, setImgState] = useState<ImageState>('primary')

  const onError = () =>
    setImgState(prev => (prev === 'primary' ? 'fallback' : 'failed'))

  const data =
    imgState === 'primary'
      ? getBandImageSrc(id)
      : imgState === 'fallback'
        ? '/sources/default.png'
        : null

  return {
    data,
    loading: imgState === 'primary',
    error: imgState === 'failed',
    onError,
  }
}
