// App.js or Navbar.js
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user info
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        {!user && (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>
        )}
        { && (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
