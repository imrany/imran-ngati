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

  // Use refs for values that change frequently but shouldn't trigger re-renders
  const lastScrollY = useRef(0);
  const [scrollState, setScrollState] = useState({
    visible: true,
    isAtTop: true,
  });

  const isHome = location.pathname === "/";

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
  }, []); // Empty dependency array is now safe

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
      {/* ... rest of your JSX remains identical ... */}
    </header>
  );
}
