import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid py-2 m-2 mx-lg-5">
        <Link className="nav-link link-light fs-1" to="#home">
          DMS
        </Link>
        <Link className="nav-link link-light fs-1" to="#home">
          LOGIN
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
