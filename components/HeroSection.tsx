interface HeroSectionProps {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readingTime: number;
}

export default function HeroSection({
  title,
  subtitle,
  author,
  date,
  readingTime,
}: HeroSectionProps) {
  return (
    <header className="relative py-16 md:py-24 px-6 text-center overflow-hidden">
      {/* Subtle parchment texture background */}
      <div className="absolute inset-0 bg-gradient-to-b from-parchment-dark/60 via-parchment to-parchment" />

      {/* Decorative top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative max-w-3xl mx-auto">
        {/* Top ornament */}
        <div className="animate-fade-in-up mb-8">
          <span className="text-gold text-sm tracking-[0.4em] font-[family-name:var(--font-ui)] uppercase">
            Báo cáo Phân tích
          </span>
        </div>

        {/* Title */}
        <h1
          className="animate-fade-in-up-delay-1 font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-charcoal mb-6"
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up-delay-2 font-[family-name:var(--font-body)] text-lg md:text-xl text-charcoal-light/80 italic leading-relaxed max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>

        {/* Cross ornament */}
        <div className="hero-ornament animate-fade-in-up-delay-2">
          ✝
        </div>

        {/* Metadata */}
        <div className="animate-fade-in-up-delay-3 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm font-[family-name:var(--font-ui)]">
          {/* Author */}
          <div className="flex items-center gap-2 text-warm-gray">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="opacity-60"
            >
              <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span>{author}</span>
          </div>

          <span className="text-border-light">|</span>

          {/* Date */}
          <div className="flex items-center gap-2 text-warm-gray">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="opacity-60"
            >
              <rect
                x="2"
                y="3"
                width="12"
                height="11"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M5 1.5v3M11 1.5v3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <time dateTime={date}>{date}</time>
          </div>

          <span className="text-border-light">|</span>

          {/* Reading time badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cardinal/8 text-cardinal rounded-full text-xs font-medium">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span>{readingTime} phút đọc</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-parchment to-transparent" />
    </header>
  );
}
