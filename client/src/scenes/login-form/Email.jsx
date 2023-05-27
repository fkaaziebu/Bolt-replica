import React, { useState } from "react";
import { MDBTabsPane, MDBBtn, MDBInput } from "mdb-react-ui-kit";

const Login = () => {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission refresh

    // Perform form submission handling logic here

    // Example: Access input field values
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    // Example: Log the values to the console
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <MDBTabsPane show={justifyActive === "tab1"}>
      <form onSubmit={handleSubmit}>
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="email"
          type="email"
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="password"
          type="password"
        />
        <MDBBtn type="submit" className="mb-4 w-100">
          Continue
        </MDBBtn>
      </form>

      <div className="d-flex justify-content-center mx-4 mb-4">
        <a href="!#">Forgot password?</a>
      </div>

      <p className="text-center">
        Not a DMS Driver? <a href="#!">Register</a>
      </p>
    </MDBTabsPane>
  );
};

export default Login;
