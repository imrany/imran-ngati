import { useTheme } from "@/hooks/use-theme";
import { Github, MessageCircle, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import ContactDropdownContent from "./ContactDropdownContent";
import { Button } from "./ui/button";

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
          <Button
            onClick={() => openURL("https://github.com/imrany")}
            aria-label="https://github.com/imrany"
            className="inline-flex cursor-pointer max-sm:size-9 items-center gap-2 text-foreground rounded-full border border-border bg-card/40 hover:bg-secondary transition-all duration-200"
          >
            <Github className="size-3.5" />
            <span className="hidden sm:inline">Github</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="inline-flex items-center max-sm:size-9 gap-2 cursor-pointer rounded-full bg-foreground text-background px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-all duration-200 shadow-sm focus:outline-none">
                <MessageCircle className="size-3.5" />
                <span className="hidden sm:inline">Chat</span>
              </Button>
            </DropdownMenuTrigger>
            <ContactDropdownContent
              EMAIL_URL={EMAIL_URL}
              PHONE_URL={PHONE_URL}
              WHATSAPP_URL={WHATSAPP_URL}
            />
          </DropdownMenu>

          <Button
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center size-9 rounded-full border border-border bg-card/40 hover:bg-secondary transition-all duration-200"
          >
            {theme === "dark" ? (
              <Sun className="size-4 text-foreground" />
            ) : (
              <Moon className="size-4 text-foreground" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
