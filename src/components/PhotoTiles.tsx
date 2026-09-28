import familyPhoto from "../assets/family.jpg"
import mountainPhoto from "../assets/tile-mountain.jpg"
import cafePhoto from "../assets/moment-cafe.jpg"
import breakfastPhoto from "../assets/tile-breakfast.jpg"
import { useReveal } from "../lib/useReveal"

const tiles = [
  { src: familyPhoto, alt: "Michał z rodziną w ogrodzie" },
  { src: mountainPhoto, alt: "Michał ze znajomymi na szczycie górskim" },
  { src: cafePhoto, alt: "Michał ze znajomymi przy stoliku w ogrodzie" },
  { src: breakfastPhoto, alt: "Michał przy wspólnym śniadaniu" },
]

/** Cztery kafelki obok siebie, bez podpisów — samo zdjęcie ma mówić. */
export function PhotoTiles() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)

  return (
    <section className="px-4 py-10">
      <div
        ref={ref}
        className="grid grid-cols-2 gap-3 transition-[transform,opacity] duration-[800ms] ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        }}
      >
        {tiles.map((t) => (
          <div key={t.src} className="aspect-square overflow-hidden rounded-[18px]">
            <img src={t.src} alt={t.alt} loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}
