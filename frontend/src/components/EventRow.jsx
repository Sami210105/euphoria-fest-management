import { useState } from "react";

export default function EventRow({ event }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-[#c9a88a]/20">
      {/* ── MAIN ROW ── */}
      <div className="flex items-center justify-between py-6">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {/* DATE */}
          <div className="text-gray-400 text-sm w-[80px]">
            <p>{event.date}</p>
            <p className="font-semibold">{event.time}</p>
          </div>

          {/* IMAGE */}
          <img
            src={event.img}
            alt={event.title}
            className="w-[80px] h-[80px] rounded object-cover"
          />

          {/* DETAILS */}
          <div>
            <h2 className="text-[#f5e6d3] text-lg font-semibold tracking-wide font-[Almendra]">
              {event.title}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {event.venue} | {event.seats}
            </p>
            <p className="text-red-400 text-sm italic mt-1 font-[Dancing_Script]">
              {event.tagline}
            </p>
          </div>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex flex-col gap-3">
          <button className="bg-[#c05754] hover:bg-[#a94442] text-white px-4 py-2 text-sm rounded">
            Register
          </button>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="border border-[#c9a88a] text-[#c9a88a] px-4 py-2 text-sm rounded hover:bg-gray-800"
          >
            {expanded ? "Hide" : "Details"}
          </button>
        </div>
      </div>

      {/* ── EXPANDED DETAILS PANEL ── */}
      {expanded && (
        <div className="pb-6 px-2 text-sm text-gray-300 flex flex-col gap-3">
          <p className="leading-relaxed font-[Almendra] text-[#c9a88a]">
            {event.description}
          </p>

          {event.prizes?.length > 0 && (
            <div>
              <p className="text-[#c05754] font-semibold mb-1 font-[Almendra]">
                Prizes
              </p>
              <div className="flex gap-3 flex-wrap">
                {event.prizes.map((prize, i) => (
                  <span
                    key={i}
                    className="bg-[#2a1a1a] border border-[#c9a88a]/40 px-3 py-1 rounded text-xs text-gray-200"
                  >
                    {prize}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
