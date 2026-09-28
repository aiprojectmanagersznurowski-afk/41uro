import { useEffect, useRef, useState } from "react"
import { music } from "../config/site"

function formatTime(sec: number) {
  if (!Number.isFinite(sec)) return "0:00"
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

/**
 * Lekki, własny odtwarzacz mp3 — bez zależności od tego, czy gość ma
 * Spotify. Plik audio ładuje się dopiero po pierwszym kliknięciu Play
 * (preload="none"), więc nie obciąża pierwszego wejścia na stronę.
 */
export function MusicSection() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrent(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onEnd = () => setPlaying(false)
    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("loadedmetadata", onMeta)
    audio.addEventListener("ended", onEnd)
    return () => {
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("loadedmetadata", onMeta)
      audio.removeEventListener("ended", onEnd)
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current
    if (!audio) return
    const t = Number(e.target.value)
    audio.currentTime = t
    setCurrent(t)
  }

  const progress = duration ? (current / duration) * 100 : 0

  return (
    <section className="flex flex-col items-center px-6 py-8">
      <div className="flex w-full max-w-md items-center gap-4 rounded-[20px] border border-line bg-paper px-5 py-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Zatrzymaj" : "Odtwórz"}
          className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-terracotta text-white transition-transform active:scale-[0.94]"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[13.5px] font-bold text-ink">
              {music.title} <span className="font-medium text-muted">· {music.artist}</span>
            </span>
            <span className="flex-none font-mono text-[11px] tabular-nums text-muted">
              {formatTime(current)} / {duration ? formatTime(duration) : "…"}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={duration || 0}
            value={current}
            onChange={seek}
            className="track-slider h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-terracotta"
            style={{
              background: `linear-gradient(to right, var(--color-terracotta) ${progress}%, var(--color-line) ${progress}%)`,
            }}
            aria-label="Pozycja w utworze"
          />
        </div>
      </div>

      <audio ref={audioRef} src={music.src} preload="none" />
    </section>
  )
}

function PlayIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5.5v13a1 1 0 0 0 1.53.85l10.5-6.5a1 1 0 0 0 0-1.7l-10.5-6.5A1 1 0 0 0 7 5.5Z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5Zm7 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5Z" />
    </svg>
  )
}
