import { useEffect, useRef, useState } from 'react'

interface NetworkInformationLike extends EventTarget {
  saveData?: boolean
}

function shouldAutoplay() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  return !reduced && !connection?.saveData
}

export function MotionStudy() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(shouldAutoplay)
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
    const settle = () => {
      if (reduced.matches || connection?.saveData) {
        videoRef.current?.pause()
        setPlaying(false)
      }
    }
    reduced.addEventListener('change', settle)
    connection?.addEventListener('change', settle)
    return () => {
      reduced.removeEventListener('change', settle)
      connection?.removeEventListener('change', settle)
    }
  }, [])

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) return
    if (playing) {
      video.pause()
      setPlaying(false)
      return
    }
    try {
      await video.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  return (
    <section className="motion-study section section--ink" id="motion-study" aria-labelledby="motion-study-title">
      <p className="section-index" aria-hidden="true">02 / MOTION STUDY</p>
      <div className="motion-study__heading">
        <p className="eyebrow">Procedural film / locally authored</p>
        <h2 id="motion-study-title" aria-label="Language has momentum."><span>Language has</span><span>momentum.</span></h2>
        <p>An amendment crosses fragmented clauses and draws them into one working line. The camera stays locked; the document does the work.</p>
      </div>

      <figure className="motion-study__film">
        <video
          ref={videoRef}
          aria-label="A procedural amendment aligns fragmented clauses into one working text"
          autoPlay={playing}
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${base}media/drafting-loop-poster.webp`}
          onCanPlay={() => {
            if (!playing) return
            const attempt = videoRef.current?.play()
            if (attempt) void attempt.catch(() => setPlaying(false))
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={`${base}media/drafting-loop.webm`} type="video/webm" />
          <source src={`${base}media/drafting-loop.mp4`} type="video/mp4" />
        </video>
        <figcaption>
          <span>Motion study 01 / 6 seconds / silent loop</span>
          <span>Deterministic procedural media—not conference footage or a Higgsfield render.</span>
        </figcaption>
        <button className="media-toggle" type="button" onClick={togglePlayback} aria-pressed={!playing}>
          {playing ? 'Pause motion study' : 'Play motion study'}
        </button>
      </figure>

      <div className="motion-study__plates" aria-label="Three procedural image studies">
        <figure>
          <img src={`${base}media/source-field.svg`} alt="Source procedural plate showing separated positions on record" width="640" height="820" loading="lazy" decoding="async" />
          <figcaption><span>01 / Source</span><span>Difference stays legible.</span></figcaption>
        </figure>
        <figure>
          <img src={`${base}media/amendment-field.svg`} alt="Amendment procedural plate showing wording under revision" width="640" height="820" loading="lazy" decoding="async" />
          <figcaption><span>02 / Amend</span><span>The change leaves a trace.</span></figcaption>
        </figure>
        <figure>
          <img src={`${base}media/adoption-field.svg`} alt="Adoption procedural plate showing clauses aligned into shared language" width="640" height="820" loading="lazy" decoding="async" />
          <figcaption><span>03 / Adopt</span><span>Alignment is not erasure.</span></figcaption>
        </figure>
      </div>
    </section>
  )
}
