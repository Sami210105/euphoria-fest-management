import PhotoCard from "../components/PhotoCard";
import astro from "../assets/astronaut.jpeg";

function Home() {
  return (
    <div className="bg-[#011121] min-h-screen text-white">

      <div className="flex items-center justify-between px-10 py-20">

        <div>

          <h1 className="text-5xl font-bold flex">
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

          <div className="flex gap-4 mt-6">
            <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Register now
            </button>
            <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Explore events
            </button>
          </div>

        </div>

        <div>
          <img
            src={astro}
            className="h-[300px] animate-astro"
          />
        </div>

      </div>

      <PhotoCard />

    </div>
  );
}

export default Home;