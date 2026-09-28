import { event, venue } from "../config/site"
import "./IntroPoster.css"

/**
 * Ekran powitalny. Animowane wejście liter/cyfr + narysowana, machająca
 * postać. Statyczny stan końcowy jest w pełni czytelny (bez ruchu), więc
 * strona ma sens także przy prefers-reduced-motion lub jeśli JS/CSS
 * animacje zostaną wyłączone.
 */
export function IntroPoster() {
  return (
    <section className="relative flex min-h-svh flex-col px-6 pb-8 pt-[calc(env(safe-area-inset-top,0px)+28px)]">
      <div className="intro-eyebrow flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-terracotta-deep">
        <span>Rodzinny obiad</span>
        <span className="text-muted">{venue.shortName}</span>
      </div>

      <div className="relative mt-2 flex flex-1 flex-col items-center justify-center gap-1 pb-28 text-center">
        <div className="intro-word-top font-display text-[15px] font-bold uppercase tracking-[0.28em] text-muted">
          Zapraszam na
        </div>

        <div className="flex items-end justify-center gap-1">
          <svg className="intro-digit d1" width="86" height="128" viewBox="0 0 86 128" fill="none">
            <path
              d="M60 6 L14 82 H64"
              stroke="var(--color-ink)"
              strokeWidth="16"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
            <path d="M64 6 V122" stroke="var(--color-ink)" strokeWidth="16" strokeLinecap="square" />
          </svg>
          <svg className="intro-digit d2" width="60" height="128" viewBox="0 0 60 128" fill="none">
            <path
              d="M12 26 L34 6 V122"
              stroke="var(--color-terracotta)"
              strokeWidth="16"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="intro-word-bottom font-display text-[42px] font-extrabold uppercase leading-[0.86] tracking-tight text-ink sm:text-[48px]">
          moje <span className="text-terracotta">urodziny</span>
        </div>

        <div className="intro-rule mt-3 h-[3px] w-14 rounded-full bg-terracotta" />

        <div className="intro-sub mt-3 max-w-[240px] text-[13.5px] leading-relaxed text-muted">
          {event.dateLabel}, {event.weekdayLabel}, godz. <b className="text-ink">{event.timeLabel}</b>
        </div>

        <WavingCharacter />
      </div>

      <div className="intro-scroll-cue flex flex-col items-center gap-2 text-muted">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Przewiń</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}

function WavingCharacter() {
  return (
    <div className="intro-char-wrap pointer-events-none absolute bottom-2 right-0 h-[150px] w-[118px] sm:right-4">
      <svg viewBox="0 0 120 150" width="100%" height="100%">
        <path
          d="M34 150 L34 96 C34 78 46 68 60 68 C74 68 86 78 86 96 L86 150 Z"
          fill="var(--color-ink)"
        />
        <g fill="var(--color-bg)" opacity=".5">
          <circle cx="46" cy="100" r="1.4" />
          <circle cx="58" cy="112" r="1.6" />
          <circle cx="70" cy="98" r="1.3" />
          <circle cx="52" cy="126" r="1.5" />
          <circle cx="66" cy="130" r="1.3" />
          <circle cx="44" cy="118" r="1.2" />
        </g>
        <path d="M40 82 C30 92 26 104 28 116" stroke="var(--color-ink)" strokeWidth="12" strokeLinecap="round" fill="none" />
        <g className="intro-char-arm">
          <path d="M80 84 C92 78 100 66 100 52" stroke="var(--color-ink)" strokeWidth="12" strokeLinecap="round" fill="none" />
          <circle cx="101" cy="48" r="8" fill="var(--color-ink)" />
        </g>
        <rect x="54" y="58" width="12" height="14" fill="var(--color-ink)" />
        <circle cx="60" cy="42" r="26" fill="#eac7a1" />
        <path
          d="M32 34 C32 18 46 8 60 8 C74 8 88 18 88 34 C88 36 87 37 85 37 L35 37 C33 37 32 36 32 34Z"
          fill="var(--color-khaki-deep)"
        />
        <path d="M58 33 C40 33 30 36 22 40 C20 41 20 44 23 44 L60 40 Z" fill="var(--color-khaki-deep)" />
        <rect x="38" y="40" width="17" height="13" rx="4" fill="none" stroke="var(--color-ink)" strokeWidth="3" />
        <rect x="59" y="40" width="17" height="13" rx="4" fill="none" stroke="var(--color-ink)" strokeWidth="3" />
        <path d="M55 45 H59" stroke="var(--color-ink)" strokeWidth="3" />
        <path d="M46 62 C50 66 70 66 74 62" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M45 58 C50 62 70 62 75 58" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>

      <div className="intro-bubble absolute -top-1 right-1 rounded-xl rounded-br-[2px] border-[1.5px] border-ink bg-paper px-2 py-1 text-[10px] font-bold">
        Cześć! 👋
      </div>
    </div>
  )
}
