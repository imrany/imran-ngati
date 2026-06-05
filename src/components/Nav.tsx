import { Github, MessageCircle, Moon, Sun, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import ContactDropdownContent from "./ContactDropdownContent";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useTheme } from "@/context/ThemeContext";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollState, setScrollState] = useState({
    visible: true,
    isAtTop: true,
  });

  const lastScrollY = useRef(0);
  const isHome = location.pathname === "/";

  // Navigation handler
  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (isHome) {
      const element = document.getElementById(href.replace("#", ""));
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: href } });
    }
  };

  // Handle auto-scroll on page load if coming from another page
  useEffect(() => {
    if (isHome && location.state?.scrollTo) {
      const element = document.getElementById(
        location.state.scrollTo.replace("#", ""),
      );
      requestAnimationFrame(() =>
        element?.scrollIntoView({ behavior: "smooth" }),
      );
      window.history.replaceState({}, document.title);
    }
  }, [isHome, location.state]);

  // Scroll listener optimized with useRef
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY < 20;
      const visible = currentScrollY < lastScrollY.current || isAtTop;

      setScrollState({ visible, isAtTop });
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#insights", label: "Insights" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
    { href: "#process", label: "InBoarding" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform
        ${scrollState.visible ? "translate-y-0" : "-translate-y-full"}
        ${scrollState.isAtTop ? "bg-transparent py-6" : "backdrop-blur-md bg-background/75 border-b border-border py-4"}
      `}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-sm font-bold tracking-tight hover:opacity-80"
        >
          Imran Ngati
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={() => window.open("https://github.com/imrany", "_blank")}
            variant="outline"
            className="hidden md:flex gap-2 rounded-full px-4 h-9"
          >
            <Github className="size-3.5" /> Github
          </Button>

          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full bg-foreground text-background px-4 h-9 text-xs uppercase font-semibold">
                  <MessageCircle className="size-3.5" /> Chat
                </Button>
              </DropdownMenuTrigger>
              <ContactDropdownContent />
            </DropdownMenu>
          </div>

          <Button
            onClick={toggleTheme}
            variant="outline"
            className="hidden md:flex size-9 rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-72">
                <nav className="flex flex-col gap-6 mt-10">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="text-left font-semibold text-lg"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
                <div className="fixed bottom-4 left-6">
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      toggleTheme();
                    }}
                    className="flex size-9 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
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
