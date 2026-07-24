import { SimpleGrid, Text, Center } from '@mantine/core'
import type { Band } from '@data/band/band-model'
import BandCard from './BandCard'

interface BandGridProps {
  bands: Band[]
}

export default function BandGrid({ bands }: BandGridProps) {
  if (bands.length === 0) {
    return (
      <Center h={300}>
        <Text c="dimmed">No bands match your search.</Text>
      </Center>
    )
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={28}>
      {bands.map((band) => (
        <BandCard key={band.id} band={band} />
      ))}
    </SimpleGrid>
  )
}
