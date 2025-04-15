import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="bg-black p-4 shadow-lg border-b border-green-700">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      {/* Left-aligned text */}
      <div className="text-green-500 text-2xl font-bold tracking-wide">
        🌪️ D.A.D — Disaster Analysis & Description
      </div>

      {/* Right-aligned navigation links */}
      <div className="flex gap-3 text-green-500 text-lg font-medium">
        <Link
          to="/"
          className="bg-green-500 text-black px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all duration-200"
        >
          Home
        </Link>

        <Link
          to="/filter-by-year"
          className="bg-green-500 text-black px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all duration-200"
        >
          Cyclone Data
        </Link>

        <Link
          to="/data-viz"
          className="bg-green-500 text-black px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all duration-200"
        >
          Data Visualization
        </Link>

        <Link
          to="/about"
          className="bg-green-500 text-black px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all duration-200"
        >
          About
        </Link>
      </div>
    </div>
  </nav>
);

export default NavBar;
