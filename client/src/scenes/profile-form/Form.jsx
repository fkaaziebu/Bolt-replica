import React from "react";

const RegisterForm = () => {
  return (
    <form>
      <div className="mb-4 mt-4">
        <label for="firstName" className="form-label fw-bold">
          First name
        </label>
        <input
          type="firstName"
          id="firstName"
          className="form-control fs-5 p-3 bg-light-50 border border-0"
          placeholder="First name"
        />
      </div>
      <div className="mb-4 mt-4">
        <label for="lastName" className="form-label fw-bold">
          Last name
        </label>
        <input
          type="text"
          id="lastName"
          className="form-control fs-5 p-3 bg-light-50 border border-0"
          placeholder="Last name"
        />
      </div>
      <div className="mb-4 mt-4">
        <label for="language" className="form-label fw-bold">
          Language
        </label>
        <input
          type="text"
          id="language"
          className="form-control fs-5 p-3 bg-light-50 border border-0"
          placeholder="English, American"
        />
      </div>
      <div className="mb-4 mt-4">
        <label for="referralCode" className="form-label fw-bold">
          Referral code
        </label>
        <input
          type="text"
          id="referralCode"
          className="form-control fs-5 p-3 bg-light-50 border border-0"
          placeholder="Referral code"
        />
        <p>If someone referred you, enter their code</p>
      </div>
      <div className="mb-4 mt-4">
        <label for="model" className="form-label fw-bold">
          Vehicle manufacturer and model
        </label>
        <input
          type="text"
          id="model"
          className="form-control fs-5 p-3 bg-light-50 border border-0"
          placeholder=""
        />
      </div>
      <div className="mb-4 mt-4">
        <label for="vehicleYear" className="form-label fw-bold">
          Vehicle year
        </label>
        <input
          type="text"
          id="vehicleYear"
          className="form-control fs-5 p-3 bg-light-50 border border-0"
          placeholder=""
        />
      </div>
      <div className="mb-4 mt-4">
        <label for="licensePlate" className="form-label fw-bold">
          License plate
        </label>
        <input
          type="text"
          id="licensePlate"
          className="form-control fs-5 p-3 bg-light-50 border border-0"
          placeholder="717 TTP"
        />
      </div>
      <div className="mb-4 mt-4">
        <label for="color" className="form-label fw-bold">
          Vehicle color
        </label>
        <input
          type="text"
          id="color"
          className="form-control fs-5 p-3 bg-light-50 border border-0"
          placeholder=""
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button type="button" className="btn btn-primary fs-4 mt-5 py-3 px-5 rounded-pill">
          Next
        </button>
      </div>
    </form>
  );
};

function Form() {
  return (
    <div className="container-sm d-flex flex-column align-items-center mt-4">
      <div className="w-100 mt-4">
        <h2 className="text-sm-center fs-3">
          Personsal information and vehicle details
        </h2>
        <p className="text-sm-center text-muted">
          Only your first name and vehicle details are visible to clients during
          the booking
        </p>
      </div>
      <div className="p-0 w-form-100 w-sm-75 mb-5">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Form;
