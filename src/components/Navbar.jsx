import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ Set user data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="text-gray-600 body-font bg-purple-500">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <lord-icon src="https://cdn.lordicon.com/maltvyiw.json" trigger="hover"></lord-icon>
          <div>
            <span className="ml-3 text-3xl">pAsS</span> <span className="text-gray-800">MaNgA</span>
          </div>
        </a>

        {/* Show username if logged in, otherwise show login button */}
        <div className="ml-auto flex items-center">
          {user ? (
            <>
              <span className="text-green-700 rounded font-bold bg-white px-4 mr-4">Verified User</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
