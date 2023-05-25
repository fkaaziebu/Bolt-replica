import React, { useState } from "react";
import Login from "./Email";
import Password from "./Password"
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const LoginForm = () => {
  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  return (
    <MDBContainer className="p-3 mt-1 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between custome-tabs"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Email Address
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Phone number
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <Login />
        </MDBTabsPane>
        <MDBTabsPane show={justifyActive === "tab2"}>
          <MDBInput
            wrapperClass="mb-4"
            label="Phone"
            id="form1"
            type="contact"
          />

          <MDBBtn className="mb-4 w-100" onClick={<Password />}>Continue</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

function Form() {
  return (
    <div className="container-sm d-flex flex-column align-items-center mt-4">
      <div className="w-100 mt-4">
        <p className="text-sm-center text-muted">LOG IN</p>
      </div>
      <div className="p-0 w-form-100 w-sm-75 mb-5">
        <LoginForm />
      </div>
    </div>
  );
}

export default Form;
// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// function LoginForm() {
//   const [loginType, setLoginType] = useState(null);
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const handleLoginType = (type) => {
//     setLoginType(type);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePhoneNumberChange = (event) => {
//     setPhoneNumber(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Perform validation and API requests here
//     if (loginType === 'email') {
//       console.log('Email:', email);
//       // Send OTP to the email and navigate to OTP verification page

//     } else if (loginType === 'phone') {
//       console.log('Phone Number:', phoneNumber);
//       // Send OTP to the phone number and navigate to OTP verification page

//     }
//     // Reset the form
//     setEmail('');
//     setPhoneNumber('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <div>
//         <button type="button" onClick={() => handleLoginType('email')}>
//           Email
//         </button>
//         <button type="button" onClick={() => handleLoginType('phone')}>
//           Phone Number
//         </button>
//       </div>

//       {loginType === 'email' && (
//         <div>
//           <label>
//             Email:
//             <input type="email" value={email} onChange={handleEmailChange} />
//           </label>
//         </div>
//       )}

//       {loginType === 'phone' && (
//         <div>
//           <label>
//             Phone Number:
//             <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
//           </label>
//         </div>
//       )}

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default LoginForm;
