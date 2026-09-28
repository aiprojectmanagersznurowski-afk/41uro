import { kids } from "../config/site"

export function KidsSection() {
  return (
    <section className="flex flex-col items-center px-6 py-8">
      <div className="flex w-full max-w-md items-start gap-4 rounded-[20px] bg-khaki/35 p-5">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-khaki-deep/50 text-lg">
          🧸
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[14px] font-bold text-ink">Dla najmłodszych</span>
          <p className="text-[13px] leading-relaxed text-ink/80">{kids.text}</p>
          <a
            href={kids.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 w-fit text-[12.5px] font-bold text-terracotta-deep underline underline-offset-2"
          >
            Zobacz kącik dla dzieci →
          </a>
        </div>
      </div>
    </section>
  )
}
