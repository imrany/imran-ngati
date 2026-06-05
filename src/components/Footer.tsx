import { socialMediaLinks } from "@/pages/Index";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={`border-t border-border/60 ${className ?? ""}`}>
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>
          © {new Date().getFullYear()} Imran Ngati. All rights reserved.
        </span>
        <div className="flex gap-3">
          {socialMediaLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <link.icon className="size-4 hover:text-foreground transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
