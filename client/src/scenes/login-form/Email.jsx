import React, { useState } from 'react';
import {
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}from 'mdb-react-ui-kit';

const Login = () => {
  const [justifyActive, setJustifyActive] = useState('tab1');
 return (
   <MDBTabsPane show={justifyActive === 'tab1'}>
  <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />

  <div className="d-flex justify-content-c mx-4 mb-4">
    <a href="!#">Forgot password?</a>
  </div>

  <MDBBtn className="mb-4 w-100">Continue</MDBBtn>
  <p className="text-center">Not a Bolt Driver? <a href="#!">Register</a></p>
</MDBTabsPane>

 );
}
export default Login