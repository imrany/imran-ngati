import { useState, useRef, useEffect } from "react";
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

// ── CUSTOMIZABLE TIMING DELAY (2000ms = 2 Seconds) ──
const RESUME_DELAY_MS = 2000;

export default function Work({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null); // References our active delay timer

  // ── 1. INITIALIZE ALL HOOKS UNCONDITIONALLY AT THE TOP ──
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Clean up timers if component unmounts mid-delay
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // ── 2. SUB-PIXEL AUTO-SCROLL LOOP ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scrollLoop = () => {
      // Only auto-scroll if the user isn't actively touching, dragging, hovering, or waiting out the delay
      if (!isPaused && !isDragging.current && !isInteracting) {
        container.scrollLeft += 0.8;

        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isInteracting]);

  // ── 3. INTERACTION EVENT HANDLERS ──

  const handleScrollAndSeamReset = () => {
    const container = containerRef.current;
    if (!container) return;

    const halfWidth = container.scrollWidth / 2;
    if (container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += halfWidth;
    }
  };

  // Helper function to freeze layout instantly upon user contact
  const clearResumeTimerAndPause = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    setIsPaused(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    clearResumeTimerAndPause();
    isDragging.current = true;
    setIsInteracting(true);

    startX.current = e.pageX - container.offsetLeft;
    scrollLeftStart.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walkDistance = (x - startX.current) * 1.5;
    container.scrollLeft = scrollLeftStart.current - walkDistance;
  };

  // ── THE HANDSHAKE DELAY LOGIC ──
  const handleInteractionEnd = () => {
    isDragging.current = false;

    // Clear any previous stray timeouts before generating a new one
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    // Queue up the auto-scroll release state engine
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      setIsInteracting(false);
    }, RESUME_DELAY_MS);
  };

  // ── 4. SAFE EARLY RETURN (Placed AFTER all hooks run) ──
  if (projects.length === 0) return null;

  const duplicatedProjects = [...projects, ...projects];

  return (
    <section
      id="work"
      className="border-t border-border/60 scroll-mt-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter">
            Projects that
            <br />
            ship & scale
          </h2>
          <span className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-muted-foreground bg-secondary/40 border border-border px-3 py-1.5 rounded-full">
            Drag or Swipe to explore
          </span>
        </div>

        {/* ── PARENT VIEWPORT WRAPPER ── */}
        <div className="relative w-full overflow-hidden">
          {/* Edge Vignette Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* ── UNIFIED CAROUSEL TRACK ── */}
          <div
            ref={containerRef}
            onScroll={handleScrollAndSeamReset}
            onMouseEnter={clearResumeTimerAndPause}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={() => {
              clearResumeTimerAndPause();
              setIsInteracting(true);
            }}
            onTouchEnd={handleInteractionEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleInteractionEnd}
            className={`
              flex gap-6 pb-4 scrollbar-none relative z-10
              select-none cursor-grab active:cursor-grabbing overflow-x-auto touch-pan-x
              ${isInteracting ? "snap-x snap-mandatory" : ""}
            `}
          >
            {duplicatedProjects.map((p, idx) => {
              function openURL() {
                if (isDragging.current) return;
                if (p.url) window.open(p.url, "_blank");
              }

              return (
                <article
                  key={`marquee-item-${idx}`}
                  onClick={openURL}
                  className={`
                    ${p.url ? "cursor-pointer" : ""}
                    group relative overflow-hidden rounded-2xl border border-border bg-card p-6
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-md
                    flex flex-col justify-between shrink-0
                    snap-center snap-always
                    w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-87.5
                  `}
                >
                  <div
                    className={`absolute -top-20 -right-20 size-64 rounded-full bg-linear-to-br ${p.gradient} blur-3xl opacity-60 pointer-events-none group-hover:opacity-80 transition-opacity duration-500`}
                  />

                  <div className="relative flex flex-col h-full justify-between z-10 pointer-events-none">
                    <div>
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

                      <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {p.blurb}
                      </p>
                    </div>

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
        </div>
      </div>
    </section>
  );
}
