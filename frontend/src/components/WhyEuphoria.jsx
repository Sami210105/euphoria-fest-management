import poster from "../assets/poster.png";
const vibes = [
  {
    slot: "tl",
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth={1.5} fill="none" stroke="#F5E6C8" className="w-7 h-7">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    title: "ICONIC\nVIBES",
    desc: "From retro throwbacks to modern bangers — every moment at Euphoria is curated to feel legendary.",
  },
  {
    slot: "bl",
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth={1.5} fill="none" stroke="#1a0a0a" className="w-7 h-7">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "EFFORTLESS\nPLANS",
    desc: "Register once, experience everything. No chaos, no confusion — just show up and let the fest do the rest.",
  },
  {
    slot: "bm",
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth={1.5} fill="none" stroke="#F5E6C8" className="w-7 h-7">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "FOR\nEVERYONE",
    desc: "Tech, art, music, culture — Euphoria isn't one thing. It's every thing you didn't know you needed.",
  },
  {
    slot: "br",
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth={1.5} fill="none" stroke="#F5E6C8" className="w-7 h-7">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M4.93 4.93a10 10 0 0 0 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M8.46 8.46a5 5 0 0 0 0 7.07"/>
      </svg>
    ),
    title: "WORTH\nTHE HYPE",
    desc: "Every corner is a memory waiting to happen. Come for the events, stay for the stories you'll tell forever.",
  },
];

const cardBase =
  "relative flex flex-col gap-3 p-7 overflow-hidden transition-all duration-300 group cursor-default";
const hoverBar =
  "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[#c05754] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100";

export default function WhyEuphoria() {
  const { tl, bl, bm, br } = Object.fromEntries(
    vibes.map((v) => [v.slot, v])
  );

  const Card = ({ data, bg, titleColor = "text-[#F5E6C8]", descColor = "text-[#c4b090]" }) => (
    <div className={`${cardBase} ${hoverBar} ${bg} hover:brightness-110`}>
      {data.icon}
      <h3
        className={`font-[Bebas_Neue] text-lg tracking-[2px] leading-tight ${titleColor}`}
        style={{ whiteSpace: "pre-line" }}
      >
        {data.title}
      </h3>
      <p className={`font-[Almendra] text-sm leading-relaxed ${descColor}`}>
        {data.desc}
      </p>
    </div>
  );

  return (
    <section className="px-6 py-16">
      <h2 className="font-[Bebas_Neue] text-6xl tracking-[8px] text-[#F5E6C8] text-center mb-12">
        WHY <span className="text-[#c05754]">EUPHORIA</span> ?
      </h2>

      {/* Grid: [left-cards] [image] [headline] [icon-cards] */}
      <div
        className="max-w-5xl mx-auto rounded-xl overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: "180px 1fr 180px 180px",
          gridTemplateRows: "auto auto",
          gap: "4px",
        }}
      >
        {/* Top-left */}
        <Card data={tl} bg="bg-[#795441]" />

        {/* Image — spans 2 rows */}
        <div style={{ gridColumn: 2, gridRow: "1 / 3" }} className="relative overflow-hidden">
          <img
            src={poster} 
            alt="Euphoria"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.85)" }}
          />
        </div>

        {/* Headline card */}
        <div
          style={{ gridColumn: "3 / 5", gridRow: 1 }}
          className="bg-[#F5E6C8] p-8 flex flex-col justify-center"
        >
          <span className="font-[Bebas_Neue] text-[2.5rem] leading-none tracking-[4px] text-[#1a0a0a]">
            WHY
          </span>
          <span className="font-[Bebas_Neue] text-[3.5rem] leading-none tracking-[4px] text-[#1a0a0a]">
            CHOOSE
            <br />
            EUPHORIA?
          </span>
          <p className="font-[Almendra] text-lg text-bold text-[#5a4030] mt-3 leading-relaxed max-w-[220px]">
            Every day we work hard to make every moment unforgettable — for you and everyone around you.
          </p>
        </div>

        {/* Bottom-left (light bg) */}
        <Card
          data={bl}
          bg="bg-[#b69f88]"
          titleColor="text-[#1a0a0a]"
          descColor="text-[#f5ead0]"
        />

        {/* Bottom-middle (teal) */}
        <Card data={bm} bg="bg-[#4e3a30]" descColor="text-[#f5ead0]" />

        {/* Bottom-right (black) */}
        <Card data={br} bg="bg-[#242021]" />
      </div>
    </section>
  );
}