const vibes = [
  {
    title: "Iconic Vibes",
    desc: "From retro throwbacks to modern bangers — every moment at Euphoria is curated to feel legendary.",
  },
  {
    title: "Effortless Plans",
    desc: "Register once, experience everything. No chaos, no confusion — just show up and let the fest do the rest.",
  },
  {
    title: "Something For Everyone",
    desc: "Tech, art, music, culture — Euphoria isn't one thing. It's every thing you didn't know you needed.",
  },
  {
    title: "Worth The Hype",
    desc: "Every corner is a memory waiting to happen. Come for the events, stay for the stories you'll tell forever.",
  },
];

export default function WhyEuphoria() {
  return (
    <section className="px-6 py-16">

      <h2 className="font-[Bebas_Neue] text-6xl tracking-widest text-[#F5E6C8] text-center mb-12">
        WHY EUPHORIA ?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {vibes.map((v) => (
          <div
            key={v.title}
            className="group bg-black/40 backdrop-blur-md border-2 border-[#c0575450] p-8 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#c05754]"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c05754] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            <h3 className="font-[Bebas_Neue] text-2xl tracking-wide text-[#F5E6C8] mb-2">
              {v.title}
            </h3>
            <p className="font-[Almendra] text-sm text-[#d4b896] leading-relaxed">
              {v.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
