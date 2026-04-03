import { useState, useEffect, useRef } from "react";

// ─── Photo data ────────────────────────────────────────────────────────────────
const YEARS = [
  {
    year: 2025,
    theme: "ROYAL RHAPSODY",
    accent: "#c9a96e",
    accentDim: "#c9a96e22",
    description: "Echoes of royalty, grace, and timeless celebration come alive.",
    photos: [
      { id: 1, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", caption: "Main Stage" },
      { id: 2, url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", caption: "Opening Night" },
      { id: 3, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", caption: "Crowd Surge" },
      { id: 4, url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80", caption: "DJ Set" },
      { id: 5, url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80", caption: "Laser Show" },
      { id: 6, url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80", caption: "Backstage" },
    ],
  },
  {
    year: 2024,
    theme: "NEON NIGHTS",
    accent: "#d4544a",
    accentDim: "#d4544a22",
    description: "Electric energy, bold colours & nights that stretched till dawn.",
    photos: [
      { id: 1, url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80", caption: "Sunset Stage" },
      { id: 2, url: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80", caption: "Golden Crowd" },
      { id: 3, url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80", caption: "Live Band" },
      { id: 4, url: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&q=80", caption: "Euphoric Moment" },
      { id: 5, url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80", caption: "Performer" },
      { id: 6, url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80", caption: "Night Finale" },
    ],
  },
  {
    year: 2023,
    theme: "GOLDEN ERA",
    accent: "#e8c97a",
    accentDim: "#e8c97a22",
    description: "Vintage glamour, sepia tones & the magic of a bygone era.",
    photos: [
      { id: 1, url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", caption: "Vintage Night" },
      { id: 2, url: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=800&q=80", caption: "Paint Party" },
      { id: 3, url: "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=800&q=80", caption: "Stage Show" },
      { id: 4, url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80", caption: "Crowd Energy" },
      { id: 5, url: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80", caption: "Backdrop" },
      { id: 6, url: "https://images.unsplash.com/photo-1526218626217-dc65a29bb444?w=800&q=80", caption: "After Hours" },
    ],
  },
];

// ─── Photo Card ────────────────────────────────────────────────────────────────
function PhotoCard({ photo, accent, index, visible }) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${index * 90}ms, transform 0.55s ease ${index * 90}ms`,
        position: "relative",
        overflow: "hidden",
        aspectRatio: "4/3",
        cursor: "pointer",
        border: `1px solid ${hovered ? accent : accent + "44"}`,
        boxShadow: hovered
          ? `0 0 0 1px ${accent}33, 0 10px 30px rgba(0,0,0,0.6)`
          : `0 4px 18px rgba(0,0,0,0.45)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!loaded && (
        <div style={{ position: "absolute", inset: 0, background: "#2a0d14" }} />
      )}

      <img
        src={photo.url}
        alt={photo.caption}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          opacity: loaded ? 1 : 0,
          filter: hovered
            ? "sepia(0.3) saturate(1.1) brightness(0.85)"
            : "sepia(0.5) saturate(0.75) brightness(0.55)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "filter 0.5s ease, transform 0.6s ease, opacity 0.4s ease",
        }}
      />

      {/* corner accent — bottom right */}
      <div style={{
        position: "absolute", bottom: 0, right: 0,
        width: 0, height: 0,
        borderStyle: "solid",
        borderWidth: "0 0 26px 26px",
        borderColor: `transparent transparent ${accent}bb transparent`,
      }} />

      {/* top dashed border strip */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: `repeating-linear-gradient(90deg, ${accent}55 0px, ${accent}55 6px, transparent 6px, transparent 12px)`,
      }} />

      {/* caption */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "22px 10px 8px",
        background: "linear-gradient(transparent, rgba(15,4,8,0.92))",
        fontFamily: "'Courier New', monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: accent,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        {photo.caption}
      </div>
    </div>
  );
}

// ─── Year Tab ─────────────────────────────────────────────────────────────────
function YearTab({ data, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  const show = isActive || hovered;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize: "0.7rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        padding: "10px 28px 10px",
        background: isActive ? data.accent + "18" : "transparent",
        color: show ? data.accent : "#7a4040",
        border: `1px solid ${show ? data.accent + "88" : "#4a1f1f"}`,
        cursor: "pointer",
        lineHeight: 1.4,
        transition: "all 0.3s ease",
        position: "relative",
      }}
    >
      <span style={{ display: "block", fontSize: "1.5rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: "0.05em" }}>
        {data.year}
      </span>
      <span style={{ fontSize: "0.6rem", opacity: 0.75, letterSpacing: "0.2em" }}>{data.theme}</span>
      {isActive && (
        <span style={{
          position: "absolute", bottom: -1, left: "50%", transform: "translateX(-50%)",
          width: "40%", height: 2, background: data.accent,
        }} />
      )}
    </button>
  );
}

// ─── Main Gallery ──────────────────────────────────────────────────────────────
export default function Gallery() {
  const [activeYear, setActiveYear] = useState(2025);
  const [visible, setVisible] = useState(false);

  const activeData = YEARS.find((y) => y.year === activeYear);

  // Re-trigger animation on year switch
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [activeYear]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Special+Elite&display=swap');

        @keyframes filmroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        #euphoria-gallery {
          background-color: #1a0810;
          background-image:
            radial-gradient(ellipse at 15% 10%, #2e0f18 0%, transparent 50%),
            radial-gradient(ellipse at 85% 90%, #250c14 0%, transparent 50%);
        }
      `}</style>

      <section id="euphoria-gallery" style={{ position: "relative", overflow: "hidden" }}>

        {/* ── Film strip top ── */}
        <div style={{ background: "#0e0509", borderBottom: "2px solid #2e1018", padding: "7px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 12, animation: "filmroll 22s linear infinite", width: "max-content" }}>
            {Array(50).fill(null).map((_, i) => (
              <div key={i} style={{
                width: 15, height: 21, border: "1.5px solid #4a1a28", borderRadius: 3,
                background: "#0a0307", flexShrink: 0,
              }} />
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "52px 24px 56px" }}>

          {/* ── Heading ── */}
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 14 }}>
              <div style={{ height: 1, width: 56, background: "linear-gradient(to right, transparent, #7a3a3a)" }} />
              <span style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: "0.68rem", letterSpacing: "0.45em",
                color: "#9e6060", textTransform: "uppercase",
              }}>
                Euphoria Fest
              </span>
              <div style={{ height: 1, width: 56, background: "linear-gradient(to left, transparent, #7a3a3a)" }} />
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              lineHeight: 1,
              color: "#f0dfc0",
              textShadow: "2px 2px 0 #5a1a28, 3px 3px 14px rgba(0,0,0,0.7)",
              margin: "0 0 12px",
              letterSpacing: "0.02em",
            }}>
              Memories
            </h2>

            <p style={{
              fontFamily: "'Special Elite', cursive",
              fontSize: "0.78rem", letterSpacing: "0.2em",
              color: "#7a4040", textTransform: "uppercase",
            }}>
              A look back at the nights we lived
            </p>
          </div>

          {/* ── Year tabs ── */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 44 }}>
            {YEARS.map((y) => (
              <YearTab key={y.year} data={y} isActive={y.year === activeYear} onClick={() => setActiveYear(y.year)} />
            ))}
          </div>

          {/* ── Year sub-heading ── */}
          <div style={{ animation: "fadeUp 0.4s ease", marginBottom: 28 }} key={activeYear}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              {/* ornament star */}
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0L8.4 5H14L9.3 8.1L11 14L7 10.8L3 14L4.7 8.1L0 5H5.6Z" fill={activeData.accent} opacity=".8"/></svg>
              <div style={{ height: 1, flex: 1, background: activeData.accent + "44" }} />
              <span style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: "0.62rem", letterSpacing: "0.35em",
                color: activeData.accent,
                padding: "4px 14px",
                border: `1px solid ${activeData.accent}44`,
                background: activeData.accentDim,
                textTransform: "uppercase",
              }}>
                {activeData.year} — {activeData.theme}
              </span>
              <div style={{ height: 1, flex: 1, background: activeData.accent + "44" }} />
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0L8.4 5H14L9.3 8.1L11 14L7 10.8L3 14L4.7 8.1L0 5H5.6Z" fill={activeData.accent} opacity=".8"/></svg>
            </div>
            <p style={{
              fontFamily: "'Special Elite', cursive",
              textAlign: "center", fontSize: "0.75rem",
              color: activeData.accent + "88", letterSpacing: "0.1em",
            }}>
              {activeData.description}
            </p>
          </div>

          {/* ── Photo grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 14,
          }}>
            {activeData.photos.map((photo, i) => (
              <PhotoCard
                key={`${activeYear}-${photo.id}`}
                photo={photo}
                accent={activeData.accent}
                index={i}
                visible={visible}
              />
            ))}
          </div>

          {/* ── Footer ── */}
          <div style={{ textAlign: "center", marginTop: 52 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 12 }}>
              <div style={{ height: 1, width: 72, background: "linear-gradient(to right, transparent, #4a1f1f)" }} />
              {/* film reel icon */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8.5" stroke="#4a1f1f" strokeWidth="1.2"/>
                <circle cx="10" cy="10" r="2.5" stroke="#4a1f1f" strokeWidth="1.2"/>
                <circle cx="10" cy="4"  r="1.3" fill="#4a1f1f"/>
                <circle cx="10" cy="16" r="1.3" fill="#4a1f1f"/>
                <circle cx="4"  cy="10" r="1.3" fill="#4a1f1f"/>
                <circle cx="16" cy="10" r="1.3" fill="#4a1f1f"/>
              </svg>
              <div style={{ height: 1, width: 72, background: "linear-gradient(to left, transparent, #4a1f1f)" }} />
            </div>
            <p style={{
              fontFamily: "'Special Elite', cursive",
              fontSize: "0.62rem", letterSpacing: "0.28em",
              color: "#4a1f1f", textTransform: "uppercase",
            }}>
              Euphoria © {activeData.year} — All rights reserved
            </p>
          </div>
        </div>

        {/* ── Film strip bottom ── */}
        <div style={{ background: "#0e0509", borderTop: "2px solid #2e1018", padding: "7px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 12, animation: "filmroll 22s linear infinite reverse", width: "max-content" }}>
            {Array(50).fill(null).map((_, i) => (
              <div key={i} style={{
                width: 15, height: 21, border: "1.5px solid #4a1a28", borderRadius: 3,
                background: "#0a0307", flexShrink: 0,
              }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}