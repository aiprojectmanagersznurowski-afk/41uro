import { IntroPoster } from "./components/IntroPoster"
import { PhotoReveal } from "./components/PhotoReveal"
import { MomentsSection } from "./components/MomentsSection"
import { DetailsSection } from "./components/DetailsSection"
import { DirectionsSection } from "./components/DirectionsSection"
import { KidsSection } from "./components/KidsSection"
import { RsvpSection } from "./components/RsvpSection"
import { Footer } from "./components/Footer"
import { BackgroundAudio } from "./components/BackgroundAudio"

function App() {
  return (
    <main className="mx-auto min-h-svh max-w-lg bg-bg">
      <BackgroundAudio />
      <IntroPoster />
      <PhotoReveal />
      <MomentsSection />
      <DetailsSection />
      <DirectionsSection />
      <KidsSection />
      <RsvpSection />
      <Footer />
    </main>
  )
}

export default App
