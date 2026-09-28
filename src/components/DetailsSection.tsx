import { event, venue } from "../config/site"
import { googleCalendarUrl, openAppleCalendar } from "../lib/calendar"

export function DetailsSection() {
  return (
    <section className="flex flex-col items-center gap-6 px-6 py-14">
      <SectionLabel>Kiedy i gdzie</SectionLabel>

      <div className="flex w-full max-w-md flex-col gap-3 rounded-[24px] border border-line bg-paper p-6">
        <Row
          icon={
            <path d="M8 2v4M16 2v4M3.5 9h17M4 6h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
          }
          title={`${event.dateLabel} · ${event.weekdayLabel}`}
          subtitle={`Start o ${event.timeLabel} · ${event.durationLabel.replace("ok. ", "ok. ")}`}
        />
        <div className="h-px bg-line" />
        <Row
          icon={<path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />}
          title={venue.name}
          subtitle="Rodzinny obiad, 10 dorosłych + 2 dzieci"
        />

        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={openAppleCalendar}
            className="flex items-center justify-center gap-2 rounded-[13px] border border-line bg-bg px-3 py-3 text-[13px] font-bold text-ink transition-transform active:scale-[0.98]"
          >
            <AppleIcon />
            Apple
          </button>
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-[13px] border border-line bg-bg px-3 py-3 text-[13px] font-bold text-ink transition-transform active:scale-[0.98]"
          >
            <GoogleIcon />
            Android / Google
          </a>
        </div>
        <p className="text-center text-[11.5px] text-muted">Dodaj do kalendarza, żeby nie zapomnieć</p>
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-terracotta-deep">
      {children}
    </div>
  )
}

function Row({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-khaki/40">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-terracotta-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[14px] font-bold text-ink">{title}</span>
        <span className="text-[12px] text-muted">{subtitle}</span>
      </div>
    </div>
  )
}

function AppleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.85Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.85C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  )
}
