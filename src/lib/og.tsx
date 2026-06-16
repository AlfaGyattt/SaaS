import { ImageResponse } from "next/og";

// Image Open Graph partagée (1200×630). next/og = satori : flexbox uniquement,
// couleurs littérales (pas de variables CSS), styles inline.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#0B1220";
const PRIMARY = "#3D5AFE";
const ACCENT = "#FF6B4A";

export function renderOgImage({
  eyebrow,
  title,
  footer = "postulo.fr",
}: {
  eyebrow?: string;
  title: string;
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: `linear-gradient(135deg, ${INK} 0%, #16233f 60%, #1d2b4d 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        {/* Marque */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: PRIMARY,
              color: "#fff",
              fontSize: "38px",
              fontWeight: 800,
            }}
          >
            P
          </div>
          <div style={{ display: "flex", color: "#fff", fontSize: "34px", fontWeight: 700 }}>
            Postulo
          </div>
        </div>

        {/* Titre */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "8px 20px",
                borderRadius: "999px",
                background: "rgba(255,107,74,0.16)",
                color: ACCENT,
                fontSize: "26px",
                fontWeight: 600,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              color: "#fff",
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Pied */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#94a3b8",
            fontSize: "28px",
          }}
        >
          <div style={{ display: "flex", width: "40px", height: "4px", background: ACCENT, borderRadius: "2px" }} />
          {footer}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
