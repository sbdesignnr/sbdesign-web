import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog-api";
import { site } from "@/lib/site";

export const alt = "SB Design — blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A branded social-share image with the article title. Generated per post so
// links look professional on Facebook/LinkedIn/X.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  const title = (post?.title ?? "SB Design").slice(0, 120);

  // Inter (Latin Extended) so Slovak diacritics render correctly. Best-effort.
  let fonts: { name: string; data: ArrayBuffer; weight: 400 | 700 }[] | undefined;
  try {
    const [bold, reg] = await Promise.all([
      fetch("https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-ext-700-normal.woff").then((r) => r.arrayBuffer()),
      fetch("https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-ext-400-normal.woff").then((r) => r.arrayBuffer()),
    ]);
    fonts = [
      { name: "Inter", data: bold, weight: 700 },
      { name: "Inter", data: reg, weight: 400 },
    ];
  } catch {
    fonts = undefined;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0c 0%, #14141a 100%)",
          padding: "72px 80px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#4f8ff7" }} />
          <div style={{ fontSize: 30, fontWeight: 700, color: "#f5f5f4", letterSpacing: -0.5 }}>SB Design</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 58 : 72,
            fontWeight: 700,
            color: "#f5f5f4",
            lineHeight: 1.1,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, color: "#a1a1aa" }}>{site.tagline}</div>
          <div style={{ fontSize: 24, color: "#4f8ff7", fontWeight: 700 }}>{site.domain}</div>
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) },
  );
}
