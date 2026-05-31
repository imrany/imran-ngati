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
      className="relative pb-6 px-6 mx-auto max-w-7xl overflow-hidden"
    >
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">
          Ecosystem
        </h2>
        <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tooling & Production Pipeline
        </p>
      </div>

      {/* ── Desktop: 3-col diagram layout. Mobile: stacked tracks ── */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* ── DESKTOP LAYOUT ── */}
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-12 lg:items-start">
          {/* LEFT: Languages */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-2 text-muted-foreground">
              <span className="text-xs uppercase tracking-widest font-bold">
                Languages
              </span>
              <Terminal className="size-4" />
            </div>
            {languages.map((node) => (
              <TechCard
                key={node.name}
                node={node}
                layoutDirection="flex-row text-left"
              />
            ))}
          </div>

          {/* Databases */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-2 text-muted-foreground">
              <Database className="size-4" />
              <span className="text-xs uppercase tracking-widest font-bold">
                Data Architecture
              </span>
            </div>
            {databases.map((node) => (
              <TechCard
                key={node.name}
                node={node}
                layoutDirection="flex-row text-left"
              />
            ))}
          </div>

          {/* Infra */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-2 text-muted-foreground">
              <Server className="size-4" />
              <span className="text-xs uppercase tracking-widest font-bold">
                DevOps & Cloud
              </span>
            </div>
            {infra.map((node) => (
              <TechCard
                key={node.name}
                node={node}
                layoutDirection="flex-row text-left"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechCard({
  node,
  layoutDirection,
}: {
  node: TechNode;
  layoutDirection: string;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-3.5 rounded-2xl border border-border bg-card/40 backdrop-blur-md transition-all duration-300 group hover:bg-card/70 hover:border-border/80 hover:shadow-md shadow-sm ${node.bgClass} ${layoutDirection}`}
    >
      <div className="size-11 rounded-xl bg-background/80 p-2 flex items-center justify-center border border-border/60 group-hover:scale-105 transition-transform shrink-0">
        <img
          src={node.logo}
          alt={`${node.name} logo`}
          className="max-w-full max-h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="text-xs font-bold tracking-tight text-foreground">
          {node.name}
        </h3>
        <p className="text-[11px] text-muted-foreground truncate max-w-[200px]">
          {node.description}
        </p>
      </div>
    </div>
  );
}
