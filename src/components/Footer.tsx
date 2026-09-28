import { venue } from "../config/site"

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 px-6 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-10 text-center">
      <a
        href={venue.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[12.5px] font-semibold text-muted underline underline-offset-2"
      >
        {venue.name} →
      </a>
      <p className="mt-3 font-display text-[13px] uppercase tracking-[0.2em] text-muted">Do zobaczenia</p>
    </footer>
  )
}
