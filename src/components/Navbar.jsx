import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="fixed w-full top-4 flex justify-center z-50 ">
      <div className="flex justify-center gap-6 px-8 py-3 bg-black text-white rounded-full border-white border-2">
        <Link to="/" className="bg-purple-500 text-white py-2 px-4 rounded-3xl">Home</Link>
        <Link to="/events" className="hover:bg-purple-400 text-white py-2 px-4 rounded-3xl">Events</Link>
        <Link to="/registration" className="hover:bg-purple-400 text-white py-2 px-4 rounded-3xl">Registration</Link>
        <Link to="/gallery" className="hover:bg-purple-400 text-white py-2 px-4 rounded-3xl">Gallery</Link>
        <Link to="/contact" className="hover:bg-purple-400 text-white py-2 px-4 rounded-3xl">Contact Us</Link>
      </div>
    </div>
  );
}

export default Navbar;
