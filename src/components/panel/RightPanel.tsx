import { IconX, IconFlag } from '@tabler/icons-react'
import classes from './RightPanel.module.css'

interface RightPanelProps {
  onClose: () => void
}

export default function RightPanel({ onClose }: RightPanelProps) {
  return (
    <div className={classes.panel}>
      <div className={classes.header}>
        <h2 className={classes.title}>Welcome to Lyric Music</h2>
        <button type="button" className={classes.closeBtn} onClick={onClose} aria-label="Close panel">
          <IconX size={16} />
        </button>
      </div>

      <div className={classes.body}>
        <p>
          We&apos;re thrilled to have you join us on this musical journey. Lyric Music is your
          gateway to a fresh and immersive way to enjoy the bands and artists you love.
          Whether you&apos;re searching for your all-time favorite tracks, exploring curated
          playlists crafted to fit every mood, or discovering new songs that will soon
          become your go-to anthems, Lyric Music is here to elevate your listening experience.
        </p>
        <p>
          Imagine having the perfect soundtrack for every moment of your life, from
          energizing workouts to peaceful evenings under the stars. With an intuitive
          interface designed to make finding music effortless and enjoyable, you&apos;ll
          spend less time searching and more time grooving.
        </p>
        <p>
          At Lyric Music, we&apos;re passionate about creating a community where music
          lovers like you can explore, connect, and celebrate the power of sound. So
          dive in, press play, and let the music move you. Welcome to your new
          favorite way to listen.
        </p>
      </div>

      <div className={classes.coming}>
        <div className={classes.comingIcon} aria-hidden="true">
          <IconFlag size={48} color="#007264" stroke={1.5} />
        </div>
        <div className={classes.comingText}>
          <p className={classes.comingLabel}>Coming Soon</p>
          <p className={classes.comingCaption}>Check out what&apos;s new for 2025 from the Lyric team.</p>
        </div>
      </div>
    </div>
  )
}
