import familyPhoto from "../assets/family.jpg"
import mountainPhoto from "../assets/tile-mountain.jpg"
import cafePhoto from "../assets/moment-cafe.jpg"
import breakfastPhoto from "../assets/tile-breakfast.jpg"
import hikePhoto from "../assets/tile-hike.jpg"
import parkPhoto from "../assets/tile-park.jpg"
import readingPhoto from "../assets/tile-reading.jpg"
import { useScrollReveal } from "../lib/useScrollReveal"

const tiles = [
  { src: familyPhoto, alt: "Michał z rodziną w ogrodzie", wide: false },
  { src: mountainPhoto, alt: "Michał ze znajomymi na szczycie górskim", wide: false },
  { src: cafePhoto, alt: "Michał ze znajomymi przy stoliku w ogrodzie", wide: false },
  { src: breakfastPhoto, alt: "Michał przy wspólnym śniadaniu", wide: false },
  { src: hikePhoto, alt: "Michał na wycieczce w górach", wide: false },
  { src: parkPhoto, alt: "Michał ze znajomym w parku", wide: false },
  { src: readingPhoto, alt: "Wspólne czytanie z najmłodszymi", wide: true },
]

/** Kafelki obok siebie, bez podpisów — samo zdjęcie ma mówić. */
export function PhotoTiles() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 40, scale: 0.97, blur: 6 })

  return (
    <section className="px-3 py-10">
      <div ref={ref} className="grid grid-cols-2 gap-2">
        {tiles.map((t) => (
          <div
            key={t.src}
            className={`overflow-hidden rounded-[18px] ${t.wide ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}
          >
            <img src={t.src} alt={t.alt} loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}
