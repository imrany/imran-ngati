import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Project = {
  url?: string;
  title: string;
  kind: string;
  logo?: string;
  tags?: string[];
  blurb: string;
  gradient?: string;
};

export default function Work({ projects }: { projects: Project[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // ── AUTO SCROLL LOGIC ──
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || projects.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      const cardWidth = container.firstElementChild?.clientWidth || 0;
      const gap = 24; // Equivalent to gap-6
      const step = cardWidth + gap;

      // Calculate next scroll metrics
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      // If we are at the end, smoothly loop back to start
      if (currentScroll >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        setActiveIndex(0);
      } else {
        container.scrollBy({ left: step, behavior: "smooth" });
        // Estimate next dot index based on positioning
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }
    }, 3500); // Changes slides every 3.5 seconds

    return () => clearInterval(interval);
  }, [projects.length, isPaused]);

  // ── SYNC DOT INDICATORS ON MANUAL SCROLL ──
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild?.clientWidth || 0;
    const gap = 24;
    const step = cardWidth + gap;

    if (step > 0) {
      const newIndex = Math.round(container.scrollLeft / step);
      if (newIndex !== activeIndex && newIndex < projects.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <section id="work" className="border-t border-border/60 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter">
            Projects that
            <br />
            ship & scale
          </h2>

          <span className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-muted-foreground bg-secondary/40 border border-border px-3 py-1.5 rounded-full">
            Swipe or Scroll to Explore →
          </span>
        </div>

        {/* ── CAROUSEL CONTAINER ── */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
        >
          {projects.map((p) => {
            function openURL() {
              if (p.url) window.open(p.url, "_blank");
            }
            return (
              <article
                key={p.title}
                onClick={openURL}
                className={`
                  ${p.url ? "cursor-pointer" : ""}
                  group relative overflow-hidden rounded-2xl border border-border bg-card p-6
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-md
                  flex flex-col justify-between shrink-0 snap-start
                  w-[85vw] sm:w-[60vw] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]
                `}
              >
                {/* Accent Background Ambient Glow */}
                <div
                  className={`absolute -top-20 -right-20 size-64 rounded-full bg-linear-to-br ${p.gradient} blur-3xl opacity-60 pointer-events-none group-hover:opacity-80 transition-opacity duration-500`}
                />

                <div className="relative flex flex-col h-full justify-between z-10">
                  <div>
                    {/* Card Meta Header */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                        {p.kind}
                      </span>
                      {p.url && (
                        <div className="rounded-full p-1 bg-secondary/50 text-muted-foreground group-hover:text-foreground group-hover:bg-secondary transition-all duration-300">
                          <ArrowUpRight className="size-4" />
                        </div>
                      )}
                    </div>

                    {/* Brand Identity & Title */}
                    <div className="flex items-center gap-3">
                      {p.logo && (
                        <img
                          src={p.logo}
                          alt={`${p.title} logo`}
                          className="object-cover rounded-md w-8 h-8 border border-border/40 bg-background"
                          loading="lazy"
                        />
                      )}
                      <h3 className="text-xl font-bold tracking-tight text-foreground">
                        {p.title}
                      </h3>
                    </div>

                    {/* Project Description Blurb */}
                    <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {p.blurb}
                    </p>
                  </div>

                  {/* Feature Stack Tags */}
                  {p.tags && (
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2.5 py-0.5 rounded-full border border-border bg-background/60 text-muted-foreground font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* ── DOT INDICATORS (Now Reactive to Auto & Manual Scrolling) ── */}
        <div className="flex justify-center gap-1.5 mt-6">
          {projects.map((p, idx) => (
            <button
              key={`dot-${p.title}`}
              onClick={() => {
                const container = scrollContainerRef.current;
                if (!container) return;
                const cardWidth = container.firstElementChild?.clientWidth || 0;
                const step = cardWidth + 24;
                container.scrollTo({ left: idx * step, behavior: "smooth" });
                setActiveIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-border hover:bg-muted-foreground/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
