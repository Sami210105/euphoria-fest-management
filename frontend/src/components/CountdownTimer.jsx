import { useState, useEffect } from "react";

const FEST_DATE = new Date("2026-04-15T00:00:00");

function pad(n) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const diff = FEST_DATE - new Date();
  if (diff <= 0) return { days: "00", hours: "00", mins: "00", secs: "00" };
  return {
    days: pad(Math.floor(diff / 86400000)),
    hours: pad(Math.floor((diff % 86400000) / 3600000)),
    mins: pad(Math.floor((diff % 3600000) / 60000)),
    secs: pad(Math.floor((diff % 60000) / 1000)),
  };
}

const units = ["days", "hours", "mins", "secs"];
const labels = ["Days", "Hours", "Minutes", "Seconds"];

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 py-16 text-center">
      <p className="font-[Dancing_Script] text-[#c05754] text-2xl mb-1">
        tick tock...
      </p>
      <h2 className="font-[Bebas_Neue] text-6xl tracking-widest text-[#F5E6C8] mb-12">
        THE COUNTDOWN BEGINS
      </h2>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        {units.map((unit, i) => (
          <>
            <div key={unit} className="flex flex-col items-center gap-2">
              <div className="w-[110px] h-[110px] bg-[#2a1515] border-2 border-[#c05754] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#c0575440]" />
                <span className="font-[Bebas_Neue] text-[3.5rem] text-[#F5E6C8] leading-none">
                  {time[unit]}
                </span>
              </div>
              <span className="font-[Dancing_Script] text-[#c05754] text-lg tracking-wide">
                {labels[i]}
              </span>
            </div>

            {i < units.length - 1 && (
              <span
                key={`sep-${i}`}
                className="font-[Bebas_Neue] text-5xl text-[#c05754] opacity-70 mb-6"
              >
                :
              </span>
            )}
          </>
        ))}
      </div>
    </section>
  );
}