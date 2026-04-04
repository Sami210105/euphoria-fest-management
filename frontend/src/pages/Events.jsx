import { EventCard } from "../components/EventCard";
import { GuestCard } from "../components/GuestCard";

export default function EventsPage() {

  const EVENTS = [
    {
      id: 1, category: "MUSIC", icon: "🎸", color: "#8B1A1A",
      title: "Battle of Bands", tagline: "Let the guitars rage",
      date: "APR 18", time: "6:00 PM", venue: "Open Air Amphitheatre", seats: 500,
      description: "Six bands. One stage. Zero mercy. Bring your best riffs and let the crowd decide who rules the night.",
      prizes: ["₹25,000 Cash", "Recording Session", "Trophy"],
    },
    {
      id: 2, category: "DANCE", icon: "🕺", color: "#5C1111",
      title: "Retro Groove", tagline: "Boogie back to the golden era",
      date: "APR 19", time: "4:00 PM", venue: "Main Hall", seats: 300,
      description: "Dance competition celebrating Bollywood and Disco.",
      prizes: ["₹20,000 Cash", "Trophies", "Merch Kit"],
    }
  ];

  const GUESTS = [
    {
      name: "Rohit Sharma",
      title: "Cricket Legend & The Hitman",
      tag: "Special Guest",
      image: "/rohit.jpg",
      description: "The Hitman himself graces Euphoria.",
      stats: [{ label: "ODI 100s", value: "31" }],
    },
    {
      name: "Virat Kohli",
      title: "King of Cricket",
      tag: "Star Guest",
      image: "/virat.jpg",
      description: "One of the greatest batsmen of all time.",
      stats: [{ label: "ODI 100s", value: "54" }],
    }
  ];

  return (
    <div className="bg-[#1C0F0F] min-h-screen text-white">

      {/* HERO */}
      <section className="text-center py-22">
        <h1 className="text-[clamp(5rem,15vw,10rem)] tracking-widest text-[#f5e6d3] font-bold font-[Bebas_Neue]">
          EVENTS
        </h1>
        <p className="font-[Dancing_Script] text-[#c05754] italic text-3xl">
          Where every night becomes a legend
        </p>
      </section>

      {/* EVENTS */}
      <section className="max-w-4xl mx-auto p-6 grid gap-6 md:grid-cols-2">
        {EVENTS.map((ev, i) => (
          <EventCard key={ev.id} event={ev} index={i} />
        ))}
      </section>

      <section>
        <h2 className="text-5xl text-center mt-2 font-[Bebas_Neue] tracking-widest text-[#f5e6d3]">Special  Guests</h2>
        <p className="text-center text-[#c9a88a] font-[Dancing_Script] italic">Icons off field legends on the stage</p>
      </section>

      {/* GUESTS */}
      <section className="max-w-4xl mx-auto p-6 grid gap-6 md:grid-cols-1">
        {GUESTS.map((g, i) => (
          <GuestCard key={i} guest={g} />
        ))}
      </section>

    </div>
  );
}
