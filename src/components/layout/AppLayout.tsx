import type { ReactNode } from 'react'
import { ActionIcon, Box, Burger, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconBell, IconSettings, IconMessageCircle } from '@tabler/icons-react'
import classes from './AppLayout.module.css'

interface AppLayoutProps {
  filterBar: ReactNode
  drawerContent?: ReactNode
  panel: ReactNode
  panelOpen: boolean
  children: ReactNode
}

export default function AppLayout({ filterBar, drawerContent, panel, panelOpen, children }: AppLayoutProps) {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)

  return (
    <div className={classes.root}>

      {/* Mobile filter drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title="Filter"
        size="xs"
        styles={{
          content: { background: '#0F0F0F' },
          header: { background: '#0F0F0F', color: '#CBCBCB' },
          title: { color: '#007264', fontWeight: 700, fontSize: 18 },
          close: { color: '#CBCBCB' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* ── Left column ─────────────────────────────────── */}
      <div className={classes.leftCol}>

        {/* Header bar: logo | filter pills + search | icons */}
        <header className={classes.header}>
          <img
            src="/sources/lyric_lg_rgb_mnt_wht.png"
            alt="Lyric Music"
            className={classes.logoImg}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />

          <div className={classes.filterRow}>
            {filterBar}
          </div>

          {/* Desktop icons — hidden below sm */}
          <Box visibleFrom="sm" className={classes.icons}>
            <ActionIcon variant="subtle" size={42} aria-label="Notifications" style={{ color: '#CBCBCB' }}>
              <IconBell />
            </ActionIcon>
            <ActionIcon variant="subtle" size={42} aria-label="Settings" style={{ color: '#CBCBCB' }}>
              <IconSettings />
            </ActionIcon>
            <ActionIcon variant="subtle" size={42} aria-label="Messages" style={{ color: '#CBCBCB' }}>
              <IconMessageCircle />
            </ActionIcon>
          </Box>

          {/* Mobile burger — hidden above sm */}
          <Burger
            hiddenFrom="sm"
            opened={drawerOpened}
            onClick={openDrawer}
            size="sm"
            color="#CBCBCB"
            aria-label="Open filters"
          />
        </header>

        {/* Card grid */}
        <main className={classes.main}>
          {children}
        </main>
      </div>

      {/* ── Right column: pure sidebar content ──────────── */}
      <aside className={`${classes.rightCol} ${panelOpen ? '' : classes.rightColCollapsed}`}>
        {panel}
      </aside>

    </div>
  )
}
