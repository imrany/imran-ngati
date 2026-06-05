import { useState, useRef, useEffect } from "react";
import { BlogPost } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { loadMarkdownPosts } from "@/pages/blog";
import { Calendar, ArrowUpRight } from "lucide-react";
import PostImage from "./PostImage";

export default function Insights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [posts] = useState<BlogPost[]>(() => loadMarkdownPosts());
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () =>
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const getBackground = (post: BlogPost) => {
    if (!post.customBackground) return null;
    return Array.isArray(post.customBackground)
      ? isDarkMode
        ? post.customBackground[1]
        : post.customBackground[0]
      : post.customBackground;
  };

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const currentSlideIndex = useRef(0);
  const lastStateTime = useRef(performance.now());
  const isTransitioning = useRef(false);
  const targetScrollLeft = useRef(0);

  // Auto-scroll loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.5; // Adjust this for desired scroll speed

    const animate = () => {
      if (!isPaused && !isDragging.current && !isInteracting) {
        container.scrollLeft += speed;

        // Seamless reset
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isInteracting]);

  // Mouse/Touch Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsInteracting(true);
    startX.current = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeftStart.current = containerRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (containerRef.current)
      containerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsInteracting(false);
    lastStateTime.current = performance.now();
  };

  if (posts.length === 0) return null;
  const duplicatedPosts = posts.length >= 3 ? [...posts, ...posts] : posts;
  return (
    <section
      id="insights"
      className="border-t border-border/60 scroll-mt-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-8">
          Insights &
          <br />
          Articles
        </h2>

        <div className="relative w-full overflow-hidden">
          <div
            ref={containerRef}
            className="flex gap-6 pb-4 scrollbar-none relative z-10 select-none cursor-grab active:cursor-grabbing overflow-x-auto touch-pan-x"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              isDragging.current = false;
              setIsPaused(false);
              setIsInteracting(false);
              lastStateTime.current = performance.now();
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {duplicatedPosts.map((post, idx) => {
              const dynamicBg = getBackground(post);
              return (
                <article
                  key={`${post.slug}-${idx}`}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  style={{ backgroundColor: dynamicBg || undefined }}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between h-full w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-87.5 shrink-0 ${
                    dynamicBg ? "border-transparent" : "border-border bg-card"
                  }`}
                >
                  <div className="relative w-full h-48 bg-muted/40 overflow-hidden border-b border-border/50">
                    <PostImage src={post.coverImage} alt={post.title} />
                    <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-primary font-bold bg-background/90 mix-blend-difference px-2 py-0.5 rounded-sm backdrop-blur-xs">
                      {post.kind}
                    </span>
                  </div>

                  <div className="p-6 relative flex flex-col grow justify-between z-10 w-full">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] tracking-tight text-muted-foreground/80 flex items-center gap-1">
                          <Calendar className="size-3" /> {post.date}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60">
                          {post.readTime}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                      <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {post.blurb}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between w-full">
                      <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {post.tags?.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded-sm bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-muted-foreground font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 group-hover:text-foreground transition-colors shrink-0">
                        Read <ArrowUpRight className="size-3" />
                      </span>
                    </div>
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
