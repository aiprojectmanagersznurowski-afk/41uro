import { useEffect, useRef, useState } from "react"
import familyPhoto from "../assets/family.jpg"
import { event } from "../config/site"

/**
 * Zdjęcie rodzinne odsłania się przy wejściu w viewport (IntersectionObserver,
 * bez GSAP — lżej i wystarczająco na mobile). Karta zaczyna przyciętą i lekko
 * przesuniętą, a po wejściu w widok "otwiera się" do pełnego kadru.
 */
export function PhotoReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="flex flex-col items-center gap-6 px-6 py-20">
      <div
        className="w-full max-w-md overflow-hidden rounded-[28px] border border-line bg-paper shadow-[0_30px_60px_-30px_rgba(33,29,26,0.35)] transition-all duration-[900ms] ease-out"
        style={{
          clipPath: visible ? "inset(0% 0% 0% 0% round 28px)" : "inset(18% 8% 18% 8% round 28px)",
          transform: visible ? "scale(1)" : "scale(0.94)",
        }}
      >
        <img
          src={familyPhoto}
          alt="Michał z rodziną w ogrodzie"
          className="aspect-[4/5] w-full object-cover"
          loading="lazy"
        />
      </div>

      <p
        className="max-w-xs text-balance text-center text-[15px] leading-relaxed text-muted transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transitionDelay: "250ms",
        }}
      >
        Będzie skromnie i kameralnie — tylko rodzina przy jednym stole. Chciałbym świętować {event.age}. urodziny właśnie z Wami.
      </p>
    </section>
  )
}
