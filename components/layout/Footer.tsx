// FILE: components/layout/Footer.tsx
"use client";

export default function Footer() {
  return (
    <footer
      className="w-full bg-black"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="px-6 md:px-10 max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ padding: "32px 24px" }}
      >
        <p
          style={{
            fontSize:      "11px",
            letterSpacing: "0.15em",
            color:         "rgba(255,255,255,0.25)",
            fontFamily:    "Syne, sans-serif",
            fontWeight:    400,
            textTransform: "uppercase",
          }}
        >
          ©2026 SB Design. All Rights Reserved.
        </p>
        <a
          href="mailto:samuel@sbdesign.sk"
          data-cursor="link"
          className="transition-colors duration-200"
          style={{
            fontSize:      "11px",
            letterSpacing: "0.15em",
            color:         "rgba(255,255,255,0.25)",
            fontFamily:    "Syne, sans-serif",
            fontWeight:    400,
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
        >
          samuel@sbdesign.sk
        </a>
      </div>
    </footer>
  );
}
