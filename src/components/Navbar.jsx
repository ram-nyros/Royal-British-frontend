import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
          {user ? (
            <>
              <Link to="/profile" className="hover:underline">
                {user.name || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 inline-block bg-gray-800 text-white px-3 py-1 rounded-lg font-semibold hover:bg-gray-900"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:underline">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="ml-2 inline-block bg-red-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
