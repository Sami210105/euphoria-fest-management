import PhotoCard from "../components/PhotoCard";
import DiscoScene from "../components/DiscoScene";
import cta from "../assets/cta.png";

function Home() {
  return (
    <div className="relative bg-[#1C0F0F] min-h-screen text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 px-10 pt-10">
        <DiscoScene className="-top-10 relative" />

        <div className="text-center md:text-right">
          <h1 className="text-8xl font-bold flex justify-end font-[Bebas_Neue] tracking-wider text-[#F5E6C8]">
            {"Euphoria".split("").map((letter, index) => (
              <span
                key={index}
                className="opacity-0 animate-letter"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className="text-3xl text-right font-[Dancing_Script] text-[#c05754]">
            {"Where every event feels iconic, every plan is effortless, and every memory is worth the hype!!!"
              .split("")
              .map((word, index) => (
                <span
                  key={index}
                  className="opacity-0 animate-letter"
                  style={{ animationDelay: `${index * 0.01}s` }}
                >
                  {word}
                </span>
              ))}
          </p>
          <div className="flex justify-end">
            <div className="relative mt-6 inline-block cursor-pointer group">
              <img src={cta} className="w-50" />
              <span className="absolute inset-0 flex items-center justify-end mr-4 text-lg font-bold text-black tracking-wide group-hover:scale-105 transition font-[Almendra]">
                Register Now
              </span>
            </div>
          </div>
        </div>
      </div>

      <PhotoCard />
    </div>
  );
}

export default Home;
