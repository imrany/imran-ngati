import { BlogPost } from "../../lib/types";

// ── VITE COMPILE-TIME MARKDOWN LOADER ──
export const loadMarkdownPosts = (): BlogPost[] => {
  const modules = import.meta.glob("/src/content/*.md", {
    eager: true,
    query: "?raw",
  });

  const posts = Object.entries(modules).map(([filepath, rawContent]) => {
    const slug = filepath.split("/").pop()?.replace(".md", "") || "";
    const fileString = (rawContent as { default: string }).default;

    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = fileString.match(frontmatterRegex);

    const metadata: Record<string, string> = {};
    let content = fileString;

    if (match) {
      const rawYaml = match[1];
      content = match[2];
      rawYaml.split("\n").forEach((line) => {
        const [key, ...valParts] = line.split(":");
        if (key && valParts.length) {
          metadata[key.trim()] = valParts
            .join(":")
            .trim()
            .replace(/^["']|["']$/g, "");
        }
      });
    }

    return {
      slug,
      title: metadata.title || "Untitled Article",
      kind: metadata.kind || "Engineering",
      date: metadata.date || "",
      blurb: metadata.blurb || "",
      gradient: metadata.gradient || "from-primary/10 to-transparent",
      tags: metadata.tags ? JSON.parse(metadata?.tags) : [],
      content,
      author: metadata.author || "",
      authorImage: metadata.authorImage,
      coverImage: metadata.coverImage,
      readTime: metadata.readTime || "5 min read",
      customBackground:
        metadata.customBackground && JSON.parse(metadata.customBackground),
    };
  });

  // Filter out duplicates by slug safely
  const uniquePostsMap = new Map<string, BlogPost>();
  posts.forEach((post) => {
    if (!uniquePostsMap.has(post.slug)) {
      uniquePostsMap.set(post.slug, post);
    }
  });

  return Array.from(uniquePostsMap.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};
