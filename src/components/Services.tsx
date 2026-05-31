type Service = {
  title: string;
  desc: string;
};

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="border-t border-border/60 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Services
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter max-w-3xl">
          From Idea to{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-accent/70">
            production
          </span>
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-background p-8 hover:bg-card/60 transition-colors duration-300"
            >
              <h3 className="text-base font-bold tracking-tight">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
