import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <div className="bg-white shadow mb-6">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
        <div className="flex gap-6">
          <Link className={linkClass("/")} to="/">Dashboard</Link>
          <Link className={linkClass("/salary")} to="/salary">Salary</Link>
          <Link className={linkClass("/expenses")} to="/expenses">Expenses</Link>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="text-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
