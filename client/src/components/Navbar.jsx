import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="container-fluid py-2 m-2 mx-lg-5">
        <Link className="nav-link link-light fs-1" to="#home">
          DMS
        </Link>
        <Link className="nav-link link-light fs-1" to="/login-form">
          LOGIN
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
