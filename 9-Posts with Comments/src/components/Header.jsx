import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedin");
    navigate("/");
  };
  return (
    <div className="nav-bar">
      <NavLink to="/" className="nav-item">
        Home
      </NavLink>
      <NavLink to="posts" className="nav-item">
        Posts
      </NavLink>

      {localStorage.getItem("isLoggedin") && (
        <button className="btn btn-post" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
