import React, { useState, Fragment } from "react";
import {
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
const Phone = () => {
  return (
    <Fragment>
      <MDBInput wrapperClass="mb-4" label="Phone" id="form1" type="contact" />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form1"
        type="password"
      />
      <MDBBtn className="mb-4 w-100">Continue</MDBBtn>

      <div className="d-flex justify-content-center mx-4 mb-4">
        <a href="!#">Forgot password?</a>
      </div>
      <p className="text-center">
        Not a DMS Driver? <a href="#!">Register</a>
      </p>
    </Fragment>
  );
};
export default Phone;
