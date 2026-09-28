import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Options = {
  y?: number
  scale?: number
  blur?: number
  /** Punkt startu/końca względem viewportu, jak w ScrollTrigger. */
  start?: string
  end?: string
}

/**
 * Wersja "kinowa" efektu wjeżdżania: zamiast jednorazowego przejścia
 * odpalanego przez IntersectionObserver, animacja jest CIĄGLE powiązana ze
 * scrollem (GSAP ScrollTrigger, scrub) — dokładnie jak w referencyjnym
 * cinematic-hero. Element odsłania się (blur→ostrość, skala, przesunięcie,
 * przezroczystość) proporcjonalnie do tego, jak daleko przewinięto stronę
 * między `start` a `end`, więc cofnięcie scrolla cofa też animację.
 *
 * Przy prefers-reduced-motion nic się nie dzieje — element zostaje w swoim
 * docelowym, w pełni czytelnym stanie.
 */
export function useScrollReveal<T extends HTMLElement>(opts: Options = {}) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const { y = 64, scale = 0.94, blur = 9, start = "top 90%", end = "top 45%" } = opts

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y, scale, filter: `blur(${blur}px)` },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: { trigger: el, start, end, scrub: 0.5 },
        },
      )
    })

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
