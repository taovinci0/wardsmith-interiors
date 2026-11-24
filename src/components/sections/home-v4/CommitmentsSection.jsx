import { FeatureGridFramed } from '../FeatureGridFramed.jsx'
import { SectionHeaderSplit } from '../SectionHeaderSplit.jsx'

/**
 * "Our promise" — the would-we-have-it-in-our-own-home line as the split
 * header intro, then the six commitments in the framed hairline grid.
 */
export function CommitmentsSection({ data, bg = 'bg-white' }) {
  if (!data?.commitments?.length) return null
  return (
    <section className={`section-padding ${bg}`}>
      <div className="container-custom">
        <SectionHeaderSplit
          eyebrow={data.eyebrow}
          heading={data.commitmentsHeading}
          intro={`${data.contentBefore}${data.contentItalic} ${data.contentAfter.trim()}`}
        />
        <FeatureGridFramed items={data.commitments} />
      </div>
    </section>
  )
}
