import React from "react";

const RegisterForm = ({ setStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 mt-4">
        <label for="nationalID" className="form-label fw-bold">
          National ID
        </label>
        <input
          type="nationalID"
          id="nationalID"
          className="form-control fs-5 p-3 bg-light-50 border border-0"
          placeholder="38809036666"
        />
      </div>
      <div className="mb-4 mt-4">
        <label for="driverLicense" className="form-label fw-bold">
          Driver License
        </label>
        <input
          type="text"
          id="driverLicense"
          className="form-control fs-5 p-3 bg-light-50 border border-0"
          placeholder="AB235235"
        />
      </div>
      <div className="d-flex justify-content-around mt-3">
        <button
          type="button"
          className="btn btn-primary fs-4 mt-5 py-3 px-5 rounded-pill"
          onClick={() => {
            setStep(1);
          }}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn btn-primary fs-4 mt-5 py-3 px-5 rounded-pill"
        >
          Next
        </button>
      </div>
    </form>
  );
};

function ProfileForm1({ setStep }) {
  return (
    <div className="container-sm d-flex flex-column align-items-center mt-4">
      <div className="w-100 mt-4">
        <h2 className="text-center fs-3">Step 2</h2>
        <p className="text-sm-center text-muted">
          Your national ID and license details will be kept private.
        </p>
      </div>
      <div className="p-0 w-form-100 w-sm-75 mb-5">
        <RegisterForm setStep={setStep} />
      </div>
    </div>
  );
}

export default ProfileForm1;
