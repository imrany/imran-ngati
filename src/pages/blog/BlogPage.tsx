import { useParams, Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { marked } from "marked";
import {
  Calendar,
  Clock,
  User,
  ArrowUpRight,
  Share2,
  Mail,
  CheckCircle2,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { BlogPost } from "@/lib/types";
import NotFound from "../NotFound";
import { loadMarkdownPosts } from "./index";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";

interface BlogPageProps {
  gradientBackground?: string;
}

export default function BlogPage({ gradientBackground }: BlogPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const [posts] = useState<BlogPost[]>(() => loadMarkdownPosts());
  const [coverHasError, setCoverHasError] = useState(false);
  const [coverIsLoading, setCoverIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const post = posts.find((p) => p.slug === slug);

  // ── DYNAMIC PAGE-LEVEL GLOBAL BACKGROUND ──
  useEffect(() => {
    if (!post) return;

    let lightBg = "";
    let darkBg = "";

    if (gradientBackground) {
      lightBg = gradientBackground;
      darkBg = gradientBackground;
    } else if (post?.customBackground) {
      if (Array.isArray(post.customBackground)) {
        lightBg = post.customBackground[0] || "";
        darkBg = post.customBackground[1] || post.customBackground[0] || "";
      } else if (typeof post.customBackground === "string") {
        lightBg = post.customBackground;
        darkBg = post.customBackground;
      }
    }

    if (!lightBg && !darkBg) return;

    // Capture in closure so observer always has the right values
    const getBg = () =>
      document.documentElement.classList.contains("dark") ? darkBg : lightBg;

    const applyBg = () => {
      // Pause observer so mutating style doesn't re-trigger it
      observer.disconnect();
      document.documentElement.style.setProperty(
        "background-color",
        getBg(),
        "important",
      );
      document.documentElement.style.transition = "background-color 500ms";
      document.body.style.backgroundColor = "transparent";
      // Resume watching for theme class changes only
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    };

    const observer = new MutationObserver(applyBg);

    applyBg();

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("background-color");
      document.documentElement.style.transition = "";
      document.body.style.backgroundColor = "";
    };
  }, [post, gradientBackground]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ── RELATED INSIGHTS ──
  const relatedPosts = useMemo(() => {
    if (!post) return [];

    // 1. Filter out the current active post immediately
    const otherPosts = posts.filter((p) => p.slug !== post.slug);

    // 2. Score them based on metadata matches
    const scored = otherPosts.map((p) => {
      let score = 0;

      // Protect against undefined values cleanly
      if (post.kind && p.kind === post.kind) score += 5;

      const commonTags = p.tags?.filter((t) => post.tags?.includes(t)) || [];
      score += commonTags.length * 2;

      return { post: p, score };
    });

    // 3. If we have posts with actual matching metadata (score > 0), use them
    const matchingPosts = scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.post);

    if (matchingPosts.length > 0) {
      return matchingPosts.slice(0, 2);
    }

    // 4. Fallback: If no tags or kinds match, return the newest posts instead of nothing
    return otherPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2);
  }, [post, posts]);

  // ── INLINE BODY IMAGE CUSTOM PARSER ──
  const htmlBody = useMemo(() => {
    if (!post) return "";
    const customRenderer = new marked.Renderer();
    customRenderer.image = ({ href, title, text }) => {
      if (!href) return "";
      const urlParts = href.split("?");
      const basePath = urlParts[0];
      const queryString = urlParts[1] || "";
      const params = new URLSearchParams(queryString);
      const customWidth = params.get("width") || "100%";
      const customHeight = params.get("height") || "auto";
      const widthStyle = customWidth.endsWith("%")
        ? customWidth
        : `${customWidth.replace("px", "")}px`;
      const heightStyle =
        customHeight === "auto" || customHeight.endsWith("%")
          ? customHeight
          : `${customHeight.replace("px", "")}px`;

      return `
        <div class="inline-image-container my-6 md:my-8 w-full flex flex-col items-center justify-start">
          <div class="relative rounded-2xl overflow-hidden flex items-center justify-center bg-secondary/30 dark:bg-secondary/10 border border-border/40"
            style="width: ${widthStyle}; height: ${customHeight === "auto" ? "auto" : heightStyle}; max-width: 100%;">
            <div class="absolute inset-0 flex items-center justify-center z-10 spinner-element">
              <svg class="animate-spin h-5 w-5 text-muted-foreground/40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <img src="${basePath}" alt="${text || "Visual asset"}" title="${title || ""}"
              class="object-cover opacity-0 transition-opacity duration-300 z-20 rounded-2xl"
              style="width: 100%; height: ${customHeight === "auto" ? "auto" : "100%"}"
              onload="this.classList.remove('opacity-0'); this.previousElementSibling?.remove();"
              onerror="this.closest('.inline-image-container')?.remove();" />
          </div>
          ${text ? `<span class="mt-2 text-xs text-muted-foreground/80 tracking-tight block text-center px-4">${text}</span>` : ""}
        </div>
      `;
    };
    return marked.parse(post.content, {
      renderer: customRenderer,
      breaks: true,
      gfm: true,
    });
  }, [post]);

  if (!post) return <NotFound />;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#34d399", "#a7f3d0"],
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.blurb,
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasCover = !!post.coverImage && !coverHasError;

  return (
    <main className="min-h-screen pt-4 sm:pt-8 pb-20 sm:pb-32 font-sans selection:bg-primary/20 transition-all duration-500 text-foreground dark:text-slate-100 bg-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs */}
        <div
          className={`flex items-center justify-between mb-6 sm:mb-10 border-b border-border/40 dark:border-border/20 pb-4 gap-4 ${!hasCover ? "max-w-3xl mx-auto" : ""}`}
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-muted-foreground overflow-hidden"
          >
            <Link
              to="/"
              className="hover:text-foreground dark:hover:text-white transition-colors shrink-0"
            >
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
            <Link
              to="/blog"
              className="hover:text-foreground dark:hover:text-white transition-colors shrink-0"
            >
              Blog
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
            <span className="text-foreground dark:text-slate-300 font-extrabold max-w-30 sm:max-w-xs md:max-w-md truncate">
              {post.title}
            </span>
          </nav>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors p-1 cursor-pointer rounded-md px-2 py-1 hover:bg-secondary/40 dark:hover:bg-secondary/20 shrink-0"
          >
            <Share2 className="h-4 w-4" />
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>

        <div
          className={
            hasCover
              ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-y-8 md:gap-x-8 lg:gap-x-12 items-start"
              : "max-w-3xl mx-auto"
          }
        >
          {/* LEFT TRACK */}
          {hasCover && (
            <div className="md:col-span-1 lg:col-span-4 lg:sticky lg:top-12 flex flex-col gap-6 w-full max-w-md md:max-w-none mx-auto">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-secondary/20 dark:bg-secondary/10 border border-border/40 dark:border-border/20 shadow-xs group">
                <div
                  className={`absolute -inset-4 rounded-full bg-linear-to-br ${post.gradient || "from-primary/10 to-transparent"} blur-3xl opacity-60 pointer-events-none group-hover:opacity-80 transition-opacity duration-500`}
                />
                {coverIsLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/60" />
                  </div>
                )}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className={`w-full h-full object-cover relative z-10 transition-transform duration-700 hover:scale-[1.01] ${coverIsLoading ? "opacity-0" : "opacity-100"}`}
                  onLoad={() => setCoverIsLoading(false)}
                  onError={() => {
                    setCoverHasError(true);
                    setCoverIsLoading(false);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 relative z-10 px-1 md:px-0">
                <span className="text-[10px] font-bold text-muted-foreground/50 tracking-wider uppercase">
                  Posted By
                </span>
                <div className="flex items-center gap-3">
                  {post.authorImage ? (
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="h-9 w-9 rounded-full object-cover border border-border/60 dark:border-border/30 bg-background"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-secondary/40 dark:bg-secondary/20 flex items-center justify-center text-muted-foreground border border-border/40">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <h4 className="text-sm font-bold tracking-wide text-foreground/90 dark:text-slate-200">
                    {post.author}
                  </h4>
                </div>
              </div>

              {post.tags && (
                <div className="pt-4 border-t border-border/40 dark:border-border/20 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2.5 py-0.5 rounded-full border border-border bg-background/60 text-muted-foreground font-medium transition-colors hover:bg-secondary/40 dark:hover:bg-secondary/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* RIGHT TRACK */}
          <div
            className={`${hasCover ? "md:col-span-2 lg:col-span-8" : "w-full"} flex flex-col gap-6 relative z-10`}
          >
            {post.kind && (
              <div className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/10 dark:bg-primary/20 px-2.5 py-1 rounded-md border border-primary/20 w-fit backdrop-blur-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Featured in <span className="font-semibold">{post.kind}</span>
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-foreground dark:text-white">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs sm:text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 opacity-70 shrink-0" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 opacity-70 shrink-0" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-secondary/30 dark:bg-secondary/10 rounded-2xl p-4 sm:p-6 flex flex-col gap-4 border border-border/60 dark:border-border/20 backdrop-blur-xs mt-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground/60">
                  Newsletter
                </span>
                <div className="text-sm font-medium text-foreground/90 dark:text-slate-200">
                  {subscribed ? (
                    <div className="flex items-center text-emerald-600 dark:text-emerald-400 gap-1.5 text-xs font-bold animate-fade-in">
                      <CheckCircle2 className="h-4 w-4" /> Verified Subscription
                    </div>
                  ) : (
                    "Get new posts and updates direct to your inbox."
                  )}
                </div>
              </div>

              {!subscribed && (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2.5 mt-1"
                >
                  <div className="relative grow">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background/60 dark:bg-background/20 border border-border/80 dark:border-border/30 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-border transition-colors text-foreground dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-foreground text-background dark:bg-white dark:text-black hover:opacity-90 px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.99] shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
            {/* Inline Author Row Fallback */}
            {!hasCover && (
              <div className="flex items-center gap-3 py-2  my-1">
                {post.authorImage ? (
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="h-7 w-7 rounded-full object-cover border border-border/60 dark:border-border/30 bg-background"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-secondary/40 dark:bg-secondary/20 flex items-center justify-center text-muted-foreground border border-border/40">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
                <div className="text-xs font-semibold text-muted-foreground">
                  Written by{" "}
                  <span className="text-foreground dark:text-slate-200 font-bold">
                    {post.author}
                  </span>
                </div>
              </div>
            )}

            {/* Inline layout fallback tags if side track is missing */}
            {!hasCover && post.tags && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2.5 py-0.5 rounded-full border border-border bg-background/60 text-muted-foreground font-medium transition-colors hover:bg-secondary/40 dark:hover:bg-secondary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <article
              id="prose-body"
              className="prose prose-sm sm:prose-base max-w-none scroll-mt-6 w-full dark:prose-invert
              prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground dark:prose-headings:text-white
              prose-p:leading-relaxed prose-p:text-muted-foreground dark:prose-p:text-slate-300
              prose-a:text-primary prose-a:font-semibold
              prose-pre:bg-neutral-100 dark:prose-pre:bg-black/30 prose-pre:text-neutral-900 dark:prose-pre:text-slate-200 prose-pre:rounded-2xl prose-pre:border prose-pre:border-border/40
              prose-code:text-neutral-900 dark:prose-code:text-slate-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-bold
              prose-code:before:content-none prose-code:after:content-none"
              dangerouslySetInnerHTML={{ __html: htmlBody }}
            />

            {/* RELATED INSIGHTS */}
            {relatedPosts.length > 0 && (
              <div className="mt-10 pt-6 border-t border-border/40 dark:border-border/20">
                <h3 className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/50 mb-4">
                  Related Insights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      to={`/blog/${related.slug}`}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card dark:bg-secondary/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs flex flex-col justify-between"
                    >
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary/20 dark:bg-secondary/10 px-2 py-0.5 rounded-md border border-border/40">
                            {related.kind}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <h4 className="text-base font-bold tracking-tight dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-muted-foreground dark:text-slate-400 line-clamp-2 mt-2">
                          {related.blurb}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer className={`mt-24 ${!hasCover ? "max-w-3xl mx-auto" : ""}`} />
      </div>
    </main>
  );
}
