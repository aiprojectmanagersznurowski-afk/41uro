import { IntroPoster } from "./components/IntroPoster"
import { StreetReveal } from "./components/StreetReveal"
import { DetailsSection } from "./components/DetailsSection"
import { DirectionsSection } from "./components/DirectionsSection"
import { KidsSection } from "./components/KidsSection"
import { PhotoTiles } from "./components/PhotoTiles"
import { RsvpSection } from "./components/RsvpSection"
import { Footer } from "./components/Footer"
import { BackgroundAudio } from "./components/BackgroundAudio"

function App() {
  return (
    <main className="mx-auto min-h-svh max-w-lg bg-bg">
      <BackgroundAudio />
      <IntroPoster />
      <StreetReveal />
      <DetailsSection />
      <DirectionsSection />
      <KidsSection />
      <PhotoTiles />
      <RsvpSection />
      <Footer />
    </main>
  )
}

export default App
