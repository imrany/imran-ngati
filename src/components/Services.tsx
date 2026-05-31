import React from "react";
import {
  Sparkles,
  Terminal,
  Database,
  Server,
  Layers,
  Shield,
  Workflow,
  Cpu,
  Globe,
  MessageSquare,
  Zap,
  BarChart3,
} from "lucide-react";

type Service = {
  title: string;
  desc?: string; // Optional if you just want to use the titles as category nodes
};

// A fallback icon mapper to add clean, visual depth like the screenshot
const getIconForCategory = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("ai") || t.includes("prompt"))
    return <Sparkles className="size-3.5 text-blue-500" />;
  if (t.includes("code") || t.includes("dev"))
    return <Terminal className="size-3.5 text-indigo-500" />;
  if (t.includes("data") || t.includes("db"))
    return <Database className="size-3.5 text-purple-500" />;
  if (t.includes("cloud") || t.includes("infra"))
    return <Server className="size-3.5 text-emerald-500" />;
  if (t.includes("flow") || t.includes("automation"))
    return <Workflow className="size-3.5 text-orange-500" />;
  if (t.includes("api") || t.includes("backend"))
    return <Cpu className="size-3.5 text-amber-500" />;
  if (t.includes("web") || t.includes("site"))
    return <Globe className="size-3.5 text-sky-500" />;
  if (t.includes("chat") || t.includes("support"))
    return <MessageSquare className="size-3.5 text-pink-500" />;
  if (t.includes("speed") || t.includes("perf"))
    return <Zap className="size-3.5 text-yellow-500" />;
  if (t.includes("scale") || t.includes("analytics"))
    return <BarChart3 className="size-3.5 text-cyan-500" />;
  return <Layers className="size-3.5 text-muted-foreground" />;
};

export default function Services({ services }: { services: Service[] }) {
  // If your array is small, we duplicate it slightly to ensure it overflows the screen width cleanly
  const baseItems =
    services.length > 0
      ? services
      : [
          { title: "AI Productivity" },
          { title: "Sales Engine" },
          { title: "AI Chatbot" },
          { title: "Linux Utilities" },
          { title: "Open Source" },
          { title: "Task Automations" },
          { title: "Data Platform" },
          { title: "Fintech API" },
          { title: "Cloud Architecture" },
          { title: "System Security" },
          { title: "UI Components" },
          { title: "Performance Tuning" },
        ];

  // Distribute items into two distinct horizontal tracks for an offset layout
  const row1 = baseItems.filter((_, i) => i % 2 === 0);
  const row2 = baseItems.filter((_, i) => i % 2 !== 0);

  return (
    <section
      id="services"
      className="scroll-mt-20 bg-background/50 relative overflow-hidden px-6 py-8"
    >
      {/* Global CSS Inject for Marquee Keyframes */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 35s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 35s linear infinite;
        }
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <h2 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">
          Services
        </h2>
        <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Best Ideas to Choose
        </p>
        <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">
          Choose a solution that fits you best.
        </p>
      </div>

      {/* ── CHIP TRACK MARQUEE WRAPPER ── */}
      <div className="marquee-container relative px-6 w-full flex flex-col gap-4 overflow-hidden mask-gradient py-2">
        {/* Decorative fade gradients at edges so chips cleanly dissolve into screen edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* TRACK ROW 1: Gliding Left */}
        <div className="animate-marquee-left gap-3 px-2">
          {/* Loop twice to create seamless continuous node coverage wrap */}
          {[...row1, ...row1, ...row1].map((s, idx) => (
            <div
              key={`r1-${s.title}-${idx}`}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border/80 bg-card/60 backdrop-blur-md shadow-xs hover:border-border hover:bg-card hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group shrink-0 select-none"
            >
              <div className="bg-background border border-border/40 p-1 rounded-full group-hover:scale-105 transition-transform">
                {getIconForCategory(s.title)}
              </div>
              <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* TRACK ROW 2: Gliding Right (Offset directions) */}
        <div className="animate-marquee-right gap-3 px-2">
          {[...row2, ...row2, ...row2].map((s, idx) => (
            <div
              key={`r2-${s.title}-${idx}`}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border/80 bg-card/60 backdrop-blur-md shadow-xs hover:border-border hover:bg-card hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group shrink-0 select-none"
            >
              <div className="bg-background border border-border/40 p-1 rounded-full group-hover:scale-105 transition-transform">
                {getIconForCategory(s.title)}
              </div>
              <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
