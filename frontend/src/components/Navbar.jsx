import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed w-full top-4 flex justify-center z-50 px-4">

      {/* Navbar */}
      <div className="flex justify-between items-center w-full max-w-[500px] px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-bold text-lg py-2 px-4 rounded-3xl">Home</Link>
          <Link to="/events" className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-bold text-lg py-2 px-4 rounded-3xl">Events</Link>
          <Link to="/gallery" className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-bold text-lg py-2 px-4 rounded-3xl">Gallery</Link>
          <Link to="/contact" className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-bold text-lg py-2 px-4 rounded-3xl">Contact Us</Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#F5E6C8] text-2xl ml-auto"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 w-[90%] max-w-[400px] bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl py-4 flex flex-col items-center gap-4 md:hidden">
          <Link to="/" onClick={() => setOpen(false)} className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-lg py-2 px-4 rounded-3xl">Home</Link>
          <Link to="/events" onClick={() => setOpen(false)} className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-lg py-2 px-4 rounded-3xl">Events</Link>
          <Link to="/gallery" onClick={() => setOpen(false)} className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-lg py-2 px-4 rounded-3xl">Gallery</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-lg py-2 px-4 rounded-3xl">Contact Us</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;