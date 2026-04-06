import PhotoCard from "../components/PhotoCard";
import DiscoScene from "../components/DiscoScene";
import CountdownTimer from "../components/CountdownTimer";
import WhyEuphoria from "../components/WhyEuphoria";
import cta from "../assets/cta.png";

function Home() {
  return (
    <div className="relative bg-[#1C0F0F] min-h-screen text-white overflow-hidden">

      {/* HERO */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 px-5 sm:px-8 md:px-10 pt-20 md:pt-10">

        {/* Disco Section */}
        <div className="w-full md:w-auto flex justify-center md:justify-start relative">
          <div className="relative flex justify-center">

            {/* STRING */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-32 h-32 w-[1.8px] bg-[#968677]" />

            <DiscoScene />
          </div>
        </div>

        {/* TEXT */}
        <div className="w-full md:w-auto text-center md:text-right md:py-20">

          {/* TITLE */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold flex justify-center md:justify-end font-[Bebas_Neue] tracking-wider text-[#F5E6C8]">
            {"Euphoria".split("").map((letter, index) => (
              <span
                key={index}
                className="opacity-0 animate-letter"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* SUBTITLE */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center md:text-right font-[Dancing_Script] text-[#c05754] mt-3 leading-relaxed">
            {"Where every event feels iconic, every plan is effortless, and every memory is worth the hype!!!"
              .split("")
              .map((char, index) => (
                <span
                  key={index}
                  className="opacity-0 animate-letter"
                  style={{ animationDelay: `${index * 0.008}s` }}
                >
                  {char}
                </span>
              ))}
          </p>

          {/* CTA */}
          <div className="flex justify-center md:justify-end mt-6 mb-6">
            <div className="relative inline-block cursor-pointer group">
              <img
                src={cta}
                className="w-36 sm:w-44 md:w-52 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-end mr-3 sm:mr-4 text-sm sm:text-base md:text-lg font-bold text-black tracking-wide font-[Almendra]">
                Register Now
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* SECTIONS */}
      <div className="mt-6 sm:mt-10">
        <PhotoCard />
      </div>

      <div className="mt-10 sm:mt-16">
        <CountdownTimer />
      </div>

      <div className="mt-10 sm:mt-16">
        <WhyEuphoria />
      </div>

    </div>
  );
}

export default Home;