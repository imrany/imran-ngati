import { useState, useEffect } from "react";
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
import PostImage from "@/components/PostImage";

export default function Blog() {
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [allPosts] = useState<BlogPost[]>(() => loadMarkdownPosts());
  const [searchQuery, setSearchQuery] = useState("");

  // CHANGED: Use selectedKind instead of selectedTag
  const [selectedKind, setSelectedKind] = useState<string | null>(null);
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

  const getPostBackground = (post: BlogPost) => {
    if (!post.customBackground) return null;
    return Array.isArray(post.customBackground)
      ? isDarkMode
        ? post.customBackground[1]
        : post.customBackground[0]
      : post.customBackground;
  };

  // CHANGED: Derive unique 'kind' values for the filter UI
  const allKinds = Array.from(
    new Set(allPosts.map((post) => post.kind || "General")),
  ).sort();

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.blurb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.kind.toLowerCase().includes(searchQuery.toLowerCase());

    // CHANGED: Filter by kind
    const matchesKind = selectedKind ? post.kind === selectedKind : true;

    return matchesSearch && matchesKind;
  });

  const gridPosts = filteredPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
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
          {allKinds.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border/40 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2 flex items-center gap-1.5">
                <Tag className="size-3.5" /> Filter by Kind:
              </span>
              <button
                onClick={() => setSelectedKind(null)}
                className={`text-xs px-3 py-1 rounded-md font-medium transition-all ${
                  !selectedKind
                    ? "bg-foreground text-background shadow-xs"
                    : "bg-secondary/40 border border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                All Articles ({allPosts.length})
              </button>
              {allKinds.map((kind) => {
                const count = allPosts.filter((p) => p.kind === kind).length;
                return (
                  <button
                    key={kind}
                    onClick={() =>
                      setSelectedKind(kind === selectedKind ? null : kind)
                    }
                    className={`text-xs px-3 py-1 rounded-md font-medium transition-all ${
                      kind === selectedKind
                        ? "bg-foreground text-background shadow-xs"
                        : "bg-secondary/40 border border-border/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {kind} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => {
            const dynamicBg = getPostBackground(post);
            return (
              <article
                key={post.slug}
                onClick={() => navigate(`/blog/${post.slug}`)}
                // Apply dynamic background style
                style={{ backgroundColor: dynamicBg || undefined }}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between h-full ${
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
