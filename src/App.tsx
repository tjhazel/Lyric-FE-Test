import { MantineProvider, createTheme } from '@mantine/core'
import type { MantineColorsTuple } from '@mantine/core'
import Home from '@pages/Home'

// Lyric Green from Sketch: rgba(0,114,100,1) = #007264
const lyricGreen: MantineColorsTuple = [
  '#e0f5f2',
  '#b3e8e1',
  '#80d9d0',
  '#4dccbc',
  '#26bfae',
  '#00a894',
  '#007264', // [6] primary — exact Sketch value
  '#005a4f',
  '#00443c',
  '#002d28',
]

const theme = createTheme({
  primaryColor: 'teal',
  primaryShade: 6,
  colors: { teal: lyricGreen },
  fontFamily: 'Inter, sans-serif',
})

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Home />
    </MantineProvider>
  )
}
