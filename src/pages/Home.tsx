import { useState } from 'react'
import { LoadingOverlay, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useBands } from '@data/band/hooks/useBands'
import AppLayout from '@components/layout/AppLayout'
import BandFilter from '@components/band/BandFilter'
import BandGrid from '@components/band/BandGrid'
import RightPanel from '@components/panel/RightPanel'

export default function Home() {
  const { data: bands, loading, error } = useBands()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(true)

  const filtered = bands.filter((b) => {
    const matchesSearch = b.band_name.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = !genre || b.genre === genre
    return matchesSearch && matchesGenre
  })

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <LoadingOverlay visible={loading} />

      <AppLayout
        filterBar={
          <BandFilter
            search={search}
            onSearchChange={setSearch}
            genre={genre}
            onGenreChange={setGenre}
          />
        }
        drawerContent={
          <BandFilter
            drawerMode
            search={search}
            onSearchChange={setSearch}
            genre={genre}
            onGenreChange={setGenre}
          />
        }
        panel={<RightPanel onClose={() => setPanelOpen(false)} />}
        panelOpen={panelOpen}
      >
        {error ? (
          <Alert icon={<IconAlertCircle size={16} />} color="red" title="Error">
            {error}
          </Alert>
        ) : (
          <BandGrid bands={filtered} />
        )}
      </AppLayout>
    </div>
  )
}
