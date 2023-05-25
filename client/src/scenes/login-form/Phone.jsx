import React, { useState, Fragment } from 'react';
import {
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
const Phone = () => {
  return (
    <Fragment>
    <MDBInput wrapperClass='mb-4' label='Phone' id='form1' type='contact'/>

          <MDBBtn className="mb-4 w-100">Continue</MDBBtn>
</Fragment>
  );
}
export default Phone;
 