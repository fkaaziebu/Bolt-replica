import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const submitRegisterInfo = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      await axios.post("https://dms-hx2f.onrender.com/api/1.0/drivers", {
        email: formData.get("email") ?? null,
        contact: formData.get("contact") ?? null,
        city: formData.get("city") ?? null
      });
      navigate("/profile-form");
    } catch (err) {
      setEmailError(err.response.data.validationErrors.email);
      setContactError(err.response.data.validationErrors.contact);
      setCityError(err.response.data.validationErrors.city);
    }
  };

  return (
    <form onSubmit={submitRegisterInfo}>
      <fieldset className="d-flex flex-column">
        <legend className="fs-3 fw-bold mb-4">Signup as a driver below</legend>
        <div className="mb-1">
          <label for="email" className="form-label fs-5">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            id="email"
            className="form-control fs-3"
            placeholder="john.doe@gmail.com"
          />
          <p className="text-danger p-1">{emailError}</p>
        </div>
        <div className="mb-3">
          <label for="phone" className="form-label fs-5">
            Phone
          </label>
          <input
            type="text"
            name="contact"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              setContactError("");
            }}
            id="phone"
            className="form-control fs-3"
            placeholder="0550815604"
          />
          <p className="text-danger p-1">{contactError}</p>
        </div>
        <div className="mb-3">
          <label for="city" className="form-label fs-5">
            City
          </label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setCityError("");
            }}
            id="city"
            className="form-control fs-3"
            placeholder="Kumasi"
          />
          <p className="text-danger p-1">{cityError}</p>
        </div>
        <div className="d-grid mt-3">
          <button type="submit" className="btn btn-primary fs-4">
            Next
          </button>
        </div>
      </fieldset>
    </form>
  );
};

function Register() {
  return (
    <div className="container d-flex flex-column flex-lg-row justify-content-center align-items-center py-2 my-2">
      <div className="vw-50 h-50">
        <h1 className="display-1 text-light">Drive with DMS</h1>
        <p className="text-light text-opacity-75 fs-2">
          Earn good money{" "}
          <em className="text-light fw-semibold">with your vehicle</em>
        </p>
      </div>
      <div className="p-4 shadow-lg bg-light rounded-5">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
