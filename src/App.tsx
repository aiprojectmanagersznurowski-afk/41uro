import { IntroPoster } from "./components/IntroPoster"
import { PhotoReveal } from "./components/PhotoReveal"
import { DetailsSection } from "./components/DetailsSection"
import { DirectionsSection } from "./components/DirectionsSection"
import { KidsSection } from "./components/KidsSection"
import { MusicSection } from "./components/MusicSection"
import { RsvpSection } from "./components/RsvpSection"
import { Footer } from "./components/Footer"

function App() {
  return (
    <main className="mx-auto min-h-svh max-w-lg bg-bg">
      <IntroPoster />
      <PhotoReveal />
      <DetailsSection />
      <DirectionsSection />
      <KidsSection />
      <MusicSection />
      <RsvpSection />
      <Footer />
    </main>
  )
}

export default App
