import { Terminal, Database, Server } from "lucide-react";

interface TechNode {
  name: string;
  logo: string;
  bgClass: string;
  description: string;
  category: "languages" | "databases" | "infra" | string;
}

export default function ToolsSection({ techStack }: { techStack: TechNode[] }) {
  const languages = techStack.filter((t) => t.category === "languages");
  const databases = techStack.filter((t) => t.category === "databases");
  const infra = techStack.filter((t) => t.category === "infra");

  return (
    <section
      id="tools"
      className="relative pb-10 px-6 mx-auto max-w-7xl overflow-hidden"
    >
      {/* Background Subtle Tech-Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[14px_24px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <h2 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">
          Ecosystem
        </h2>
        <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tooling & Production Pipeline
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto min-h-145">
        {/* ── LAYOUT ENGINE CONTROLLER ── */}
        {/* Mobile Viewports: Turns into high-performance side-swipe swimlanes */}
        {/* Desktop Viewports: Snaps to absolute diagram spacing columns */}
        <div className="flex overflow-x-auto lg:overflow-visible gap-6 pb-8 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-12 lg:pb-0 relative z-10 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-none">
          {/* COLUMN 1: Languages */}
          <div className="flex flex-col gap-4 min-w-[82vw] sm:min-w-[45vw] lg:min-w-0 snap-center lg:mt-4">
            <div className="flex items-center gap-2 px-1 text-muted-foreground mb-1">
              <Terminal className="size-4 text-blue-500" />
              <span className="text-xs uppercase tracking-widest font-bold">
                Languages
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {languages.map((node) => (
                <TechCard key={node.name} node={node} />
              ))}
            </div>
          </div>

          {/* COLUMN 2: Databases (Moved to center base spacing mathematically on desktop) */}
          <div className="flex flex-col gap-4 min-w-[82vw] sm:min-w-[45vw] lg:min-w-0 snap-center">
            <div className="flex items-center gap-2 px-1 text-muted-foreground mb-1">
              <Database className="size-4 text-purple-500" />
              <span className="text-xs uppercase tracking-widest font-bold">
                Data Architecture
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {databases.map((node) => (
                <TechCard key={node.name} node={node} />
              ))}
            </div>
          </div>

          {/* COLUMN 3: DevOps & Cloud */}
          <div className="flex flex-col gap-4 min-w-[82vw] sm:min-w-[45vw] lg:min-w-0 snap-center lg:mt-4">
            <div className="flex items-center gap-2 px-1 text-muted-foreground mb-1">
              <Server className="size-4 text-green-500" />
              <span className="text-xs uppercase tracking-widest font-bold">
                DevOps & Cloud
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {infra.map((node) => (
                <TechCard key={node.name} node={node} />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Visual Pagination Indicators for Mobile Devices Only */}
        <div className="flex justify-center gap-1.5 mt-2 lg:hidden">
          <div className="h-1 w-5 rounded-full bg-primary/80" />
          <div className="h-1 w-2 rounded-full bg-border" />
          <div className="h-1 w-2 rounded-full bg-border" />
        </div>
      </div>
    </section>
  );
}

function TechCard({ node }: { node: TechNode }) {
  return (
    <div
      className={`flex items-center gap-4 p-3.5 rounded-2xl border border-border bg-card/40 backdrop-blur-md transition-all duration-300 group hover:bg-card/70 hover:border-border/80 hover:shadow-md shadow-sm ${node.bgClass}`}
    >
      <div className="size-11 rounded-xl bg-background/80 p-2 flex items-center justify-center border border-border/60 group-hover:scale-105 transition-transform shrink-0">
        <img
          src={node.logo}
          alt={`${node.name} representation`}
          className="max-w-full max-h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col min-w-0 text-left">
        <h3 className="text-xs font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
          {node.name}
        </h3>
        <p className="text-[11px] text-muted-foreground truncate leading-normal mt-0.5">
          {node.description}
        </p>
      </div>
    </div>
  );
}
