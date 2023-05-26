import React, { useState } from "react";
import { MDBTabsPane, MDBBtn, MDBInput } from "mdb-react-ui-kit";

const handleSubmit = () => {};

const Login = () => {
  const [justifyActive, setJustifyActive] = useState("tab1");
  return (
    <MDBTabsPane show={justifyActive === "tab1"}>
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form1"
        type="password"
      />
      <MDBBtn type="submit" className="mb-4 w-100">
        Continue
      </MDBBtn>

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
