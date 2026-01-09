import { Link, useNavigate } from "react-router-dom";
//import jwtDecode from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let user = null;

  if (token) {
    try {
      //user = jwtDecode(token);
    } catch{
      localStorage.removeItem("token");
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        RBAC App
      </Link>

      {/* Links */}
      <div className="space-x-4 flex items-center">
        {!user && (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>

            {user.role === "admin" && (
              <Link to="/admin" className="hover:text-gray-300">
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
