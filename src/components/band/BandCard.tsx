import type { Band } from '@data/band/band-model'
import { useBandDetail } from '@data/band/hooks/useBandDetail'
import { useBandImage } from '@data/band/hooks/useBandImage'
import classes from './BandCard.module.css'

const DEFAULT_DESCRIPTION = 'No description available for this artist.'

interface BandCardProps {
  band: Band
}

export default function BandCard({ band }: BandCardProps) {
  const { data: detail } = useBandDetail(band.id)
  const { data: imgSrc, onError } = useBandImage(band.id)

  return (
    <div className={classes.card}>
      {imgSrc !== null ? (
        <img
          src={imgSrc}
          alt={band.band_name}
          className={classes.image}
          onError={onError}
        />
      ) : (
        <div className={classes.placeholder} aria-hidden="true">
          <span className={classes.placeholderInitial}>
            {band.band_name.charAt(0)}
          </span>
        </div>
      )}

      <div className={classes.textBlock}>
        <p className={classes.bandName}>{band.band_name}</p>
        <p className={classes.album}>{band.album}</p>
        <p className={classes.description}>
          {detail?.description ?? DEFAULT_DESCRIPTION}
        </p>
      </div>
    </div>
  )
}
