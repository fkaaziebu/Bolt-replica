import React from "react";
import { useState } from "react";

const LoginForm = () => {
  const [loginType, setLoginType] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLoginType = (type) => {
    setLoginType(type);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation and API requests here
    if (loginType === "email") {
      console.log("Email:", email);
      // Send OTP to the email and navigate to OTP verification page
    } else if (loginType === "phone") {
      console.log("Phone Number:", phoneNumber);
      // Send OTP to the phone number and navigate to OTP verification page
    }
    // Reset the form
    setEmail("");
    setPhoneNumber("");
  };
  return (
    <form>
      <div className="d-flex justify-content-center mt-3">
        <button
          type="button"
          onClick={() => handleLoginType("email")}
          className={loginType === "email" ? "active" : ""}
        >
          Email / Username
        </button>
        <button
          type="button"
          onClick={() => handleLoginType("phone")}
          className={loginType === "phone" ? "active" : ""}
        >
          Phone Number
        </button>
      </div>
      {loginType === "email" && (
        <div className="mb-4 mt-4">
          <label for="EmailAddress" className="form-label fw-bold">
            Email Address
          </label>
          <input
            type="emailAddress"
            id="emailAddress"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
          />
        </div>
      )}
      {loginType === "phone" && (
        <div className="mb-3">
          <label for="phone" className="form-label fw-bold">
            Phone number
          </label>
          <input
            type="text"
            id="phone"
            className="form-control fs-5"
            placeholder="0550815604"
          />
        </div>
      )}
      <div className="d-flex justify-content-center mt-3">
        <button
          type="button"
          className="btn btn-primary fs-4 mt-5 py-3 px-5 rounded-pill"
        >
          Continue
        </button>
      </div>
    </form>
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
