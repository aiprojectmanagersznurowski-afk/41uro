import { useState } from "react"
import { music } from "../config/site"

export function MusicSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="flex flex-col items-center px-6 py-8">
      <div className="w-full max-w-md overflow-hidden rounded-[20px] border border-line bg-paper">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
          aria-expanded={open}
        >
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-terracotta/10 text-terracotta-deep">
              <NoteIcon />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[14px] font-bold text-ink">Muzyka na ten dzień</span>
              <span className="text-[12px] text-muted">Puść, jeśli masz ochotę</span>
            </span>
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-muted)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-none transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-3 pb-3">
              <iframe
                title="Odtwarzacz Spotify"
                src={music.embedSrc}
                width="100%"
                height="152"
                style={{ borderRadius: 14, border: "none", display: "block" }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  )
}
