import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#00247d] text-white py-4 shadow">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Royal British</h3>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/courses" className="hover:underline">
            Courses
          </Link>
          <Link to="/apply" className="hover:underline">
            Apply
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
