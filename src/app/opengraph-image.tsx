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
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: "#f7f3e7",
        color: "#3f4a27",
      }}
    >
      <div
        style={{ fontSize: 28, letterSpacing: 10, textTransform: "uppercase", color: "#79815e" }}
      >
        {site.name}
      </div>
      <div style={{ fontSize: 88, marginTop: 28, lineHeight: 1.05 }}>
        Gifts, drafted with meaning.
      </div>
      <div style={{ fontSize: 32, marginTop: 28, color: "#79815e", maxWidth: 900 }}>
        Wedding gifting, festive hampers & custom keepsakes, delivered across India.
      </div>
      <div
        style={{ display: "flex", marginTop: 56, width: 160, height: 4, background: "#d9b96b" }}
      />
    </div>,
    size,
  );
}
