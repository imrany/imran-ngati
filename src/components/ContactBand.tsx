import { MessageCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import ContactDropdownContent from "./ContactDropdownContent";

export default function ContactBand({
  WHATSAPP_URL,
  EMAIL_URL,
  PHONE_URL,
}: {
  WHATSAPP_URL: string;
  EMAIL_URL: string;
  PHONE_URL: string;
}) {
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-4 text-xs tracking-wider font-semibold hover:opacity-95 transition shadow-lg shadow-accent/10 focus:outline-none cursor-pointer">
                <MessageCircle className="size-4" />
                Chat with me
              </button>
            </DropdownMenuTrigger>
            <ContactDropdownContent
              EMAIL_URL={EMAIL_URL}
              PHONE_URL={PHONE_URL}
              WHATSAPP_URL={WHATSAPP_URL}
            />
          </DropdownMenu>
          <a
            href={PHONE_URL}
            className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition py-2"
          >
            {PHONE_URL.substring(4)}
          </a>
        </div>
      </div>
    </section>
  );
}
