import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="container-sm d-flex justify-content-center">
      <Link
        className="link-dark text-decoration-none fs-1"
        to="/"
      >
        DMS
      </Link>
    </div>
  );
}

export default Header;
