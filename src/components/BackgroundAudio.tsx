import { useEffect, useRef, useState } from "react"
import { music } from "../config/site"

// Utwór ma długie, ciche intro — gramy od tego miejsca, nie od 0:00.
const START_OFFSET = 7

/**
 * Muzyka w tle, bez widocznego playera. Przeglądarki blokują autoplay
 * dźwięku dopóki użytkownik nie wejdzie w interakcję ze stroną — próbujemy
 * odtworzyć od razu, a jeśli przeglądarka to zablokuje, cichy nasłuch
 * pierwszego dotknięcia/kliknięcia/scrolla uruchamia utwór. Jedyny widoczny
 * ślad to mały, opcjonalny przycik wyciszenia w rogu — bez tego gość nie
 * miałby jak zatrzymać dźwięku.
 *
 * Pętla jest ręczna (bez atrybutu `loop`), żeby po każdym powtórzeniu wracać
 * do START_OFFSET zamiast do 0:00 — inaczej gość usłyszałby pominięte intro
 * ponownie przy każdym zapętleniu.
 */
export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.55

    const seekToStart = () => {
      if (audio.currentTime < START_OFFSET || audio.ended) {
        audio.currentTime = START_OFFSET
      }
    }

    const tryPlay = () => {
      seekToStart()
      audio
        .play()
        .then(() => setStarted(true))
        .catch(() => {
          // Autoplay zablokowany — poczekamy na pierwszą interakcję.
        })
    }

    const onLoadedMeta = () => seekToStart()
    const onEnded = () => {
      audio.currentTime = START_OFFSET
      audio.play().catch(() => {})
    }
    audio.addEventListener("loadedmetadata", onLoadedMeta)
    audio.addEventListener("ended", onEnded)

    tryPlay()

    const onFirstInteraction = () => {
      if (!audio.paused) return
      tryPlay()
    }

    const events: (keyof WindowEventMap)[] = ["pointerdown", "touchstart", "scroll", "keydown"]
    events.forEach((ev) => window.addEventListener(ev, onFirstInteraction, { once: true, passive: true }))

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMeta)
      audio.removeEventListener("ended", onEnded)
      events.forEach((ev) => window.removeEventListener(ev, onFirstInteraction))
    }
  }, [])

  function toggleMute() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      if (audio.currentTime < START_OFFSET || audio.ended) audio.currentTime = START_OFFSET
      audio.play().then(() => setStarted(true)).catch(() => {})
      audio.muted = false
      setMuted(false)
      return
    }
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  return (
    <>
      <audio ref={audioRef} src={music.src} preload="auto" />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted || !started ? "Włącz muzykę" : "Wycisz muzykę"}
        className="fixed bottom-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper/80 text-ink shadow-sm backdrop-blur transition-transform active:scale-90"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {muted || !started ? <MutedIcon /> : <SoundIcon />}
      </button>
    </>
  )
}

function SoundIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M16 8a5 5 0 0 1 0 8" />
      <path d="M19 5a9 9 0 0 1 0 14" />
    </svg>
  )
}

function MutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="m23 9-6 6" />
      <path d="m17 9 6 6" />
    </svg>
  )
}
