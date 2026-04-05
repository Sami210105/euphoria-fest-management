import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="fixed w-full top-4 flex justify-center z-50 ">
      <div className="flex justify-center gap-6 px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
        <Link to="/" className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-base py-2 px-4 rounded-3xl">Home</Link>
        <Link to="/events" className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-base py-2 px-4 rounded-3xl">Events</Link>
        <Link to="/gallery" className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-base py-2 px-4 rounded-3xl">Gallery</Link>
        <Link to="/contact" className="hover:bg-[#F5E6C8] text-[#c05754] font-[Almendra] text-base py-2 px-4 rounded-3xl">Contact Us</Link>
      </div>
    </div>
  );
}

export default Navbar;
