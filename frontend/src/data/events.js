import bandImg from "../assets/band.jpg";
import danceImg from "../assets/dance.jpg";
import techImg from "../assets/tech.jpg";

export const events = [
    {
      id: 1,
      category: "MUSIC",
      img: bandImg,
      title: "Battle of Bands",
      tagline: "Let the guitars rage",
      date: "APR 15",
      time: "6:00 PM",
      venue: "Open Air Amphitheatre",
      seats: 500,
      description:
        "Six bands. One stage. Zero mercy. Bring your best riffs and let the crowd decide who rules the night.",
      prizes: ["₹25,000 Cash", "Recording Session", "Trophy"],
      registration_amount: 500
    },
    {
      id: 2,
      category: "DANCE",
      img: danceImg,
      title: "Retro Groove",
      tagline: "Boogie back to the golden era",
      date: "APR 15",
      time: "4:00 PM",
      venue: "Main Hall",
      seats: 300,
      description: "A dance competition celebrating Bollywood and Disco vibes.",
      prizes: ["₹20,000 Cash", "Trophies", "Merch Kit"],
      registration_amount: 300
    },
    {
      id: 3,
      category: "TECH",
      img: techImg,
      title: "Tech Talk",
      tagline: "Where innovation meets inspiration",
      date: "APR 15",
      time: "2:00 PM",
      venue: "CITP Auditorium",
      seats: 180,
      description: "An interactive session with industry leaders sharing insights on the future of technology.",
      prizes: ["₹20,000 Cash", "Trophies", "Merch Kit"],
      registration_amount: 200
    },
];
