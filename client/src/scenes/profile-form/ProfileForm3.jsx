import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  profilePhoto: Yup.mixed().required("Required"),
  license: Yup.mixed().required("Required"),
  insurance: Yup.mixed().required("Required"),
  worthiness: Yup.mixed().required("Required"),
  ghCard: Yup.mixed().required("Required"),
});
const RegisterForm = ({ setStep }) => {
  const initialValues = {
    profilePhoto: "",
    license: "",
    insurance: "",
    worthiness: "",
    ghCard: "",
  };

  const handleSubmit = (values) => {
    setStep(3);
    // Handle form submission
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <form>
        <div className="mb-5 mt-4">
          <div className="d-flex align-items-center justify-content-between">
            <label for="profile-photo" className="form-label fs-4">
              Driver's profile photo
            </label>
            <p className="text-danger">Reguired *</p>
          </div>
          <p className="text-muted">
            Please provide a clear portrait picture (not a full body picture) of
            yourself. It should show your full face, front view, with eyes open.
          </p>
          <input
            type="file"
            id="profile-photo"
            className="form-control fs-5 bg-light-50 border border-0"
          />
          <ErrorMessage
            name="profile-photo"
            component="div"
            className="text-danger"
          />
        </div>
        <div className="divider"></div>
        <div className="mb-5 mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <label for="license" className="form-label fs-4">
              Driver's License Front
            </label>
            <p className="text-danger">Reguired *</p>
          </div>
          <p className="text-muted">
            Please upload the front of your driver's license. Class B or AB.
            More details on{" "}
            <a href="http://dvla.gov.gh/">http://dvla.gov.gh/</a>
          </p>
          <input
            type="file"
            id="license"
            className="form-control fs-5 bg-light-50 border border-0"
          />
          <ErrorMessage
            name="license"
            component="div"
            className="text-danger"
          />
        </div>
        <div className="divider"></div>
        <div className="mb-5 mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <label for="insurance" className="form-label fs-4">
              Proof of insurance
            </label>
            <p className="text-danger">Reguired *</p>
          </div>
          <p className="text-muted">
            Third party coverage, comprehensive - Speak to your local Insurance
            Company for details
          </p>
          <input
            type="file"
            id="insurance"
            className="form-control fs-5 bg-light-50 border border-0"
          />
          <ErrorMessage
            name="insurance"
            component="div"
            className="text-danger"
          />
        </div>
        <div className="divider"></div>
        <div className="mb-5 mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <label for="worthiness" className="form-label fs-4">
              Roadworthiness Sticker
            </label>
            <p className="text-danger">Reguired *</p>
          </div>
          <p className="text-muted">
            From the DVLA. NOTE: You can bring it to training instead of
            uploading here. More details on the document here -{" "}
            <a href="http://dvla.gov.gh/">http://dvla.gov.gh/</a>
          </p>
          <input
            type="file"
            id="worthiness"
            className="form-control fs-5 bg-light-50 border border-0"
          />
          <ErrorMessage
            name="worthiness"
            component="div"
            className="text-danger"
          />
        </div>
        <div className="divider"></div>
        <div className="mb-5 mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <label for="gh-card" className="form-label fs-4">
              Ghana Card
            </label>
          </div>
          <p className="text-muted">
            Please upload a front view of your Ghana Card
          </p>
          <input
            type="file"
            id="gh-card"
            className="form-control fs-5 bg-light-50 border border-0"
          />
          <ErrorMessage
            name="gh-card"
            component="div"
            className="text-danger"
          />
        </div>
        <div className="divider"></div>
        <div className="d-flex justify-content-around mt-3">
          <button
            type="button"
            className="btn btn-primary fs-4 mt-5 py-3 px-5 rounded-pill"
            onClick={() => {
              setStep(2);
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
    </Formik>
  );
};

function ProfileForm1({ setStep }) {
  return (
    <div className="container-sm d-flex flex-column align-items-center mt-4">
      <div className="w-100 mt-4">
        <h2 className="text-center fs-3">Documents</h2>
        <p className="text-sm-center text-muted">
          We're legally required to ask you for some documents to sign you up as
          a driver. Documents scans and quality photos are accepted.
        </p>
      </div>
      <div className="p-0 w-form-100 w-sm-75 mb-5">
        <RegisterForm setStep={setStep} />
      </div>
    </div>
  );
}

export default ProfileForm1;
