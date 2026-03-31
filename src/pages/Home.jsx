import PhotoCard from "../components/PhotoCard";
import astro from "../assets/astronaut1.png";

function Home() {
  return (
    <div className="bg-[#310055] min-h-screen text-white">
      <div className="flex items-center justify-between px-10 py-20">
        <div>
          <div className="animate-float">
            <img src={astro} className="h-[300px] animate-slideIn rotate-4" />
          </div>

          <div className="flex gap-4 mt-6">
            <button className="text-[#dabfff] font-roboto px-4 py-2 transition bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/5">
              Register now
            </button>
            <button className="text-[#dabfff] font-roboto px-4 py-2 transition bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/5">
              Explore events
            </button>
          </div>
        </div>

        <div className="text-right">
          <h1 className="text-8xl font-bold flex justify-end font-[Bebas_Neue] tracking-wider">
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
          <p className="text-3xl mt-4 text-right font-[Dancing_Script] text-[#f54952]">Lose yourself in the magic of Euphoria!</p>
        </div>
      </div>

      <PhotoCard />
    </div>
  );
}

export default Home;
