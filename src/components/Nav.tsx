import { useTheme } from "@/hooks/use-theme";
import {
  Github,
  MessageCircle,
  Moon,
  Sun,
  Menu,
  Phone,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import ContactDropdownContent from "./ContactDropdownContent";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import WhatsAppIcon from "./WhatsAppIcon";
import GmailIcon from "./GmailIcon";

export default function Nav({
  WHATSAPP_URL,
  EMAIL_URL,
  PHONE_URL,
}: {
  WHATSAPP_URL: string;
  EMAIL_URL: string;
  PHONE_URL: string;
}) {
  const { theme, toggle } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollState, setScrollState] = useState({
    visible: true,
    isAtTop: true,
    lastScrollY: 0,
  });

  function openURL(url: string) {
    window.open(url, "_blank");
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY < 20;
      const visible = currentScrollY < scrollState.lastScrollY || isAtTop;

      setScrollState({
        visible,
        isAtTop,
        lastScrollY: currentScrollY,
      });

      if (!visible) setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollState.lastScrollY]);

  const navLinks = [
    { href: "#work", label: "Work" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

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
          className="text-sm font-bold tracking-tight hover:opacity-80 transition z-50"
        >
          Imran Ngati
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* --- DESKTOP CONTROLS ONLY (Hidden below md) --- */}
          <Button
            onClick={() => openURL("https://github.com/imrany")}
            aria-label="https://github.com/imrany"
            variant="outline"
            className="hidden md:inline-flex cursor-pointer items-center gap-2 text-foreground hover:text-foreground rounded-full border border-border bg-card/40 hover:bg-secondary px-4 h-9 transition-all duration-200"
          >
            <Github className="size-3.5" />
            <span>Github</span>
          </Button>

          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="inline-flex items-center gap-2 cursor-pointer rounded-full bg-foreground text-background px-4 h-9 text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-all duration-200 shadow-sm focus:outline-none">
                  <MessageCircle className="size-3.5" />
                  <span>Chat</span>
                </Button>
              </DropdownMenuTrigger>
              <ContactDropdownContent
                EMAIL_URL={EMAIL_URL}
                PHONE_URL={PHONE_URL}
                WHATSAPP_URL={WHATSAPP_URL}
              />
            </DropdownMenu>
          </div>

          <Button
            onClick={toggle}
            variant="outline"
            aria-label="Toggle theme"
            className="hidden md:inline-flex items-center  text-foreground hover:text-foreground justify-center size-9 rounded-full border border-border bg-card/40 hover:bg-secondary transition-all duration-200"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          {/* --- MOBILE HAMBURGER TRIGGER --- */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full bg-card/40 border border-border hover:bg-secondary text-foreground focus:outline-none"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-72 bg-background/95 backdrop-blur-md p-6 border-l border-border flex flex-col justify-between"
              >
                <div className="space-y-8">
                  <SheetHeader className="text-left">
                    <SheetTitle className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                      Imran Ngati
                    </SheetTitle>
                  </SheetHeader>

                  {/* Primary Nav Section Links */}
                  <nav className="flex flex-col gap-4 text-sm uppercase tracking-wider font-semibold">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground transition-colors py-1 border-b border-border/20"
                        >
                          {link.label}
                        </a>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Integrated Slider Actions Section */}
                  <div className="flex flex-col gap-3 pt-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                      Connect & Settings
                    </p>

                    <Button
                      onClick={() => {
                        openURL("https://github.com/imrany");
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full justify-start gap-3 rounded-xl border border-border bg-card/50 text-xs font-semibold"
                    >
                      <Github className="size-4" />
                      Github Profile
                    </Button>

                    <Button
                      onClick={() => {
                        openURL(WHATSAPP_URL);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start gap-3 rounded-xl bg-foreground text-background text-xs font-semibold"
                    >
                      <WhatsAppIcon className="size-4" />
                      WhatsApp Chat
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={EMAIL_URL}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/30 h-10 text-xs font-medium hover:bg-secondary transition-colors"
                      >
                        <GmailIcon className="size-3.5" />
                        Email
                      </a>
                      <a
                        href={PHONE_URL}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/30 h-10 text-xs font-medium hover:bg-secondary transition-colors"
                      >
                        <Phone className="size-3.5" />
                        Call
                      </a>
                    </div>
                  </div>
                </div>

                {/* Slider Footer Panel */}
                <div className="flex items-center justify-between border-t border-border/40 pt-4">
                  <div className="text-[10px] text-muted-foreground tracking-tight">
                    © {new Date().getFullYear()} Imran Ngati.
                  </div>

                  {/* Embedded Mobile Theme Switch */}
                  <Button
                    onClick={toggle}
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full hover:bg-secondary text-foreground hover:text-foreground"
                    aria-label="Toggle interface color system"
                  >
                    {theme === "dark" ? (
                      <Sun className="size-4" />
                    ) : (
                      <Moon className="size-4" />
                    )}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
