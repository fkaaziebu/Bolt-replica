import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nationalID: Yup.string().required('National ID is required'),
  driverLicense: Yup.string().required('Driver License is required'),
});

const RegisterForm = ({ setStep }) => {
  const initialValues = {
    nationalID: '',
    driverLicense: '',
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
      <Form>
        <div className="mb-4 mt-4">
          <label htmlFor="nationalID" className="form-label fw-bold">
            National ID
          </label>
          <Field
            type="text"
            id="nationalID"
            name="nationalID"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
            placeholder="38809036666"
          />
          <ErrorMessage name="nationalID" component="div" className="text-danger" />
        </div>
        <div className="mb-4 mt-4">
          <label htmlFor="driverLicense" className="form-label fw-bold">
            Driver License
          </label>
          <Field
            type="text"
            id="driverLicense"
            name="driverLicense"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
            placeholder="AB235235"
          />
          <ErrorMessage name="driverLicense" component="div" className="text-danger" />
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
      </Form>
    </Formik>
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
