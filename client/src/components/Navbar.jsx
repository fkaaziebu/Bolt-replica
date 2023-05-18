import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="container-fluid py-2 m-2 mx-lg-5">
        <a className="nav-link link-light fs-1" href="#home">
          DMS
        </a>
        <a className="nav-link link-light fs-1" href="#home">
          <div
            className=" fs-4"
            onClick={(e) => {
              e.preventDefault();
              navigate("login-form");
            }}
          >
            LOGIN
          </div>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
