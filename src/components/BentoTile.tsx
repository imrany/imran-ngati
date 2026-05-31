import { ArrowUpRight } from "lucide-react";

export default function BentoTile({
  className = "",
  gradient,
  label,
  url,
  image,
}: {
  className: string;
  gradient: string;
  label: string;
  url?: string;
  image?: string;
}) {
  function openURL() {
    if (url) window.open(url, "_blank");
  }
  return (
    <div
      onClick={openURL}
      className={`${url && "cursor-pointer"} relative overflow-hidden rounded-2xl border border-border/80 bg-card group transition-all duration-300 hover:border-border-strong ${className}`}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient} to-transparent`}
      />
      {image && (
        <>
          <img
            src={image}
            alt={label}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        </>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="relative h-full w-full p-5 flex items-end justify-between z-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground/90 backdrop-blur-[2px] rounded-md px-1 py-0.5">
          {label}
        </span>
        {url && (
          <div className="rounded-full bg-background/40 p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 backdrop-blur-sm border border-border">
            <ArrowUpRight className="size-3.5 text-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
