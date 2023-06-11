import React from "react";
import Login from "./Login";
import Header from "./Header";

function LoginForm() {
  return (
    <div className="container-fluid d-flex flex-column align-items-center mt-3">
      <div className="container p-0">
        <Header />
        <Login />
      </div>
    </div>
  );
}

export default LoginForm;
