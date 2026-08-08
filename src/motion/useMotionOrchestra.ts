import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { resolveMotionMode, type MotionMode } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface MotionDiagnostics {
  mode: MotionMode
  actorCount: number
  scrollTriggerCount: number
  mediaActorCount: number
  textTimelineCount: number
}

declare global {
  interface Window {
    __THE_FLOOR_MOTION__?: MotionDiagnostics
  }
}

interface NetworkInformationLike extends EventTarget {
  saveData?: boolean
}

function getConnection(): NetworkInformationLike | undefined {
  return (navigator as Navigator & { connection?: NetworkInformationLike }).connection
}

const actorSelector = [
  '.hero-copy > *',
  '.hero-seal',
  '.motion-study__heading',
  '.motion-study__film',
  '.motion-study__plates figure',
  '.mandate-heading',
  '.mandate-steps li',
  '.committee-dossier',
  '.procedure-sequence',
  '.preparation-desk__workspace',
  '.schedule-list li',
  '.closing-copy',
  '.closing-mark',
].join(', ')

export function useMotionOrchestra() {
  useLayoutEffect(() => {
    const root = document.documentElement
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = getConnection()
    let disposeCurrent: () => void = () => undefined
    let active = true

    const publish = (mode: MotionMode) => {
      const actorCount = mode === 'full' ? document.querySelectorAll(actorSelector).length : 0
      window.__THE_FLOOR_MOTION__ = {
        mode,
        actorCount,
        scrollTriggerCount: mode === 'full' ? ScrollTrigger.getAll().length : 0,
        mediaActorCount: mode === 'full' ? document.querySelectorAll('.motion-study__heading, .motion-study__film, .motion-study__plates figure').length : 0,
        textTimelineCount: mode === 'full' ? 2 : 0,
      }
    }

    const createScrollEntrance = (
      selector: string,
      axis: 'x' | 'y',
      distance: number,
      start = 'top 84%',
    ) => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((element, index) => {
        gsap.from(element, {
          [axis]: index % 2 === 0 ? distance : -distance,
          duration: 1,
          ease: 'power4.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: element,
            start,
            once: true,
          },
        })
      })
    }

    const setupFullMotion = () => {
      root.dataset.motionEngine = 'gsap'
      const context = gsap.context(() => {
        const hero = gsap.timeline({ defaults: { ease: 'power4.out' } })
        hero
          .from('.site-header', { yPercent: -100, duration: 0.7 })
          .from('.hero .eyebrow', { y: 24, clipPath: 'inset(100% 0 0 0)', duration: 0.55 }, 0.12)
          .from('.hero h1 > *', { yPercent: 115, rotate: 1.5, duration: 1.05, stagger: 0.075 }, 0.16)
          .from('.hero-copy > p, .hero-actions', { y: 32, duration: 0.7, stagger: 0.09 }, 0.55)
          .from('.concept-disclosure', { x: 36, duration: 0.65 }, 0.7)
          .from('.hero-seal', { scale: 0.88, rotate: -8, duration: 1.2 }, 0.22)

        gsap.to('.hero-seal .seal-motion', {
          rotate: 16,
          transformOrigin: '50% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })

        const mediaText = gsap.timeline({
          scrollTrigger: {
            trigger: '.motion-study__heading',
            start: 'top 78%',
            once: true,
          },
        })
        mediaText
          .from('.motion-study__heading .eyebrow', { x: -36, duration: 0.5, ease: 'power3.out' })
          .from('.motion-study__heading h2 span', { yPercent: 112, rotate: 1.2, duration: 0.95, stagger: 0.1, ease: 'power4.out' }, 0.08)
          .from('.motion-study__heading > p:last-child', { x: 44, duration: 0.65, ease: 'power3.out' }, 0.32)

        gsap.fromTo('.motion-study__film video',
          { scale: 1.045 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.motion-study__film',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
        createScrollEntrance('.motion-study__film', 'y', 64)
        createScrollEntrance('.motion-study__plates figure', 'y', 78, 'top 88%')

        createScrollEntrance('.mandate-heading, .mandate-steps li', 'x', 48)
        createScrollEntrance('.committee-dossier', 'y', 72, 'top 90%')
        createScrollEntrance('.procedure-sequence', 'x', 56)
        createScrollEntrance('.preparation-desk__workspace', 'x', 56)
        createScrollEntrance('.schedule-list li', 'x', 44)
        createScrollEntrance('.closing-copy, .closing-mark', 'y', 52)
      })

      requestAnimationFrame(() => {
        if (!active) return
        ScrollTrigger.refresh()
        publish('full')
        root.dataset.motionReady = 'true'
      })

      void document.fonts?.ready.then(() => {
        if (active) ScrollTrigger.refresh()
      })

      return () => context.revert()
    }

    const applyMode = () => {
      disposeCurrent()
      delete root.dataset.motionReady
      const mode = resolveMotionMode({
        reducedMotion: reducedQuery.matches,
        saveData: Boolean(connection?.saveData),
      })
      root.dataset.motionMode = mode

      if (mode === 'full') {
        disposeCurrent = setupFullMotion()
        return
      }

      root.dataset.motionEngine = 'settled'
      root.dataset.motionReady = 'true'
      publish(mode)
      disposeCurrent = () => undefined
    }

    reducedQuery.addEventListener('change', applyMode)
    connection?.addEventListener('change', applyMode)
    applyMode()

    return () => {
      active = false
      reducedQuery.removeEventListener('change', applyMode)
      connection?.removeEventListener('change', applyMode)
      disposeCurrent()
      delete root.dataset.motionMode
      delete root.dataset.motionEngine
      delete root.dataset.motionReady
      delete window.__THE_FLOOR_MOTION__
    }
  }, [])
}
