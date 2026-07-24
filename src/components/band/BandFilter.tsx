import { Box } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import classes from './BandFilter.module.css'

const GENRES = ['All', 'Country', 'Rock', 'Pop'] as const

interface BandFilterProps {
  search: string
  onSearchChange: (value: string) => void
  genre: string | null
  onGenreChange: (genre: string | null) => void
  drawerMode?: boolean
}

export default function BandFilter({ search, onSearchChange, genre, onGenreChange, drawerMode }: BandFilterProps) {
  const handleGenreClick = (g: string) => {
    if (g === 'All') {
      onGenreChange(null)
    } else {
      onGenreChange(genre === g.toLowerCase() ? null : g.toLowerCase())
    }
  }

  const activeGenre = genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : 'All'

  const pills = GENRES.map((g) => (
    <button
      key={g}
      type="button"
      className={`${classes.pill} ${activeGenre === g ? classes.pillActive : ''}`}
      onClick={() => handleGenreClick(g)}
    >
      {g}
    </button>
  ))

  const searchInput = (
    <div className={classes.searchWrap}>
      <IconSearch size={14} className={classes.searchIcon} />
      <input
        type="search"
        placeholder=""
        value={search}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        className={classes.search}
        aria-label="Search bands"
      />
    </div>
  )

  if (drawerMode) {
    return (
      <>
        <div className={classes.drawerPillGroup}>{pills}</div>
        <div className={classes.drawerSearch}>{searchInput}</div>
      </>
    )
  }

  return (
    <>
      <Box visibleFrom="sm" className={classes.pillGroup}>
        {pills}
      </Box>

      <Box visibleFrom="sm">
        {searchInput}
      </Box>
    </>
  )
}
