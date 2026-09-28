import { DitherHelixCarousel } from "./ui/dither-helix-carousel"
import familyPhoto from "../assets/family.jpg"
import mountainPhoto from "../assets/tile-mountain.jpg"
import cafePhoto from "../assets/moment-cafe.jpg"
import breakfastPhoto from "../assets/tile-breakfast.jpg"
import readingPhoto from "../assets/tile-reading.jpg"

const items = [
  { image: familyPhoto, title: "Rodzina" },
  { image: mountainPhoto, title: "Szczyt" },
  { image: cafePhoto, title: "Wspólny stół" },
  { image: breakfastPhoto, title: "Śniadanie" },
  { image: readingPhoto, title: "Wspólne czytanie" },
]

/**
 * Galeria zdjęć — spiralna karuzela z ziarnem (WebGL2, `ui/dither-helix-carousel`).
 * Przeciągnij pionowo albo przewiń kółkiem, żeby obrócić kolumnę; dotknij
 * zdjęcia, żeby przenieść je na wprost. Bez wsparcia WebGL2 komponent sam
 * spada do zwykłej, przewijanej listy (patrz jego kod).
 */
export function PhotoTiles() {
  return (
    <section className="px-0 py-3">
      <DitherHelixCarousel
        items={items}
        accent="#b8552f"
        className="h-[78svh] w-full"
      />
    </section>
  )
}
