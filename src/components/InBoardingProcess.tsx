import React from "react";
import { CheckCircle } from "lucide-react";

interface ProcessStep {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
  cost: string;
  icon: React.ReactNode;
}

export default function InBoardingProcess({ steps }: { steps: ProcessStep[] }) {
  return (
    <section
      id="process"
      className="relative py-24 px-6 mx-auto max-w-7xl overflow-hidden"
    >
      {/* Background Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[14px_24px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <h2 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">
          Onboarding Workflow
        </h2>
        <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          From Concept Blueprint to Live System
        </p>
        <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">
          An affordable, optimized deployment funnel engineered to yield
          scalable custom software layouts without costly enterprise cloud
          over-head.
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto mt-12">
        {/* --- DESKTOP DIAGRAM CONNECTOR LINE --- */}
        <div className="absolute top-11 left-12 right-12 h-0.5 bg-border hidden lg:block pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-green-500 opacity-60" />
        </div>

        {/* --- PROCESS CAROUSEL / GRID CONTAINER --- */}
        {/* Adds horizontal scrolling and touch snapping on mobile screens, shifts back to regular grids on md/lg viewports */}
        <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-8 relative z-10 -mx-6 px-6 md:mx-0 md:px-0">
          {steps.map((step, idx) => (
            <div
              key={step.phase}
              className="flex flex-col group min-w-[85vw] sm:min-w-[50vw] md:min-w-0 snap-center"
            >
              {/* Step Header Indicator Block */}
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3 mb-4">
                <div className="size-12 rounded-full border border-border bg-background shadow-sm flex items-center justify-center relative group-hover:border-primary/50 transition-colors duration-300 shrink-0">
                  {step.icon}
                  <span className="absolute -top-1.5 -right-1.5 size-5 bg-secondary text-[10px] font-bold rounded-full flex items-center justify-center border border-border text-muted-foreground">
                    {step.phase}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground block lg:mt-2">
                    Phase {step.phase}
                  </span>
                  <h3 className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Main Content Node Card */}
              <div className="flex-1 p-5 rounded-2xl border border-border bg-card/40 backdrop-blur-md hover:bg-card/70 transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Step Micro Deliverables */}
                  <div className="space-y-1.5 pt-3 border-t border-border/40">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground block mb-1">
                      Deliverables:
                    </span>
                    {step.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-left"
                      >
                        <CheckCircle className="size-3 text-muted-foreground/70 shrink-0" />
                        <span className="text-xs text-foreground/80 truncate">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline Metrics and Investment Badges */}
                <div className="mt-6 pt-3 border-t border-border/40 flex items-center justify-between gap-2">
                  <div className="text-[11px]">
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-wider">
                      Duration
                    </span>
                    <span className="font-semibold text-foreground">
                      {step.duration}
                    </span>
                  </div>
                  <div className="text-right text-[11px]">
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-wider">
                      Investment
                    </span>
                    <span className="font-bold text-foreground bg-secondary/80 px-2 py-0.5 rounded-md border border-border/60">
                      {step.cost}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- CAROUSEL HINT FOR MOBILE USERS --- */}
        <div className="flex justify-center gap-1.5 mt-2 md:hidden">
          {steps.map((step) => (
            <div
              key={step.phase}
              className="h-1 w-4 rounded-full bg-border group-hover:bg-primary/40 transition-colors"
            />
          ))}
        </div>

        {/* --- PIPELINE TOTAL ACCUMULATOR STATEMENT --- */}
        <div className="mt-12 p-6 rounded-2xl border border-dashed border-border bg-secondary/20 max-w-2xl mx-auto text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left sm:max-w-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Complete Minimum Viable Launch Package
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              Includes cross-platform UI engineering, modern code architecture,
              and deployment pipeline configuration.
            </p>
          </div>
          <div className="shrink-0 text-center sm:text-right">
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground block">
              Estimated Total Setup
            </span>
            <span className="text-xl font-black text-foreground tracking-tight">
              KES 38,000
            </span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">
              + local infra host (~KES 700/mo)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
