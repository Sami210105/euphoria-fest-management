export function EventCard({ event, index }) {
  return (
    <div
      className="relative overflow-hidden flex flex-col p-5 bg-black/40 backdrop-blur-md border border-white/20 border border-[#3a1010] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(139,26,26,0.4)] hover:border-[#c0392b]"
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className="px-3 py-1 text-[10px] font-bold tracking-widest text-[#f5e6d3]"
          style={{ background: event.color }}
        >
          {event.category}
        </span>
        <span className="text-2xl">{event.icon}</span>
      </div>

      <h3 className="text-[clamp(1.5rem,3vw,2rem)] text-[#f5e6d3] tracking-wide mb-1">
        {event.title}
      </h3>
      <p className="text-[#c0392b] italic text-sm mb-2">
        {event.tagline}
      </p>

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#b07070] mb-2">
        <span>📅 {event.date}, 2026</span>
        <span>🕐 {event.time}</span>
        <span>📍 {event.venue}</span>
        <span>🎟 {event.seats} seats</span>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#4a1010] to-transparent my-2" />

      <p className="text-[#c9a88a] text-sm leading-relaxed mb-3 flex-1">
        {event.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {event.prizes.map((p, i) => (
          <span key={i} className="px-2 py-1 text-xs bg-[#1a0404] border border-[#4a1010] text-[#e8c9a0]">
            🏆 {p}
          </span>
        ))}
      </div>

      <button className="w-full py-2 text-xs tracking-widest font-bold border border-[#8B1A1A] text-[#c0392b]
      hover:bg-gradient-to-br hover:from-[#c05754] hover:to-[#c0392b] hover:text-[#f5e6d3] transition">
        REGISTER NOW →
      </button>
    </div>
  );
}
