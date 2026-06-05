import { BookOpen } from "lucide-react";
import { useState } from "react";

// Helper component to handle per-image error state
export default function PostImage({ src, alt }: { src?: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="w-full h-full bg-linear-to-br from-secondary/20 to-transparent flex items-center justify-center">
        <BookOpen className="size-8 text-muted-foreground/10" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
