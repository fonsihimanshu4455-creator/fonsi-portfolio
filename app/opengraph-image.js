import { ImageResponse } from "next/og";
import { SITE_TITLE, SITE_TAGLINE } from "@/lib/site";

export const runtime = "edge";
export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DOTS = [
  [2, 0], [3, 0],
  [1, 1], [2, 1], [3, 1], [4, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
  [1, 3], [2, 3], [3, 3], [4, 3],
  [2, 4], [3, 4],
];

function DotCluster({ size = 180, color = "#E51C23" }) {
  const cell = size / 6;
  const r = cell * 0.35;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {DOTS.map(([x, y], i) => (
        <circle
          key={i}
          cx={x * cell + cell / 2}
          cy={y * cell + cell / 2}
          r={r}
          fill={color}
        />
      ))}
    </svg>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(1200px 800px at 85% 10%, rgba(229,28,35,0.35), transparent 60%), radial-gradient(800px 600px at 10% 100%, rgba(59,10,15,0.6), transparent 60%), #0B0607",
          color: "#F7F2EE",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <DotCluster size={72} />
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#E51C23",
            }}
          >
            FONSI
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Turning{" "}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "3px solid #E51C23",
                borderRadius: 10,
                padding: "0 16px",
                color: "#E51C23",
              }}
            >
              Ads
            </span>{" "}
            Into Actual Revenue.
          </div>

          <div
            style={{
              fontSize: 30,
              color: "#A69A97",
              letterSpacing: "-0.01em",
              maxWidth: 900,
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#A69A97",
          }}
        >
          <div>Himanshu Bhardwaj · India · Worldwide</div>
          <div style={{ color: "#E51C23", fontWeight: 600 }}>
            fonsi-portfolio.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
