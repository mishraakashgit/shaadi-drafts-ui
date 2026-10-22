import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 96px",
        background: "#f7f3e7",
        color: "#3f4a27",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
        <div style={{ fontSize: 76, lineHeight: 1.1 }}>Gifts, drafted with meaning.</div>
        <div style={{ fontSize: 30, marginTop: 28, color: "#79815e", lineHeight: 1.4 }}>
          Wedding gifting, festive hampers & custom keepsakes, delivered across India.
        </div>
        <div
          style={{ display: "flex", marginTop: 44, width: 140, height: 4, background: "#d9b96b" }}
        />
      </div>

      {/* The Shaadi Drafts badge */}
      <div
        style={{
          width: 300,
          height: 300,
          flexShrink: 0,
          borderRadius: 999,
          border: "5px solid #8a9668",
          background: "#fcfaf1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 50, fontWeight: 700, letterSpacing: 8, color: "#5e6b37" }}>
          SHAADI
        </div>
        <div style={{ fontSize: 22, letterSpacing: 12, color: "#8a9668", marginTop: 14 }}>
          DRAFTS
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22 }}>
          <div style={{ width: 30, height: 3, background: "#8a9668" }} />
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#5e6b37" }} />
          <div style={{ width: 30, height: 3, background: "#8a9668" }} />
        </div>
      </div>
    </div>,
    size,
  );
}
