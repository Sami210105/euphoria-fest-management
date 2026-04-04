import { useState, useMemo } from "react";
import EventRow from "../components/EventRow";
import GuestCard from "../components/GuestCard";

import guest1Img from "../assets/guest1.jpg";
import guest2Img from "../assets/guest2.jpg";
import bandImg from "../assets/band.jpg";
import danceImg from "../assets/dance.jpg";
import techImg from "../assets/tech.jpg";

export default function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Events");
  const [sort, setSort] = useState("Newest");
  /* ─── EVENTS DATA ─── */
  const events = [
    {
      id: 1,
      category: "MUSIC",
      img: bandImg,
      title: "Battle of Bands",
      tagline: "Let the guitars rage",
      date: "APR 18",
      time: "6:00 PM",
      venue: "Open Air Amphitheatre",
      seats: 500,
      description:
        "Six bands. One stage. Zero mercy. Bring your best riffs and let the crowd decide who rules the night.",
      prizes: ["₹25,000 Cash", "Recording Session", "Trophy"],
    },
    {
      id: 2,
      category: "DANCE",
      img: danceImg,
      title: "Retro Groove",
      tagline: "Boogie back to the golden era",
      date: "APR 19",
      time: "4:00 PM",
      venue: "Main Hall",
      seats: 300,
      description: "A dance competition celebrating Bollywood and Disco vibes.",
      prizes: ["₹20,000 Cash", "Trophies", "Merch Kit"],
    },
    {
      id: 3,
      category: "TECH",
      img: techImg,
      title: "Tech Talk",
      tagline: "Where innovation meets inspiration",
      date: "APR 19",
      time: "2:00 PM",
      venue: "CITP Auditorium",
      seats: 180,
      description: "An interactive session with industry leaders sharing insights on the future of technology.",
      prizes: ["₹20,000 Cash", "Trophies", "Merch Kit"],
    },
  ];
  const filtered = useMemo(() => {
    let result = [...events];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.tagline.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q),
      );
    }

    if (category !== "All Events") {
      result = result.filter((e) => e.category === category.toUpperCase());
    }

    result.sort((a, b) => (sort === "Newest" ? b.id - a.id : a.id - b.id));

    return result;
  }, [search, category, sort]);

  /* ─── GUESTS DATA ─── */
  const guests = [
    {
      name: "Rohit Sharma",
      title: "Cricket Legend & The Hitman",
      team: "TEAM INDIA · #45",
      image: guest1Img,
      description:
        "India's record-breaking opener joins us for an unforgettable interaction.",
      stats: [
        { label: "ODI 100s", value: "31" },
        { label: "T20I Runs", value: "4K+" },
        { label: "IPL Titles", value: "5" },
      ],
      event: "Apr 20, 2026 · 3:00 PM · VIP Lounge",
    },
    {
      name: "Virat Kohli",
      title: "King of Cricket",
      team: "TEAM INDIA · #18",
      image: guest2Img,
      description:
        "One of the greatest batsmen of all time, bringing unmatched energy.",
      stats: [
        { label: "ODI 100s", value: "54" },
        { label: "Test Runs", value: "9K+" },
        { label: "Cups Won", value: "2" },
      ],
      event: "Apr 20, 2026 · 5:00 PM · Main Stage",
    },
  ];

  return (
    <div className="bg-[#1C0F0F] min-h-screen text-white px-6 py-10">
      
      {/* ─── HERO SECTION  ─── */}
      <section className="text-center py-24">
        <h1 className="text-[clamp(5rem,15vw,10rem)] tracking-widest text-[#f5e6d3] font-bold font-[Bebas_Neue]">
          EVENTS
        </h1>
        <p className="font-[Dancing_Script] text-[#c05754] italic text-3xl">
          Where every night becomes a legend
        </p>
      </section>

      {/* ─── EVENTS SECTION ─── */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* LEFT — search + category */}
        <div className="flex gap-3 items-center">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Events"
              className="bg-[#1C0F0F] border border-[#c9a88a]/40 pl-2 pr-2 py-2 text-white rounded w-[200px] outline-none focus:border-[#c05754]"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#1C0F0F] border border-[#c9a88a]/40 px-4 py-2 text-white rounded"
          >
            <option className="bg-[#1C0F0F]">All Events</option>
            <option className="bg-[#1C0F0F]">Music</option>
            <option className="bg-[#1C0F0F]">Dance</option>
          </select>
        </div>

        {/* RIGHT — sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#1C0F0F] border border-[#c9a88a]/40 px-4 py-2 text-white rounded w-auto"
        >
          <option className="bg-[#1C0F0F]">Newest</option>
          <option className="bg-[#1C0F0F]">Oldest</option>
        </select>
      </div>

      <div className="max-w-6xl mx-auto mb-16">
        {filtered.length > 0 ? (
          filtered.map((ev) => <EventRow key={ev.id} event={ev} />)
        ) : (
          <p className="text-center text-[#6b4a4a] italic py-16 text-sm">
            No events found.
          </p>
        )}
      </div>

      {/* ─── GUESTS SECTION ─── */}
      <div className="max-w-4xl mx-auto">
        <section>
          <h2 className="text-5xl text-center mt-2 font-[Bebas_Neue] tracking-widest text-[#f5e6d3]">
            Special Guests
          </h2>
          <p className="text-center text-[#c9a88a] font-[Dancing_Script] italic">
            Icons off field... legends on the stage
          </p>
        </section>

        <div className="flex flex-col gap-10 mt-10">
          {guests.map((g, i) => (
            <GuestCard key={i} guest={g} />
          ))}
        </div>
      </div>
    </div>
  );
}
