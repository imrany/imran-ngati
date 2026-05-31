import { ArrowRight, MessageCircle } from "lucide-react";
import ContactDropdownContent from "./ContactDropdownContent";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Stat from "./Stat";
import BentoTile from "./BentoTile";

type BentoTile = {
  className: string;
  gradient: string;
  label: string;
  image?: string;
  url?: string;
};

export default function Hero({
  WHATSAPP_URL,
  EMAIL_URL,
  PHONE_URL,
  bentoTiles,
}: {
  WHATSAPP_URL: string;
  EMAIL_URL: string;
  PHONE_URL: string;
  bentoTiles: BentoTile[];
}) {
  return (
    <section id="top" className="relative lg:pt-4 pt-8">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-12 gap-12">
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
              I'm Imran Ngati. I build and maintain websites, e-commerce
              platforms, recruitment portals, and optimized payment pipelines
              that power real businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="inline-flex items-center gap-2 cursor-pointer rounded-full bg-accent text-accent-foreground px-6 py-3.5 text-xs tracking-wider font-semibold hover:bg-accent/90 hover:opacity-95 transition shadow-md shadow-accent/10 focus:outline-none">
                    <MessageCircle className="size-4" />
                    Chat with me
                  </Button>
                </DropdownMenuTrigger>
                <ContactDropdownContent
                  EMAIL_URL={EMAIL_URL}
                  PHONE_URL={PHONE_URL}
                  WHATSAPP_URL={WHATSAPP_URL}
                />
              </DropdownMenu>

              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-xs tracking-wider font-semibold hover:bg-card transition"
              >
                View projects
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

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

        <div className="lg:col-span-5 grid grid-cols-2 grid-rows-3 gap-3 min-h-125 lg:min-h-150">
          {bentoTiles.map((b) => (
            <BentoTile
              className={b.className}
              gradient={b.gradient}
              label={b.label}
              image={b.image}
              url={b.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
