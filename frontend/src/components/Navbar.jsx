// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = true; // Replace with actual auth check

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / Site name */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        Home
      </Link>

      {/* Nav links */}
      <div className="flex space-x-6 items-center">
        <Link to="/wishlist" className="text-gray-700 hover:text-blue-600">
          Wishlist
        </Link>
        <Link to="/cart" className="text-gray-700 hover:text-blue-600">
          Cart
        </Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">
          Profile
        </Link>

        {isLoggedIn ? (
          <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
