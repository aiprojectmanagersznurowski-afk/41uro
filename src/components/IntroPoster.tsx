import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { event, venue } from "../config/site"
import portrait from "../assets/portrait.jpg"
import "./IntroPoster.css"

gsap.registerPlugin(ScrollTrigger)

/**
 * Ekran powitalny w dwóch warstwach — obie są DZIEĆMI <section>, nie jedna
 * drugiej:
 *  1. `textRef` — cały tekst (eyebrow, "41", tytuł, data), dostaje animowany
 *     transform/filter podczas scrolla,
 *  2. `photoWrapRef` — zdjęcie, position: fixed, rośnie do pełnego ekranu.
 *
 * Gdyby zdjęcie było potomkiem warstwy tekstu, transform na tej warstwie
 * uczyniłby ją containing blockiem dla position:fixed i zdjęcie przestałoby
 * liczyć się względem viewportu zamiast rosnąć na cały ekran — stąd ten
 * podział. `pinType: "fixed"` wymusza, żeby GSAP też pinował przez fixed
 * (nie transform), więc oba mechanizmy fixed nie kolidują ze sobą.
 *
 * Bez JS / przy prefers-reduced-motion zdjęcie zostaje w swoim małym,
 * blendowanym kształcie — strona nadal ma sens i jest kompletna bez
 * przewijania.
 */
export function IntroPoster() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const photoWrapRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)
  const [enhanced] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches)

  useLayoutEffect(() => {
    if (!enhanced) return
    const photo = photoWrapRef.current
    const placeholder = placeholderRef.current
    if (!photo || !placeholder) return

    const ctx = gsap.context(() => {
      const rect = placeholder.getBoundingClientRect()
      gsap.set(photo, {
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 28,
        zIndex: 5,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1100",
          scrub: 0.6,
          pin: true,
          pinType: "fixed",
          anticipatePin: 1,
        },
      })

      tl.to(textRef.current, { opacity: 0, y: -24, filter: "blur(10px)", scale: 0.94, duration: 1 }, 0)
        .to(glowRef.current, { opacity: 0, duration: 0.5 }, 0)
        .to(
          photo,
          {
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            duration: 1.4,
            ease: "power2.inOut",
          },
          0.1,
        )
        .to(captionRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.05)

      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener("resize", onResize)
      return () => window.removeEventListener("resize", onResize)
    }, sectionRef)

    return () => ctx.revert()
  }, [enhanced])

  return (
    <section ref={sectionRef} className="relative min-h-svh overflow-hidden bg-bg">
      <div
        ref={textRef}
        className="relative flex min-h-svh flex-col px-6 pb-8 pt-[calc(env(safe-area-inset-top,0px)+28px)]"
      >
        <div className="intro-eyebrow flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-terracotta-deep">
          <span>Rodzinny obiad</span>
          <span className="text-muted">{venue.shortName}</span>
        </div>

        <div className="relative mt-2 flex flex-1 flex-col items-center justify-center gap-1 text-center">
          {enhanced ? (
            <div ref={placeholderRef} className="mb-2 h-[220px] w-[190px]" aria-hidden="true" />
          ) : (
            <div className="intro-portrait-wrap relative mb-2 h-[220px] w-[190px]">
              <div className="intro-portrait-glow absolute inset-0" aria-hidden="true" />
              <img src={portrait} alt="Michał" className="intro-portrait-img relative h-full w-full object-cover" />
            </div>
          )}

          <div className="intro-word-top font-display text-[15px] font-bold uppercase tracking-[0.28em] text-muted">
            Zapraszam na
          </div>

          <div className="flex items-end justify-center gap-1">
            <svg className="intro-digit d1" width="86" height="128" viewBox="0 0 86 128" fill="none">
              <path
                d="M60 6 L14 82 H64"
                stroke="var(--color-ink)"
                strokeWidth="16"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path d="M64 6 V122" stroke="var(--color-ink)" strokeWidth="16" strokeLinecap="square" />
            </svg>
            <svg className="intro-digit d2" width="60" height="128" viewBox="0 0 60 128" fill="none">
              <path
                d="M12 26 L34 6 V122"
                stroke="var(--color-terracotta)"
                strokeWidth="16"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="intro-word-bottom font-display text-[38px] font-extrabold uppercase leading-[0.86] tracking-tight text-ink sm:text-[44px]">
            urodziny <span className="text-terracotta">michała</span>
          </div>

          <div className="intro-rule mt-3 h-[3px] w-14 rounded-full bg-terracotta" />

          <div className="intro-sub mt-3 max-w-[240px] text-[13.5px] leading-relaxed text-muted">
            {event.dateLabel}, {event.weekdayLabel}, godz. <b className="text-ink">{event.timeLabel}</b>
          </div>
        </div>

        <div className="intro-scroll-cue flex flex-col items-center gap-2 text-muted">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Przewiń</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {enhanced && (
        <div ref={photoWrapRef} className="intro-grow-photo">
          <div ref={glowRef} className="intro-portrait-glow absolute inset-0" aria-hidden="true" />
          <img src={portrait} alt="Michał" className="intro-portrait-img relative h-full w-full object-cover" />
          <div className="intro-grow-scrim absolute inset-x-0 bottom-0" aria-hidden="true" />
          <div ref={captionRef} className="intro-grow-caption absolute inset-x-0 bottom-10 px-8 text-center opacity-0">
            <span className="block font-display text-[12px] font-bold uppercase tracking-[0.3em] text-white/80">
              Zapraszam na
            </span>
            <span className="mt-1 block text-balance font-display text-[36px] font-extrabold uppercase leading-[0.9] text-white sm:text-[44px]">
              Urodziny <span className="text-terracotta">Michała</span>
            </span>
            <span className="mt-2 block text-[13px] font-semibold text-white/85">
              {event.dateLabel} · godz. {event.timeLabel}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
