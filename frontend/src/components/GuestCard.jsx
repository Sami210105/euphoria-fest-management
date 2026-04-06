export default function GuestCard({ guest }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden flex p-6 gap-6 transition-all duration-300 hover:-translate-y-[3px]">

      {/* LEFT IMAGE */}
      <div className="w-[350px] flex items-center justify-center border-4 border-[#C9A88A] rounded-2xl overflow-hidden">
        <img src={guest.image} alt={guest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-4 rounded-2xl bg-black backdrop-blur-md">

        {/* Name */}
        <h2 className="text-4xl font-bold text-[#f5e6d3] tracking-wide font-[Almendra] transition-all duration-300 group-hover:text-[#fff3e6]">
          {guest.name}
        </h2>

        {/* Subtitle */}
        <p className="text-[#C05754] font-[Almendra] mt-1 mb-3">
          {guest.title}
        </p>

        {/* Team badge */}
        <span className="inline-block bg-[#0e1e0a] border border-[#2d5a1b] text-[#6ab04c] text-xs px-3 py-1 mb-4">
          {guest.team}
        </span>

        {/* Description */}
        <p className="text-[#F5E6D3] text-sm leading-relaxed mb-5">
          {guest.description}
        </p>

        {/* Stats */}
        <div className="flex gap-4 mb-5 flex-wrap">
          {guest.stats.map((s, i) => (
            <div
              key={i}
              className="px-4 py-3 bg-[#C9A88A]/10 rounded-2xl text-center min-w-[70px]"
            >
              <div className="text-[#8B1A1A] text-xl font-bold">
                {s.value}
              </div>
              <div className="text-[12px] text-[#C9A88A] tracking-wider uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#C9A88A] rounded-2xl px-3 py-3 flex items-center gap-4">
          <div>
            <p className="text-[10px] tracking-widest text-[#8B1A1A] font-bold uppercase">
              Fan Meet & Greet
            </p>
            <p className="text-sm font-bold text-[#9a5050]">
              {guest.event}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}