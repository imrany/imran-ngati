// Types matching the Go API (snake_case JSON keys)
export type BlogPost = {
  slug: string;
  title: string;
  kind: string;
  date: string;
  tags?: string[];
  blurb: string;
  gradient?: string;
  content: string;
  // ── NEW RICH META FIELDS ──
  author: string;
  authorImage?: string;
  coverImage?: string;
  readTime: string;
  customBackground?: Record<string, string>;
};
