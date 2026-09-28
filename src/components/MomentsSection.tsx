import { useEffect, useRef, useState } from "react"
import momentStreet from "../assets/moment-street.jpg"
import momentCafe from "../assets/moment-cafe.jpg"

type Moment = { src: string; alt: string; caption: string }

const moments: Moment[] = [
  { src: momentStreet, alt: "Michał z rodzicami na wspólnym wyjeździe", caption: "Wspólne podróże" },
  { src: momentCafe, alt: "Michał ze znajomymi przy stoliku w ogrodzie", caption: "Kawa w dobrym gronie" },
]

/**
 * Dwa pełnowymiarowe kadry, które "wjeżdżają" przy przewijaniu (delikatny
 * ken-burns + odsłonięcie przez IntersectionObserver — bez ciągłego
 * parallaxu powiązanego ze scrollem, żeby nie obciążać telefonów).
 */
export function MomentsSection() {
  return (
    <section className="flex flex-col gap-3 px-4 py-10">
      {moments.map((m) => (
        <MomentPanel key={m.src} moment={m} />
      ))}
    </section>
  )
}

function MomentPanel({ moment }: { moment: Moment }) {
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
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative h-[280px] w-full overflow-hidden rounded-[22px] transition-[clip-path,transform] duration-[1100ms] ease-out"
      style={{
        clipPath: visible ? "inset(0% 0% 0% 0% round 22px)" : "inset(12% 30% 12% 30% round 22px)",
      }}
    >
      <img
        src={moment.src}
        alt={moment.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out"
        style={{ transform: visible ? "scale(1.02)" : "scale(1.14)" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <span
        className="absolute bottom-4 left-5 font-display text-[15px] font-bold uppercase tracking-wide text-white transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}
      >
        {moment.caption}
      </span>
    </div>
  )
}
