import { useState, useEffect } from "react";

const YEARS = [
  {
    year: 2025,
    theme: "Royal Rhapsody",
    accent: "#c9a96e",
    description:
      "Echoes of royalty, grace, and timeless celebration come alive.",
    photos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
        caption: "Main Stage",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
        caption: "Opening Night",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        caption: "Crowd Surge",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        caption: "DJ Set",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
        caption: "Laser Show",
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
        caption: "Backstage",
      },
    ],
  },
  {
    year: 2024,
    theme: "Neon Nights",
    accent: "#c05754",
    description:
      "Electric energy, bold colours & nights that stretched till dawn.",
    photos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
        caption: "Sunset Stage",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80",
        caption: "Golden Crowd",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
        caption: "Live Band",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&q=80",
        caption: "Euphoric Moment",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
        caption: "Performer",
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
        caption: "Night Finale",
      },
    ],
  },
  {
    year: 2023,
    theme: "Golden Era",
    accent: "#d4a853",
    description: "Vintage glamour, sepia tones & the magic of a bygone era.",
    photos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
        caption: "Vintage Night",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=800&q=80",
        caption: "Paint Party",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=800&q=80",
        caption: "Stage Show",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
        caption: "Crowd Energy",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
        caption: "Backdrop",
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1526218626217-dc65a29bb444?w=800&q=80",
        caption: "After Hours",
      },
    ],
  },
];

// ─── Photo Card ───────────────────────────────────────────────────────────────
function PhotoCard({ photo, accent, index, visible }) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer border"
      style={{
        aspectRatio: "4/3",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${index * 90}ms, transform 0.55s ease ${index * 90}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
        borderColor: hovered ? accent : accent + "44",
        boxShadow: hovered
          ? `0 0 0 1px ${accent}33, 0 10px 30px rgba(0,0,0,0.6)`
          : "0 4px 18px rgba(0,0,0,0.45)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!loaded && <div className="absolute inset-0 bg-[#2a1515]" />}

      <img
        src={photo.url}
        alt={photo.caption}
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover block"
        style={{
          opacity: loaded ? 1 : 0,
          filter: hovered
            ? "sepia(0.3) saturate(1.1) brightness(0.85)"
            : "sepia(0.5) saturate(0.75) brightness(0.55)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition:
            "filter 0.5s ease, transform 0.6s ease, opacity 0.4s ease",
        }}
      />

      {/* Top dashed strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `repeating-linear-gradient(90deg, ${accent}55 0px, ${accent}55 6px, transparent 6px, transparent 12px)`,
        }}
      />

      {/* Caption */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pt-8 text-[0.65rem] tracking-[0.18em] uppercase transition-all duration-300 font-[Almendra]"
        style={{
          color: accent,
          background: "linear-gradient(transparent, rgba(15,4,8,0.92))",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
        }}
      >
        {photo.caption}
      </div>
    </div>
  );
}

// ─── Year Tab ─────────────────────────────────────────────────────────────────
function YearTab({ data, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-6 sm:px-8 py-3 border leading-snug transition-all duration-300 text-center"
      style={{
        background: isActive ? data.accent + "18" : "transparent",
        color: isActive || hovered ? data.accent : "#7a4040",
        borderColor: isActive || hovered ? data.accent + "88" : "#4a1f1f",
      }}
    >
      <span className="block font-[Bebas_Neue] text-3xl tracking-tight leading-none">
        {data.year}
      </span>
      <span className="block font-[Dancing_Script] text-lg opacity-75 tracking-wide mt-0.5">
        {data.theme}
      </span>
      {isActive && (
        <span
          className="absolute -bottom-px left-1/2 -translate-x-1/2 w-2/5 h-0.5"
          style={{ background: data.accent }}
        />
      )}
    </button>
  );
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────
export default function Gallery() {
  const [activeYear, setActiveYear] = useState(2025);
  const [visible, setVisible] = useState(false);
  const active = YEARS.find((y) => y.year === activeYear);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [activeYear]);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease both; }
      `}</style>

      <section className="relative overflow-hidden bg-[#1C0F0F] min-h-screen">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Heading */}
          <div className="text-center py-18 sm:mb-14">
            <h2 className="text-[clamp(5rem,15vw,10rem)] tracking-widest text-[#f5e6d3] font-bold font-[Bebas_Neue]">
              Memories
            </h2>

            <p className="font-[Dancing_Script] text-3xl text-[#c05754] tracking-wide">
              A look back at the nights we lived
            </p>
          </div>

          {/* Year tabs */}
          <div className="flex justify-center gap-2 flex-wrap mb-10 sm:mb-12">
            {YEARS.map((y) => (
              <YearTab
                key={y.year}
                data={y}
                isActive={y.year === activeYear}
                onClick={() => setActiveYear(y.year)}
              />
            ))}
          </div>

          {/* Year sub-heading */}
          <div className="fade-up mb-7" key={activeYear}>
            <div className="flex items-center gap-3 mb-2.5">
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path
                  d="M7 0L8.4 5H14L9.3 8.1L11 14L7 10.8L3 14L4.7 8.1L0 5H5.6Z"
                  fill={active.accent}
                  opacity=".8"
                />
              </svg>
              <div
                className="h-px flex-1"
                style={{ background: active.accent + "44" }}
              />
              <span
                className="font-[Bebas_Neue] text-3xl px-6 py-3 border"
                style={{
                  color: active.accent,
                  borderColor: active.accent + "44",
                  background: active.accent + "18",
                }}
              >
                {active.year} — {active.theme}
              </span>
              <div
                className="h-px flex-1"
                style={{ background: active.accent + "44" }}
              />
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path
                  d="M7 0L8.4 5H14L9.3 8.1L11 14L7 10.8L3 14L4.7 8.1L0 5H5.6Z"
                  fill={active.accent}
                  opacity=".8"
                />
              </svg>
            </div>
            <p
              className="font-[Dancing_Script] text-center text-xl tracking-wide"
              style={{ color: active.accent + "99" }}
            >
              {active.description}
            </p>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {active.photos.map((photo, i) => (
              <PhotoCard
                key={`${activeYear}-${photo.id}`}
                photo={photo}
                accent={active.accent}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
