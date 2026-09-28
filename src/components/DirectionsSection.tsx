import { parking, venue } from "../config/site"
import { directionsUrl } from "../lib/maps"

export function DirectionsSection() {
  return (
    <section className="flex flex-col items-center gap-5 px-6 py-14">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-terracotta-deep">Dojazd</div>

      <div className="flex w-full max-w-md flex-col gap-3">
        <a
          href={directionsUrl(venue.lat, venue.lng)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-[18px] bg-terracotta px-5 py-4 text-white transition-transform active:scale-[0.98]"
        >
          <span className="flex flex-col leading-tight text-left">
            <span className="text-[15px] font-bold">Nawiguj do restauracji</span>
            <span className="text-[12px] text-white/75">{venue.shortName}</span>
          </span>
          <ArrowIcon />
        </a>

        <a
          href={directionsUrl(parking.lat, parking.lng)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-[18px] border border-line bg-paper px-5 py-4 text-ink transition-transform active:scale-[0.98]"
        >
          <span className="flex flex-col leading-tight text-left">
            <span className="text-[15px] font-bold">Nawiguj na parking</span>
            <span className="text-[12px] text-muted">Parking podziemny, Plac Nowy Targ</span>
          </span>
          <ArrowIcon dark />
        </a>

        <p className="px-1 text-[12px] leading-relaxed text-muted">
          Zalecamy parking podziemny przy Placu Nowy Targ — kilka minut spacerem od restauracji.
        </p>
      </div>
    </section>
  )
}

function ArrowIcon({ dark }: { dark?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={dark ? "var(--color-ink)" : "white"}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}
