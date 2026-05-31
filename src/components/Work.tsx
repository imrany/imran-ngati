import { useState } from "react";
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
  const [isPaused, setIsPaused] = useState(false);

  if (projects.length === 0) return null;

  // Duplicate the items once to create the infinite matching seam
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section
      id="work"
      className="border-t border-border/60 scroll-mt-20 overflow-hidden"
    >
      {/* Seamless horizontal sliding marquee engine */}
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Moves exactly half the width of the track (one full array length) */
            transform: translateX(calc(-50% - 12px));
          }
        }
        .animate-marquee {
          animation: marquee-scroll 100s linear infinite;
        }
        .marquee-paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter">
            Projects that
            <br />
            ship & scale
          </h2>

          <span className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-muted-foreground bg-secondary/40 border border-border px-3 py-1.5 rounded-full">
            Hover to Pause
          </span>
        </div>

        {/* ── SEAMLESS CAROUSEL TRACK ── */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Faded Left & Right Edge Vignettes for depth */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-background to-transparent z-20 pointer-events-none" />

          <div
            className={`flex gap-6 w-max pb-4 animate-marquee ${
              isPaused ? "marquee-paused" : ""
            }`}
          >
            {duplicatedProjects.map((p, idx) => {
              function openURL() {
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
                    /* Explicit responsive sizing anchors */
                    w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-87.5
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
        </div>
      </div>
    </section>
  );
}
