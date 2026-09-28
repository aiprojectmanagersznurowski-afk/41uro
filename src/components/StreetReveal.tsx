import streetPhoto from "../assets/moment-street.jpg"
import { useReveal } from "../lib/useReveal"

/**
 * Pełnowymiarowe zdjęcie, które "wjeżdża" na ekran od dołu, gdy użytkownik
 * do niego doscrolluje — bez podpisu, samo zdjęcie ma zrobić wrażenie.
 */
export function StreetReveal() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)

  return (
    <section className="px-0 py-3">
      <div
        ref={ref}
        className="h-[80svh] w-full overflow-hidden transition-[transform,opacity] duration-[900ms] ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(64px)",
        }}
      >
        <img
          src={streetPhoto}
          alt="Michał z rodzicami na wspólnym wyjeździe"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out"
          style={{ transform: visible ? "scale(1)" : "scale(1.08)" }}
        />
      </div>
    </section>
  )
}
