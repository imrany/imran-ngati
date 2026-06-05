import { useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Tag,
  Search,
  Mail,
  CheckCircle,
} from "lucide-react";
import { BlogPost } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { loadMarkdownPosts } from "./index";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import confetti from "canvas-confetti";

export default function Blog() {
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [allPosts] = useState<BlogPost[]>(() => loadMarkdownPosts());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags across all posts for the filter sidebar/header
  const allTags = Array.from(
    new Set(allPosts.flatMap((post) => post.tags || [])),
  ).sort();

  // Filter pipeline: Search query match + Tag filter match
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.blurb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.kind.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  // Isolate the absolute latest post to feature prominently if no filters are active
  const featuredPost = allPosts[0];
  const gridPosts =
    searchQuery || selectedTag ? filteredPosts : filteredPosts.slice(1);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");

      // Fire a professional, high-velocity side-cannon confetti explosion
      const duration = 1.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 25,
        spread: 360,
        ticks: 60,
        zIndex: 50,
      };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Burst from both edges of the inner screen window
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Nav />
      {/* HEADER SECTION */}
      <header className="border-b border-border/60 py-12 mt-10 sm:py-16 bg-card/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                <BookOpen className="size-4 text-primary" />
                Technical Notebook
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
                Insights & <br className="hidden sm:inline" />
                Architectures
              </h1>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
                Deep-dives into systems engineering, multi-threaded pipelines,
                cryptography constructs, and lightweight, interactive interface
                designs.
              </p>

              {/* SUBSCRIPTION CONTROL PANELS */}
              {!subscribed ? (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2.5 mt-6"
                >
                  <div className="relative grow w-full">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                    <input
                      type="email"
                      required
                      placeholder="Subscribe for New Posts"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background/60 dark:bg-background/20 border border-border/80 dark:border-border/30 rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-foreground dark:text-white placeholder-muted-foreground/40 focus:outline-none focus:border-border transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-foreground text-background dark:bg-white dark:text-black hover:bg-foreground/90 dark:hover:bg-white/90 px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-[0.99] cursor-pointer shadow-xs shrink-0 w-full sm:w-auto"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="inline-flex items-center gap-2 mt-6 text-sm text-emerald-600 dark:text-emerald-400 font-semibold animate-in fade-in zoom-in-95 duration-200">
                  <CheckCircle className="size-4" />
                  Successfully subscribed!
                </div>
              )}
            </div>

            {/* SEARCH UTILITY */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technical writes..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          {/* DYNAMIC TAG CLOUD FILTERS */}
          {allTags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border/40 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2 flex items-center gap-1.5">
                <Tag className="size-3.5" /> Filter:
              </span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`text-xs px-3 py-1 rounded-md font-medium transition-all ${
                  !selectedTag
                    ? "bg-foreground text-background shadow-xs"
                    : "bg-secondary/40 border border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                All Articles ({allPosts.length})
              </button>
              {allTags.map((tag) => {
                const count = allPosts.filter((p) =>
                  p.tags.includes(tag),
                ).length;
                return (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTag(tag === selectedTag ? null : tag)
                    }
                    className={`text-xs px-3 py-1 rounded-md font-medium transition-all ${
                      tag === selectedTag
                        ? "bg-foreground text-background shadow-xs"
                        : "bg-secondary/40 border border-border/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tag} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        {/* ── FEATURED POST HERO (Only displayed when no filter is applied) ── */}
        {featuredPost && !searchQuery && !selectedTag && (
          <section className="mb-16">
            <div
              onClick={() => navigate(`/blog/${featuredPost.slug}`)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              <div
                className={`absolute -top-24 -right-24 size-96 rounded-full bg-linear-to-br ${featuredPost.gradient || "from-primary/10 to-transparent"} blur-3xl opacity-50 pointer-events-none group-hover:opacity-70 transition-opacity duration-500`}
              />

              {/* HERO METADATA / TEXT */}
              <div className="p-6 sm:p-8 lg:p-12 lg:col-span-7 flex flex-col justify-between h-full z-10 w-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-black bg-secondary/40 px-2.5 py-1 rounded-md border border-border/60">
                      {featuredPost.kind}
                    </span>
                    <span className="text-xs text-muted-foreground/80 flex items-center gap-1">
                      <Calendar className="size-3.5" /> {featuredPost.date}
                    </span>
                    <span className="text-xs text-muted-foreground/60">
                      • {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {featuredPost.title}
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {featuredPost.blurb}
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {featuredPost.tags && (
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full border border-border bg-background/85 text-muted-foreground font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300 shrink-0">
                    Read Manifest
                    <div className="rounded-full p-2 bg-secondary/50 text-muted-foreground group-hover:text-foreground group-hover:bg-secondary transition-all">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* HERO VISUAL COVER IMAGE LAYER */}
              <div className="relative w-full h-64 lg:h-full min-h-70 lg:col-span-5 bg-muted/30 overflow-hidden border-t lg:border-t-0 lg:border-l border-border/50">
                {featuredPost.coverImage ? (
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-[1.02] group-hover:opacity-100 transition-all duration-500"
                    loading="eager"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-secondary/40 to-muted/10 flex items-center justify-center">
                    <BookOpen className="size-12 text-muted-foreground/20" />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── MAIN ARTICLE GRID/LIST ── */}
        <section>
          {searchQuery || selectedTag ? (
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Search & Filter Query Results ({filteredPosts.length})
              </h3>
            </div>
          ) : (
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
              Archived Manifests & Releases
            </h3>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/10">
              <p className="text-sm text-muted-foreground">
                No blog matching the current filter parameters found.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                Clear Active Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <article
                  key={post.slug}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between h-full"
                >
                  {/* TOP CARD COVER IMAGE ELEMENT */}
                  <div className="relative w-full h-48 bg-muted/40 overflow-hidden border-b border-border/50">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-secondary/20 to-transparent flex items-center justify-center">
                        <BookOpen className="size-8 text-muted-foreground/10" />
                      </div>
                    )}

                    {/* Floating Kind Badge over image block */}
                    <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-white font-bold bg-background/90 mix-blend-difference px-2 py-0.5 rounded-sm backdrop-blur-xs">
                      {post.kind}
                    </span>
                  </div>

                  {/* Decorative ambient background light glows */}
                  <div
                    className={`absolute top-32 -right-20 size-64 rounded-full bg-linear-to-br ${post.gradient || "from-primary/10 to-transparent"} blur-3xl opacity-30 pointer-events-none group-hover:opacity-50 transition-opacity duration-500`}
                  />

                  {/* BOTTOM DATA SPACE */}
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

                    <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between w-full">
                      <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {post.tags?.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded-sm bg-secondary/40 border border-border/40 text-muted-foreground font-medium"
                          >
                            {t}
                          </span>
                        ))}
                        {post.tags?.length > 2 && (
                          <span className="text-[10px] text-muted-foreground/60 px-1 font-medium">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 group-hover:text-foreground transition-colors shrink-0">
                        Read
                        <ArrowUpRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
