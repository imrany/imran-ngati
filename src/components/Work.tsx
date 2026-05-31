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
  return (
    <section id="work" className="border-t border-border/60 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-12">
          Projects that
          <br />
          ship & scale
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => {
            function openURL() {
              if (p.url) window.open(p.url, "_blank");
            }
            return (
              <article
                key={p.title}
                onClick={openURL}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-6 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`absolute -top-20 -right-20 size-64 rounded-full bg-linear-to-br ${p.gradient} blur-3xl opacity-60 pointer-events-none group-hover:opacity-80 transition-opacity duration-500`}
                />
                <div className="relative flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {p.kind}
                      </span>
                      <div className="rounded-full bg-secondary/50 text-muted-foreground group-hover:text-foreground group-hover:bg-secondary transition-all duration-300">
                        <ArrowUpRight className="size-4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.logo && (
                        <img
                          src={p.logo}
                          className="object-cover rounded-sm w-8 h-8"
                        />
                      )}
                      <h3 className="text-2xl font-bold tracking-tight">
                        {p.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {p.blurb}
                    </p>
                  </div>
                  {p.tags && (
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-0.5 rounded-full border border-border bg-background/50 text-muted-foreground"
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
    </section>
  );
}
