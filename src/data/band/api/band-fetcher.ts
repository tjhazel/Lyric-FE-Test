import type { Band, BandDetail } from '../band-model'

// Handles the inconsistent zero-padding in the provided asset filenames
const IMAGE_MAP: Record<string, string> = {
  '001': 'im001.png',
  '002': 'im002.png',
  '003': 'im003.png',
  '005': 'im005.png',
  '008': 'im008.png',
  '010': 'im0010.png',
  '012': 'im0012.png',
}

export function getBandImageSrc(id: string): string {
  return `/sources/${IMAGE_MAP[id] ?? 'default.png'}`
}

export async function fetchBands(): Promise<Band[]> {
  const res = await fetch('/mock_data/bands.json')
  if (!res.ok) throw new Error('Failed to load bands')
  return res.json() as Promise<Band[]>
}

export async function fetchBandDetail(id: string): Promise<BandDetail | null> {
  try {
    const res = await fetch(`/mock_data/${id}.json`)
    // Vite dev server returns index.html (200) for missing static files — check content-type too
    if (!res.ok) return null
    if (!res.headers.get('content-type')?.includes('application/json')) return null
    return await res.json() as BandDetail
  } catch {
    return null
  }
}
