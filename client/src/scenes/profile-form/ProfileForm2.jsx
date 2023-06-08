import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateUserField } from "../../state/index";
import { useDispatch } from "react-redux";

const RegisterForm = ({ setStep }) => {
  const dispatch = useDispatch();

  const initialValues = {
    nationalId: "",
    driverLicense: "",
  };

  const validationSchema = Yup.object().shape({
    nationalId: Yup.string().required("National ID is required"),
    driverLicense: Yup.string().required("Driver License is required"),
  });

  const handleSubmit = (values) => {
    dispatch(updateUserField({ ...values }));
    setStep(3);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="mb-4 mt-4">
          <label htmlFor="nationalId" className="form-label fw-bold">
            National ID
          </label>
          <Field
            type="text"
            id="nationalId"
            name="nationalId"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
            placeholder="38809036666"
          />
          <ErrorMessage
            name="nationalId"
            component="div"
            className="text-danger"
          />
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
          <ErrorMessage
            name="driverLicense"
            component="div"
            className="text-danger"
          />
        </div>
        <div className="d-flex justify-content-around mt-3">
          <button
            type="button"
            className="btn btn-primary fs-4 mt-5 py-2 px-4 rounded-pill"
            onClick={() => {
              setStep(1);
            }}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn btn-primary fs-4 mt-5 py-2 px-4 rounded-pill"
          >
            Next
          </button>
        </div>
      </Form>
    </Formik>
  );
};

function ProfileForm2({ setStep }) {
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

export default ProfileForm2;
