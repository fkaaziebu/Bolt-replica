import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Password from "./Password";
import { MDBTabsPane, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";

const Login = () => {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    return <Password />;
  };
  return (
    <MDBTabsPane show={justifyActive === "tab1"}>
      <form onSubmit={handleSubmit}>
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
        />

        <div className="d-flex justify-content-center mx-4 mb-4">
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn type="submit" className="mb-4 w-100">
          Continue
        </MDBBtn>
      </form>

      <p className="text-center">
        Not a Bolt Driver? <a href="#!">Register</a>
      </p>
    </MDBTabsPane>
  );
};

export default Login;
