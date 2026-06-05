import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, BookOpen, Layers } from "lucide-react";
import { BlogPost, Project } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { loadMarkdownPosts } from "@/pages/blog";

const SLIDE_REST_DURATION_MS = 3500;
const TRANSITION_SPEED = 0.08;
const CARD_GAP = 24;

export default function WorkAndInsights({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ── 1. PARSE LOCAL MARKDOWN INSTANCES ONCE UPON RUNTIME BOOT ──
  const [posts] = useState<BlogPost[]>(() => loadMarkdownPosts());
  const [activeTab, setActiveTab] = useState<"work" | "blog">("work");
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const currentSlideIndex = useRef(0);
  const lastStateTime = useRef(performance.now());
  const isTransitioning = useRef(false);
  const targetScrollLeft = useRef(0);

  // Isolate current active theme data layout matrix
  const activeDataset = activeTab === "work" ? projects : posts;

  // Reset slider layout positions when switching tabs
  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollLeft = 0;
    currentSlideIndex.current = 0;
    targetScrollLeft.current = 0;
    isTransitioning.current = false;
    lastStateTime.current = performance.now();
  }, [activeTab]);

  // ── 2. INDEPENDENT FIXED STEP DRIVEN AUTO-SCROLLER ENGINE ──
  useEffect(() => {
    const container = containerRef.current;

    // Guard: Only run auto-scroll mechanics if there are enough items to loop (3 or more)
    if (!container || activeDataset.length === 0 || activeDataset.length < 3)
      return;

    let animationFrameId: number;

    const steppedScrollLoop = (currentTime: number) => {
      const halfWidth = container.scrollWidth / 2;

      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
        const cardElements = container.children;
        if (cardElements.length > 0) {
          const cardWidth =
            (cardElements[0] as HTMLElement).offsetWidth + CARD_GAP;
          currentSlideIndex.current = Math.floor(
            container.scrollLeft / cardWidth,
          );
          targetScrollLeft.current = currentSlideIndex.current * cardWidth;
        }
      }

      if (!isPaused && !isDragging.current && !isInteracting) {
        if (!isTransitioning.current) {
          if (currentTime - lastStateTime.current >= SLIDE_REST_DURATION_MS) {
            const cardElements = container.children;
            if (cardElements.length > 0) {
              const cardWidth =
                (cardElements[0] as HTMLElement).offsetWidth + CARD_GAP;
              currentSlideIndex.current += 1;
              targetScrollLeft.current = currentSlideIndex.current * cardWidth;
              isTransitioning.current = true;
            }
          }
        } else {
          const distanceLeft = targetScrollLeft.current - container.scrollLeft;
          container.scrollLeft += distanceLeft * TRANSITION_SPEED;

          if (Math.abs(targetScrollLeft.current - container.scrollLeft) < 0.5) {
            container.scrollLeft = targetScrollLeft.current;
            isTransitioning.current = false;
            lastStateTime.current = currentTime;
          }
        }
      } else {
        lastStateTime.current = currentTime;
      }

      animationFrameId = requestAnimationFrame(steppedScrollLoop);
    };

    animationFrameId = requestAnimationFrame(steppedScrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isInteracting, activeDataset]);

  // ── 3. INTERACTION EVENT MAPPINGS ──
  const handleScrollAndSeamReset = () => {
    const container = containerRef.current;
    if (!container || activeDataset.length < 3) return;

    if (isInteracting || isDragging.current) {
      const halfWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += halfWidth;
      }

      const cardElements = container.children;
      if (cardElements.length > 0) {
        const cardWidth =
          (cardElements[0] as HTMLElement).offsetWidth + CARD_GAP;
        currentSlideIndex.current = Math.round(
          container.scrollLeft / cardWidth,
        );
        targetScrollLeft.current = currentSlideIndex.current * cardWidth;
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    isDragging.current = true;
    setIsPaused(true);
    setIsInteracting(true);
    isTransitioning.current = false;

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

  const handleInteractionEnd = () => {
    isDragging.current = false;
    setIsPaused(false);
    setIsInteracting(false);
    lastStateTime.current = performance.now();
  };

  if (activeDataset.length === 0) return null;

  const duplicatedDataset =
    activeDataset.length >= 3
      ? [...activeDataset, ...activeDataset]
      : activeDataset;

  return (
    <section
      id="portfolio"
      className="border-t border-border/60 scroll-mt-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* THEME HEADER BLOCK WITH TAB TOGGLE */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4">
              Insights &
              <br />
              Deployments
            </h2>

            {/* Native Structural Tab Controls */}
            <div className="inline-flex rounded-xl bg-secondary/30 p-1 border border-border/60">
              <button
                onClick={() => setActiveTab("work")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                  activeTab === "work"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="size-3.5" />
                Projects ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab("blog")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                  activeTab === "blog"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="size-3.5" />
                Articles ({posts.length})
              </button>
            </div>
          </div>
        </div>

        {/* TRACK MAIN LAYOUT WINDOW */}
        <div className="relative w-full overflow-hidden">
          {((projects.length > 3 && activeTab === "work") ||
            (posts.length > 3 && activeTab === "blog")) && (
            <>
              <div className="absolute left-0 hidden md:inline top-0 bottom-0 w-6 bg-linear-to-r from-background to-transparent z-20 pointer-events-none" />
              <div className="absolute right-0 hidden md:inline top-0 bottom-0 w-6 bg-linear-to-l from-background to-transparent z-20 pointer-events-none" />
            </>
          )}

          <div
            ref={containerRef}
            onScroll={handleScrollAndSeamReset}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={() => {
              setIsPaused(true);
              setIsInteracting(true);
              isTransitioning.current = false;
            }}
            onTouchEnd={handleInteractionEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleInteractionEnd}
            className={`
              flex gap-6 pb-4 scrollbar-none relative z-10
              select-none cursor-grab active:cursor-grabbing overflow-x-auto touch-pan-x
              ${isInteracting && activeDataset.length >= 3 ? "snap-x snap-mandatory" : ""}
            `}
          >
            {duplicatedDataset.map((item, idx) => {
              const isBlogItem = "slug" in item;
              const blogPost = item as BlogPost;

              const redirectUrl = isBlogItem
                ? `/blog/${blogPost.slug}`
                : (item as Project).url;

              function executeNavigation() {
                if (isDragging.current) return;
                if (redirectUrl) {
                  if (isBlogItem) {
                    navigate(redirectUrl);
                  } else {
                    window.open(redirectUrl, "_blank");
                  }
                }
              }

              return (
                <article
                  key={`carousel-item-${activeTab}-${idx}`}
                  onClick={executeNavigation}
                  className={`
                    ${redirectUrl ? "cursor-pointer" : ""}
                    group relative overflow-hidden rounded-2xl border border-border bg-card
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-md
                    flex flex-col justify-between shrink-0
                    snap-center snap-always
                    w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-87.5
                  `}
                >
                  {/* TOP BLOCK IMAGE WINDOW FOR BLOG PREVIEWS */}
                  {isBlogItem && (
                    <div className="relative w-full h-40 bg-muted/40 overflow-hidden border-b border-border/50 pointer-events-none">
                      {blogPost.coverImage ? (
                        <img
                          src={blogPost.coverImage}
                          alt={blogPost.title}
                          className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-secondary/20 to-transparent flex items-center justify-center">
                          <BookOpen className="size-6 text-muted-foreground/10" />
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className={`absolute -top-20 -right-20 size-64 rounded-full bg-linear-to-br ${item.gradient || "from-primary/10 to-transparent"} blur-3xl opacity-40 pointer-events-none group-hover:opacity-60 transition-opacity duration-500`}
                  />

                  {/* TYPOGRAPHY AND TAGS PADDED WRAPPER CONTAINER */}
                  <div className="p-6 relative flex flex-col grow justify-between h-full z-10 pointer-events-none">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold bg-secondary/20 px-2 py-0.5 rounded-md border border-border/40">
                          {item.kind}
                        </span>

                        {isBlogItem ? (
                          <span className="text-[10px] tracking-tight font-medium text-muted-foreground/80">
                            {blogPost.date}
                          </span>
                        ) : (
                          (item as Project).url && (
                            <div className="rounded-full p-1 bg-secondary/50 text-muted-foreground group-hover:text-foreground group-hover:bg-secondary transition-all duration-300">
                              <ArrowUpRight className="size-4" />
                            </div>
                          )
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {!isBlogItem && (item as Project).logo && (
                          <img
                            src={(item as Project).logo}
                            alt={`${item.title} logo`}
                            className="object-cover rounded-md w-8 h-8 border border-border/40 bg-background"
                            loading="lazy"
                          />
                        )}
                        <h3 className="text-xl font-bold tracking-tight text-foreground line-clamp-2">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {item.blurb}
                      </p>
                    </div>

                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2.5 py-0.5 rounded-full border border-border bg-background/60 text-muted-foreground font-medium"
                          >
                            {t}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-[10px] text-muted-foreground/60 px-1 font-medium">
                            +{item.tags.length - 3}
                          </span>
                        )}
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
