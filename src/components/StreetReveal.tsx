import streetPhoto from "../assets/moment-street.jpg"
import { useScrollReveal } from "../lib/useScrollReveal"

/**
 * Pełnowymiarowe zdjęcie, bez podpisu — odsłania się ciągłą animacją
 * powiązaną ze scrollem (blur → ostrość, skala, wjazd od dołu).
 */
export function StreetReveal() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 90, scale: 0.92, blur: 12, start: "top 95%", end: "top 30%" })

  return (
    <section className="px-0 py-3">
      <div ref={ref} className="h-[80svh] w-full overflow-hidden">
        <img
          src={streetPhoto}
          alt="Michał z rodzicami na wspólnym wyjeździe"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
