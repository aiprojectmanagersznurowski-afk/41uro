import { event, venue } from "../config/site"
import portrait from "../assets/portrait.jpg"
import "./IntroPoster.css"

/**
 * Ekran powitalny. Zdjęcie jest celowo skromne — małe, z miękką maską
 * rozpływającą się w tło, umieszczone NAD tytułem. Najważniejszy jest
 * tytuł ("Urodziny Michała"); zdjęcie tylko pokazuje, kto zaprasza, i nie
 * ma przyciągać uwagi bardziej niż napis.
 */
export function IntroPoster() {
  return (
    <section className="relative flex min-h-svh flex-col px-6 pb-8 pt-[calc(env(safe-area-inset-top,0px)+28px)]">
      <div className="intro-eyebrow flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-terracotta-deep">
        <span>Rodzinny obiad</span>
        <span className="text-muted">{venue.shortName}</span>
      </div>

      <div className="relative mt-2 flex flex-1 flex-col items-center justify-center gap-1 text-center">
        <div className="intro-portrait-wrap relative mb-3 h-[152px] w-[132px]">
          <div className="intro-portrait-glow absolute inset-0" aria-hidden="true" />
          <img src={portrait} alt="Michał" className="intro-portrait-img relative h-full w-full object-cover" />
        </div>

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
          urodziny <span className="text-terracotta">michała</span>
        </div>

        <div className="intro-rule mt-3 h-[3px] w-14 rounded-full bg-terracotta" />

        <div className="intro-sub mt-3 max-w-[240px] text-[13.5px] leading-relaxed text-muted">
          {event.dateLabel}, {event.weekdayLabel}, godz. <b className="text-ink">{event.timeLabel}</b>
        </div>
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
