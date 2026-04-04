export function GuestCard({ guest }) {
  return (
    <div className="relative overflow-hidden flex flex-wrap bg-gradient-to-br from-[#1e0606] to-[#0e0202] border border-[#5a1515] shadow-[0_20px_56px_rgba(0,0,0,0.6)]">

      <div className="w-[150px] h-[260px] bg-[#160404] overflow-hidden">
        <img src={guest.image} alt={guest.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 p-5">
        <span className="text-xs bg-[#8B1A1A] px-3 py-1 text-[#f5e6d3] font-bold tracking-widest">
          ⭐ {guest.tag}
        </span>

        <h3 className="text-[clamp(2rem,4vw,3rem)] text-[#f5e6d3] mt-2">
          {guest.name}
        </h3>
        <p className="text-[#c0392b] italic text-sm mb-2">
          {guest.title}
        </p>

        <p className="text-[#c9a88a] text-sm leading-relaxed">
          {guest.description}
        </p>

        <div className="flex gap-2 mt-4 flex-wrap">
          {guest.stats.map((s, i) => (
            <div key={i} className="px-3 py-2 bg-[#1a0404] border border-[#3a1010] text-center">
              <div className="text-[#f5e6d3] font-bold text-lg">{s.value}</div>
              <div className="text-xs text-[#9a5050] uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
