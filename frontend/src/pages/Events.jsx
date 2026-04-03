import { useState, useEffect, useRef } from "react";

/* ─── Google Fonts ─── */
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;600;700&family=Playfair+Display:ital,wght@0,700;1,400&family=Lora:wght@400;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #0e0202; }
    ::-webkit-scrollbar-thumb { background: #5a1515; border-radius: 3px; }

    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* ── Card hover: entire card lifts + button fills ── */
    .evt-card {
      transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, transform 0.25s ease;
    }
    .evt-card:hover {
      border-color: #c0392b !important;
      box-shadow: 0 20px 52px rgba(139,26,26,0.4) !important;
      background: linear-gradient(135deg, #2d0909, #1c0404) !important;
      transform: translateY(-3px);
    }

    /* Register button – visible in both states */
    .reg-btn {
      width: 100%;
      padding: 11px 0;
      font-family: 'Oswald', sans-serif;
      font-weight: 700;
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      border: 2px solid #8B1A1A;
      background: transparent;
      color: #c0392b;           /* visible in default state */
      cursor: pointer;
      transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
    .reg-btn:hover,
    .evt-card:hover .reg-btn {
      background: linear-gradient(135deg, #8B1A1A, #c0392b);
      color: #f5e6d3 !important;
      border-color: #c0392b;
    }

    /* Filter buttons */
    .filter-btn {
      padding: 6px 14px;
      font-size: 0.68rem;
      font-family: 'Oswald', sans-serif;
      font-weight: 700;
      letter-spacing: 0.14em;
      background: #1a0404;
      color: #9a5050;
      border: 1px solid #2a0808;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .filter-btn:hover { color: #c9a88a; border-color: #5a1515; }
    .filter-btn.active {
      background: linear-gradient(135deg, #8B1A1A, #c0392b) !important;
      color: #f5e6d3 !important;
      border-color: #c0392b !important;
    }

    /* Day tab buttons */
    .day-tab {
      padding: 8px 20px;
      font-family: 'Oswald', sans-serif;
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.14em;
      cursor: pointer;
      border: 1px solid #2a0808;
      background: #1a0404;
      color: #6a3030;
      transition: all 0.2s ease;
    }
    .day-tab:hover { color: #c9a88a; border-color: #5a1515; }
    .day-tab.active {
      background: linear-gradient(135deg, #8B1A1A, #c0392b);
      color: #f5e6d3;
      border-color: #c0392b;
    }
  `}</style>
);

/* ─── Data (dateOrder used for sorting) ─── */
const EVENTS = [
  {
    id: 1, category: "MUSIC", icon: "🎸", color: "#8B1A1A",
    title: "Battle of Bands", tagline: "Let the guitars rage",
    date: "APR 18", dateOrder: 1, time: "6:00 PM", venue: "Open Air Amphitheatre", seats: 500,
    description: "Six bands. One stage. Zero mercy. Bring your best riffs and let the crowd decide who rules the night. Original compositions only — no covers allowed.",
    prizes: ["₹25,000 Cash", "Recording Session", "Trophy"],
  },
  {
    id: 2, category: "DANCE", icon: "🕺", color: "#5C1111",
    title: "Retro Groove", tagline: "Boogie back to the golden era",
    date: "APR 19", dateOrder: 2, time: "4:00 PM", venue: "Main Hall", seats: 300,
    description: "A solo and duo dance competition celebrating the golden eras of Bollywood and Disco. Think bell-bottoms, glitter, and grooves that move the soul.",
    prizes: ["₹20,000 Cash", "Trophies", "Merch Kit"],
  },
  {
    id: 3, category: "FILM", icon: "🎬", color: "#7A1F1F",
    title: "Reel Rumble", tagline: "Lights, camera, compete",
    date: "APR 18", dateOrder: 1, time: "10:00 AM", venue: "Screening Room B", seats: 120,
    description: "A 48-hour short film challenge — teams get a genre, prop and dialogue prompt, then must deliver a complete film judged on creativity and storytelling.",
    prizes: ["₹15,000 Cash", "Festival Screening", "Certificate"],
  },
  {
    id: 4, category: "GAMING", icon: "🕹️", color: "#4A0E0E",
    title: "Arcade Royale", tagline: "Old school. No mercy.",
    date: "APR 20", dateOrder: 3, time: "2:00 PM", venue: "Tech Pavilion", seats: 200,
    description: "Tournament across retro classics — Tekken, Street Fighter, Mario Kart and more. Single elimination. The last player standing takes everything.",
    prizes: ["₹12,000 Cash", "Gaming Peripherals", "Trophy"],
  },
  {
    id: 5, category: "ART", icon: "🎨", color: "#6B1616",
    title: "Canvas Chaos", tagline: "Paint the night red",
    date: "APR 19", dateOrder: 2, time: "11:00 AM", venue: "Art Wing", seats: 80,
    description: "Live painting competition with a hidden theme revealed at the start. Artists get 3 hours to interpret, create, and astonish. All mediums welcome.",
    prizes: ["₹10,000 Cash", "Art Supplies Kit", "Exhibition Spot"],
  },
  {
    id: 6, category: "THEATRE", icon: "🎭", color: "#3D0A0A",
    title: "Drama Mania", tagline: "All the world's a stage",
    date: "APR 20", dateOrder: 3, time: "5:30 PM", venue: "Black Box Theatre", seats: 150,
    description: "10-minute street play competition. Teams of 5–10 tackle a social theme with raw energy, improvisation, and fearless storytelling. No props provided.",
    prizes: ["₹18,000 Cash", "Best Actor Award", "Trophy"],
  },
];

const DATES = [
  { label: "ALL DAYS", value: "ALL" },
  { label: "APR 18 · DAY 1", value: "APR 18" },
  { label: "APR 19 · DAY 2", value: "APR 19" },
  { label: "APR 20 · DAY 3", value: "APR 20" },
];

const GUESTS = [
  {
    name: "Rohit Sharma",
    title: "Cricket Legend & The Hitman",
    number: "45",
    tag: "Special Guest",
    image: "/rohit.jpg",
    description: "The Hitman himself graces Euphoria 2026. India's record-breaking opener and beloved captain joins us for an exclusive fan interaction — up close, unscripted, unforgettable.",
    stats: [{ label: "ODI 100s", value: "31" }, { label: "T20I Runs", value: "4k+" }, { label: "IPL Titles", value: "5" }],
  },
  {
    name: "Virat Kohli",
    title: "King of Cricket",
    number: "18",
    tag: "Star Guest",
    image: "/virat.jpg",
    description: "One of the greatest batsmen of all time, Virat Kohli brings his passionate energy off the field to Euphoria for a never-before-seen conversation on sport, life, and legacy.",
    stats: [{ label: "ODI 100s", value: "54" }, { label: "Test Runs", value: "9k+" }, { label: "Cups Won", value: "2" }],
  },
];

/* ─── Fade-in hook ─── */
function useFadeIn(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Shared UI ─── */
function SectionLabel({ children }) {
  return (
    <p style={{ color: "#8B1A1A", fontFamily: "'Oswald',sans-serif", letterSpacing: "0.3em", fontSize: "0.68rem", textAlign: "center", marginBottom: 6 }}>
      ✦ {children} ✦
    </p>
  );
}
function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(2.6rem,7vw,5.5rem)", color: "#f5e6d3", letterSpacing: "0.06em", lineHeight: 1, textAlign: "center" }}>
      {children}
    </h2>
  );
}
function Hairline() {
  return <div style={{ height: 1, background: "linear-gradient(to right,transparent,#4a1010,transparent)", margin: "14px 0" }} />;
}

/* ─── Event Card ─── */
function EventCard({ event, index }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      className="evt-card"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        background: "linear-gradient(135deg, #1e0606, #120303)",
        border: "1px solid #3a1010",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
        cursor: "pointer",
      }}
    >
      {/* Top row: category + icon */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ display: "inline-block", padding: "3px 10px", fontSize: "0.65rem", fontFamily: "'Oswald',sans-serif", fontWeight: 700, letterSpacing: "0.18em", background: event.color, color: "#f5e6d3" }}>
          {event.category}
        </span>
        <span style={{ fontSize: "1.9rem", lineHeight: 1 }}>{event.icon}</span>
      </div>

      {/* Title + tagline */}
      <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(1.55rem,3.5vw,2rem)", color: "#f5e6d3", letterSpacing: "0.04em", lineHeight: 1, marginBottom: 4 }}>
        {event.title}
      </h3>
      <p style={{ color: "#c0392b", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.85rem", marginBottom: 10 }}>
        {event.tagline}
      </p>

      {/* Meta */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginBottom: 10, fontFamily: "'Oswald',sans-serif", color: "#b07070", fontSize: "0.7rem", letterSpacing: "0.07em", fontWeight: 600 }}>
        <span>📅 {event.date}, 2026</span>
        <span>🕐 {event.time}</span>
        <span>📍 {event.venue}</span>
        <span>🎟 {event.seats} seats</span>
      </div>

      <Hairline />

      {/* Description */}
      <p style={{ color: "#c9a88a", fontFamily: "'Lora',serif", fontSize: "0.83rem", lineHeight: 1.65, flex: 1, marginBottom: 12 }}>
        {event.description}
      </p>

      {/* Prizes */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {event.prizes.map((p, i) => (
          <span key={i} style={{ padding: "4px 9px", fontSize: "0.68rem", background: "#1a0404", border: "1px solid #4a1010", color: "#e8c9a0", fontFamily: "'Oswald',sans-serif" }}>
            🏆 {p}
          </span>
        ))}
      </div>

      {/* Register button — always visible */}
      <button className="reg-btn">REGISTER NOW →</button>

      {/* Corner accent */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 36, height: 36, background: `linear-gradient(135deg,transparent 50%,${event.color}70 50%)`, pointerEvents: "none" }} />
    </div>
  );
}

/* ─── Guest Card ─── */
function GuestCard({ guest, index }) {
  const [ref, visible] = useFadeIn(0.1);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        background: "linear-gradient(150deg,#1e0606,#0e0202 55%,#1a0808)",
        border: "1px solid #5a1515",
        boxShadow: "0 20px 56px rgba(0,0,0,0.6)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.65s ease ${index * 0.15}s, transform 0.65s ease ${index * 0.15}s`,
      }}
    >
      {/* Jersey number watermark */}
      <div style={{ position: "absolute", right: -8, bottom: -8, fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(7rem,20vw,12rem)", color: "#1a0404", lineHeight: 0.85, pointerEvents: "none", userSelect: "none" }}>
        {guest.number}
      </div>

      {/* Photo */}
      <div style={{ flexShrink: 0, width: "clamp(120px,28%,190px)", minHeight: 260, background: "#160404", borderRight: "1px solid #3a1010", position: "relative", overflow: "hidden" }}>
        {!imgErr ? (
          <img
            src={guest.image}
            alt={guest.name}
            onError={() => setImgErr(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", filter: "sepia(12%) contrast(1.05)" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>🏏</div>
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 50, background: "linear-gradient(to top,#0e0202,transparent)" }} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 220, position: "relative", zIndex: 1, padding: "clamp(16px,3vw,24px)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 12 }}>
        <div>
          <span style={{ display: "inline-block", padding: "3px 10px", fontSize: "0.65rem", fontFamily: "'Oswald',sans-serif", fontWeight: 700, letterSpacing: "0.14em", background: "#8B1A1A", color: "#f5e6d3", marginBottom: 10 }}>
            ⭐ {guest.tag}
          </span>

          <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(1.9rem,5vw,3rem)", color: "#f5e6d3", letterSpacing: "0.04em", lineHeight: 1, marginBottom: 4 }}>
            {guest.name}
          </h3>
          <p style={{ color: "#c0392b", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(0.82rem,1.8vw,0.95rem)", marginBottom: 8 }}>
            {guest.title}
          </p>

          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", fontSize: "0.65rem", fontFamily: "'Oswald',sans-serif", letterSpacing: "0.08em", background: "#0e1e0a", border: "1px solid #2d5a1b", color: "#6ab04c", marginBottom: 12 }}>
            🇮🇳 TEAM INDIA · #{guest.number}
          </span>

          <div style={{ width: 36, height: 2, background: "linear-gradient(to right,#8B1A1A,transparent)", marginBottom: 10 }} />

          <p style={{ color: "#c9a88a", fontFamily: "'Lora',serif", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: 12 }}>
            {guest.description}
          </p>

          {/* Stats */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {guest.stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "8px 12px", background: "#1a0404", border: "1px solid #3a1010", minWidth: 60 }}>
                <div style={{ fontFamily: "'Bebas Neue',cursive", color: "#f5e6d3", fontSize: "1.25rem", letterSpacing: "0.04em" }}>{s.value}</div>
                <div style={{ fontFamily: "'Oswald',sans-serif", color: "#9a5050", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Meet & Greet */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#1a0808", border: "1px dashed #4a1010" }}>
          <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>🎟</span>
          <div>
            <p style={{ fontFamily: "'Oswald',sans-serif", color: "#8B1A1A", fontSize: "0.65rem", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase" }}>Fan Meet & Greet</p>
            <p style={{ fontFamily: "'Lora',serif", color: "#9a5050", fontSize: "0.72rem" }}>Apr 20, 2026 · 3:00 PM · VIP Lounge</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Date Group Header ─── */
function DateHeader({ date, dayNum }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(16px,3vw,24px)", marginTop: "clamp(32px,5vw,52px)" }}>
      {/* Day pill */}
      <div style={{ flexShrink: 0, textAlign: "center", padding: "8px 18px", background: "linear-gradient(135deg,#8B1A1A,#c0392b)", boxShadow: "0 4px 16px rgba(139,26,26,0.4)" }}>
        <div style={{ fontFamily: "'Oswald',sans-serif", color: "#f5e6d3aa", fontSize: "0.6rem", letterSpacing: "0.2em" }}>DAY</div>
        <div style={{ fontFamily: "'Bebas Neue',cursive", color: "#f5e6d3", fontSize: "1.8rem", lineHeight: 1, letterSpacing: "0.05em" }}>{dayNum}</div>
      </div>
      {/* Date text */}
      <div>
        <div style={{ fontFamily: "'Bebas Neue',cursive", color: "#f5e6d3", fontSize: "clamp(1.6rem,4vw,2.6rem)", letterSpacing: "0.06em", lineHeight: 1 }}>
          {date === "APR 18" ? "APRIL 18, 2026" : date === "APR 19" ? "APRIL 19, 2026" : "APRIL 20, 2026"}
        </div>
        <div style={{ fontFamily: "'Playfair Display',serif", color: "#c0392b", fontStyle: "italic", fontSize: "0.82rem", marginTop: 2 }}>
          {date === "APR 18" ? "Opening Day" : date === "APR 19" ? "The Grand Middle" : "Finale Night"}
        </div>
      </div>
      {/* Line */}
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,#4a1010,transparent)", marginLeft: 8 }} />
    </div>
  );
}

/* ─── Main Page ─── */
export default function EventsPage() {
  const [activeDate, setActiveDate] = useState("ALL");

  // Sort all events by date then time, group by date
  const sortedEvents = [...EVENTS].sort((a, b) => {
    if (a.dateOrder !== b.dateOrder) return a.dateOrder - b.dateOrder;
    // Sort by time within same day
    const toMin = t => { const [h, m] = t.replace(" AM","").replace(" PM","").split(":").map(Number); return (t.includes("PM") && h !== 12 ? h + 12 : h) * 60 + m; };
    return toMin(a.time) - toMin(b.time);
  });

  const uniqueDates = [...new Set(sortedEvents.map(e => e.date))]; // ["APR 18","APR 19","APR 20"]

  const filteredDates = activeDate === "ALL" ? uniqueDates : [activeDate];

  return (
    <div style={{ background: "#1a0505", minHeight: "100vh", fontFamily: "'Lora',serif" }}>
      <FontImport />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(ellipse at 50% 70%,#2a0808 0%,#1a0404 40%,#0e0202 100%)", padding: "clamp(52px,11vw,110px) clamp(20px,5vw,60px) clamp(44px,8vw,80px)" }}>
        {/* Film holes left */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "clamp(14px,2.5vw,24px)", background: "#0e0202", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "6px 0" }}>
          {Array.from({ length: 16 }).map((_, i) => <div key={i} style={{ margin: "0 2px", height: 7, borderRadius: 2, background: "#2a0808" }} />)}
        </div>
        {/* Film holes right */}
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "clamp(14px,2.5vw,24px)", background: "#0e0202", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "6px 0" }}>
          {Array.from({ length: 16 }).map((_, i) => <div key={i} style={{ margin: "0 2px", height: 7, borderRadius: 2, background: "#2a0808" }} />)}
        </div>
        {/* Ring */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(500px,88vw)", height: "min(500px,88vw)", borderRadius: "50%", border: "1px solid #2a0808", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <SectionLabel>Euphoria 2026</SectionLabel>
          <h1 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(5rem,20vw,12rem)", color: "#f5e6d3", letterSpacing: "0.08em", lineHeight: 0.88, textShadow: "0 0 80px rgba(139,26,26,0.55)" }}>
            EVENTS
          </h1>
          <p style={{ color: "#c0392b", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(0.92rem,2.5vw,1.25rem)", marginTop: 14 }}>
            Where every night becomes a legend
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "6px 20px", marginTop: 18, fontFamily: "'Oswald',sans-serif", color: "#7a4040", fontSize: "0.68rem", letterSpacing: "0.22em" }}>
            <span>APR 18–20</span>
            <span style={{ color: "#3a1010" }}>◆</span>
            <span>6 EVENTS</span>
            <span style={{ color: "#3a1010" }}>◆</span>
            <span>₹1,00,000+ PRIZES</span>
          </div>
        </div>
      </section>

      {/* ══ DATE FILTER BAR ══ */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(10,1,1,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1e0606", padding: "10px 16px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
        {DATES.map(d => (
          <button
            key={d.value}
            onClick={() => setActiveDate(d.value)}
            className={`day-tab${activeDate === d.value ? " active" : ""}`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* ══ EVENTS — GROUPED BY DATE ══ */}
      <section style={{ maxWidth: 1300, margin: "0 auto", padding: "clamp(16px,4vw,40px) clamp(12px,4vw,28px) clamp(24px,5vw,56px)" }}>
        {filteredDates.map((date, di) => {
          const dayEvents = sortedEvents.filter(e => e.date === date);
          const dayNum = date === "APR 18" ? "01" : date === "APR 19" ? "02" : "03";
          return (
            <div key={date}>
              <DateHeader date={date} dayNum={dayNum} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: "clamp(12px,2vw,22px)" }}>
                {dayEvents.map((ev, i) => <EventCard key={ev.id} event={ev} index={i} />)}
              </div>
            </div>
          );
        })}
      </section>

      {/* ══ TICKER ══ */}
      <div style={{ overflow: "hidden", background: "#0e0202", borderTop: "2px solid #180404", borderBottom: "2px solid #180404", height: 38, display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "2rem", whiteSpace: "nowrap", animation: "marquee 24s linear infinite", fontFamily: "'Oswald',sans-serif", color: "#2e0808", fontSize: "0.62rem", letterSpacing: "0.28em" }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>✦ BATTLE OF BANDS ◆ RETRO GROOVE ◆ REEL RUMBLE ◆ ARCADE ROYALE ◆ CANVAS CHAOS ◆ DRAMA MANIA</span>
          ))}
        </div>
      </div>

      {/* ══ SPECIAL GUESTS ══ */}
      <section style={{ maxWidth: 1300, margin: "0 auto", padding: "clamp(40px,8vw,80px) clamp(12px,4vw,28px)" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,52px)" }}>
          <SectionLabel>Exclusive Appearances</SectionLabel>
          <SectionTitle>Special Guests</SectionTitle>
          <p style={{ color: "#c0392b", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(0.88rem,2vw,1.05rem)", marginTop: 8 }}>
            Icons off the field, legends on the stage
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,460px),1fr))", gap: "clamp(14px,3vw,28px)" }}>
          {GUESTS.map((g, i) => <GuestCard key={g.name} guest={g} index={i} />)}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ textAlign: "center", padding: "clamp(48px,10vw,96px) clamp(16px,4vw,32px)", background: "radial-gradient(ellipse at center,#280808 0%,#0e0202 65%)" }}>
        <SectionLabel>Don't Miss Out</SectionLabel>
        <h2 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(2.8rem,9vw,6rem)", color: "#f5e6d3", letterSpacing: "0.06em", marginBottom: 12 }}>
          Ready for Euphoria?
        </h2>
        <p style={{ color: "#c0392b", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(0.88rem,2vw,1.05rem)", marginBottom: 28 }}>
          Seats fill fast — secure yours before the curtain rises
        </p>
        <button
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(192,57,43,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 28px rgba(139,26,26,0.45)"; }}
          style={{ padding: "14px clamp(28px,6vw,56px)", fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.2em", background: "linear-gradient(135deg,#8B1A1A,#c0392b)", color: "#f5e6d3", border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(139,26,26,0.45)", transition: "transform 0.2s,box-shadow 0.2s" }}>
          REGISTER FOR ALL EVENTS →
        </button>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ textAlign: "center", padding: "18px 16px", background: "#0a0101", borderTop: "1px solid #180404" }}>
        <p style={{ fontFamily: "'Oswald',sans-serif", color: "#3a1010", fontSize: "0.62rem", letterSpacing: "0.22em" }}>
          ✦ EUPHORIA 2026 · LOSE YOURSELF IN THE MAGIC ✦
        </p>
      </footer>
    </div>
  );
}
