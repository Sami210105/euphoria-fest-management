import PhotoCard from "../components/PhotoCard";
import DiscoScene from "../components/DiscoScene";

function Home() {
  return (
    <div className="relative bg-[#1C0F0F] min-h-screen text-white">
      <div className="flex items-center justify-between px-10 pt-10">
        <DiscoScene />

        <div className="text-right">
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
            Lose yourself in the magic of Euphoria!
          </p>
        </div>
      </div>

      <PhotoCard />
    </div>
  );
}

export default Home;
