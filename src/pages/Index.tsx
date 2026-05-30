import { useState, useEffect } from "react";
import Ecommerce from "../assets/ecommerce.png";
import Recruitment from "../assets/recruitment.png";
import {
  ArrowUpRight,
  MessageCircle,
  ArrowRight,
  Sun,
  Moon,
  Youtube,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const WHATSAPP_URL = "https://wa.me/254734720752";
const socialMediaLinks = [
  {
    icon: Youtube,
    label: "Youtube",
    url: "https://youtube.com/mat_imrany",
  },
  {
    icon: Instagram,
    label: "Instagram",
    url: "https://instagram.com/its_imrany",
  },
  {
    icon: Twitter,
    label: "Twitter",
    url: "https://twitter.com/matano_imran",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/imranmatano",
  },
  {
    icon: Mail,
    label: "Email",
    url: "mailto:imranmat254@gmail.com",
  },
];
const projects = [
  {
    title: "Bashadi Agency",
    kind: "Manpower Recruitment Platform",
    blurb:
      "End-to-end recruitment portal connecting employers with vetted talent — listings, applications, and admin dashboard.",
    tags: ["React", "Node.js", "PostgreSQL"],
    gradient: "from-indigo-500/30 via-violet-500/10 to-transparent",
  },
  {
    title: "E-commerce Platform",
    kind: "Online Store",
    blurb:
      "Full storefront with cart, checkout, inventory and order management, optimized for mobile-first shoppers.",
    tags: ["React", "Stripe", "REST API"],
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
  },
  {
    title: "M-Pesa Integration",
    kind: "Payments",
    blurb:
      "STK Push, C2B and B2C flows with reconciliation webhooks and idempotent transaction handling.",
    tags: ["Daraja API", "Webhooks", "Node.js"],
    gradient: "from-amber-500/30 via-orange-500/10 to-transparent",
  },
  {
    title: "Email Integration",
    kind: "Transactional Email",
    blurb:
      "Templated, deliverable email pipelines — verification, receipts and campaigns with bounce handling.",
    tags: ["SMTP", "Templates", "Queues"],
    gradient: "from-sky-500/30 via-cyan-500/10 to-transparent",
  },
  {
    title: "REST API Services",
    kind: "Backend",
    blurb:
      "Authenticated, documented APIs powering web and mobile clients with rate-limiting and monitoring.",
    tags: ["Node.js", "JWT", "OpenAPI"],
    gradient: "from-rose-500/30 via-pink-500/10 to-transparent",
  },
];

const services = [
  {
    title: "Web Applications",
    desc: "Production-grade React & TypeScript apps.",
  },
  { title: "E-commerce", desc: "Storefronts, carts, checkout, and admin." },
  {
    title: "M-Pesa Integrations",
    desc: "STK Push, C2B, B2C, reconciliation.",
  },
  { title: "Email Systems", desc: "Transactional pipelines and templates." },
  { title: "API Development", desc: "REST APIs, auth, and documentation." },
  { title: "Maintenance", desc: "Bug fixes, performance and uptime." },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-display selection:bg-accent/20 selection:text-foreground">
      <Nav />
      <Hero />
      <Work />
      <Services />
      <ContactBand />
      <Footer />
    </div>
  );
}

function Nav() {
  const { theme, toggle } = useTheme();
  const [scrollState, setScrollState] = useState({
    visible: true,
    isAtTop: true,
    lastScrollY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if user is at the exact top threshold of the page
      const isAtTop = currentScrollY < 20;

      // Reveal navbar if scrolling up, hide if scrolling down, always show at top
      const visible = currentScrollY < scrollState.lastScrollY || isAtTop;

      setScrollState({
        visible,
        isAtTop,
        lastScrollY: currentScrollY,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollState.lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ease-in-out
        ${scrollState.visible ? "translate-y-0" : "-translate-y-full"}
        ${
          scrollState.isAtTop
            ? "bg-transparent border-transparent py-6"
            : "backdrop-blur-md bg-background/75 border-b border-border py-4"
        }
      `}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a
          href="#top"
          className="text-sm font-bold tracking-tight hover:opacity-80 transition"
        >
          Imran Ngati
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-muted-foreground">
          <a
            href="#work"
            className="hover:text-foreground transition-colors duration-200"
          >
            Work
          </a>
          <a
            href="#services"
            className="hover:text-foreground transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#contact"
            className="hover:text-foreground transition-colors duration-200"
          >
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center size-9 rounded-full border border-border bg-card/40 hover:bg-secondary transition-all duration-200"
          >
            {theme === "dark" ? (
              <Sun className="size-4 text-foreground" />
            ) : (
              <Moon className="size-4 text-foreground" />
            )}
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-all duration-200 shadow-sm"
          >
            <MessageCircle className="size-3.5" />
            <span className="hidden sm:inline">Chat</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative lg:pt-4 pt-8">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-12 gap-12">
        {/* Left: Headline */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
              Web Developer · Mombasa
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-balance">
              Building web
              <br />
              products ready
              <br />
              to{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-accent/70">
                scale
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              I'm Imran Ngati. I design and build websites, e-commerce
              platforms, recruitment portals, and optimized payment pipelines
              that power real businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3.5 text-xs tracking-wider font-semibold hover:opacity-95 transition shadow-md shadow-accent/10"
              >
                <MessageCircle className="size-4" />
                Chat with me
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/30 px-6 py-3.5 text-xs  tracking-wider font-semibold hover:bg-secondary transition"
              >
                View Projects
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          {/* Capabilities strip */}
          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              What I build
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-xl">
              <Stat
                n="4×"
                label="E-commerce"
                sub="Online clothing shops and shipped storefronts"
              />
              <Stat
                n="2×"
                label="Recruitment"
                sub="Portals Deployed i.e Bashadi Agency Limited"
              />
              <Stat
                n="1×"
                label="Online Payments"
                sub="M-Pesa, Paypal and stripe integrations"
              />
            </div>
          </div>
        </div>

        {/* Right: Bento grid */}
        <div className="lg:col-span-5 grid grid-cols-2 grid-rows-3 gap-3 min-h-125 lg:min-h-150">
          <BentoTile
            className="row-span-1"
            gradient="from-indigo-500/25 via-violet-500/5"
            label="E-commerce"
            image={Ecommerce}
            url="https://elegance-u3gc.onrender.com"
          />
          <BentoTile
            className="row-span-2"
            gradient="from-emerald-500/25 via-teal-500/5"
            label="Bashadi Agency"
            image={Recruitment}
            url="https://bashadi-agency.onrender.com"
          />
          <BentoTile
            className="row-span-1"
            gradient="from-amber-500/25 via-orange-500/5"
            label="Online Payment Integrations"
          />
          <BentoTile
            className="row-span-1"
            gradient="from-sky-500/25 via-cyan-500/5"
            label="Email API"
          />
          <BentoTile
            className="row-span-1"
            gradient="from-rose-500/25 via-pink-500/5"
            label="Backend microservices"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label, sub }: { n: string; label: string; sub: string }) {
  return (
    <div>
      <div className="text-3xl font-black tracking-tight">{n}</div>
      <div className="text-xs font-semibold tracking-wider mt-1">{label}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
        {sub}
      </div>
    </div>
  );
}

function BentoTile({
  className = "",
  gradient,
  label,
  url,
  image,
}: {
  className?: string;
  gradient: string;
  label: string;
  url?: string;
  image?: string;
}) {
  function openURL() {
    if (url) {
      window.open(url, "_blank");
    }
  }
  return (
    <div
      onClick={openURL}
      className={`${url && "cursor-pointer"} relative overflow-hidden rounded-2xl border border-border/80 bg-card group transition-all duration-300 hover:border-border-strong ${className}`}
    >
      {/* Fallback structural gradient background */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient} to-transparent`}
      />

      {/* Render background image if provided */}
      {image && (
        <>
          <img
            src={image}
            alt={label}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Vignette/Overlay layer to protect layout text legibility */}
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        </>
      )}

      {/* Lighting effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

      {/* Core layout text wrapper */}
      <div className="relative h-full w-full p-5 flex items-end justify-between z-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground/90 backdrop-blur-[2px] rounded-md px-1 py-0.5">
          {label}
        </span>
        <div className="rounded-full bg-background/40 p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 backdrop-blur-sm border border-border">
          <ArrowUpRight className="size-3.5 text-foreground" />
        </div>
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="border-t border-border/60 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Selected Work
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter">
              Projects that
              <br />
              ship & scale
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`absolute -top-20 -right-20 size-64 rounded-full bg-gradient-to-br ${p.gradient} blur-3xl opacity-60 pointer-events-none group-hover:opacity-80 transition-opacity duration-500`}
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
                  <h3 className="text-2xl font-bold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {p.blurb}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px]  px-2.5 py-0.5 rounded-full border border-border bg-background/50 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
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

function ContactBand() {
  return (
    <section id="contact" className="border-t border-border/60 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
          Let's Talk
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] max-w-4xl mx-auto">
          Let's Build
          <br />
          something{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-accent/70">
            Great
          </span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-4 text-xs tracking-wider hover:opacity-95 transition shadow-lg shadow-accent/10"
          >
            <MessageCircle className="size-4" />
            Chat with me on Whatsapp
          </a>
          <a
            href="https://wa.me/254734720752"
            className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition py-2"
          >
            +254 734 720 752
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-xs  text-muted-foreground">
        <span>
          © {new Date().getFullYear()} Imran Ngati. All rights reserved.
        </span>
        <div className="flex gap-3">
          {socialMediaLinks.map((link) => (
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <link.icon className="size-4 hover:text-foreground transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
