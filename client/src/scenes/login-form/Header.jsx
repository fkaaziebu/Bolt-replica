import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="container-sm d-flex justify-content-center">
      <a
        className="link-dark text-decoration-none fs-1"
        href="#login"
        onClick={(e) => {
          e.preventDefault();
          navigate("/login-form");
        }}
      >
        DMS
      </a>
    </div>
  );
}

export default Header;
