import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateUserField } from "../../state/index";
import { useDispatch } from "react-redux";

const RegisterForm = ({ setStep }) => {
  const dispatch = useDispatch();

  const profileOneValues = {
    firstName: "",
    lastName: "",
    language: "",
    referralCode: "",
    carModel: "",
    carYear: "",
    licensePlate: "",
    carColor: "",
  };

  const profileOneValuesValidation = Yup.object().shape({
    firstName: Yup.string().required("First Name required"),
    lastName: Yup.string().required("Last Name required"),
    language: Yup.string().required("Language required"),
    referralCode: Yup.string().required("Referral is required"),
    carModel: Yup.string().required("Vehicle model required"),
    carYear: Yup.string().required("Vehicle year required"),
    licensePlate: Yup.string().required("License plate number required"),
    carColor: Yup.string().required("Vehicle color required"),
  });

  const handleSubmit = (values) => {
    dispatch(updateUserField({ ...values }));
    setStep(2);
  };

  return (
    <Formik
      initialValues={profileOneValues}
      validationSchema={profileOneValuesValidation}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="mb-4 mt-4">
          <label htmlFor="firstName" className="form-label fw-bold">
            firstName
          </label>
          <Field
            name="firstName"
            id="firstName"
            type="text"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
          />
          <ErrorMessage
            component="div"
            className="text-danger"
            name="firstName"
          />
        </div>

        <div className="mb-4 mt-4">
          <label htmlFor="lastName" className="form-label fw-bold">
            lastName
          </label>
          <Field
            name="lastName"
            id="lastName"
            type="text"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
          />
          <ErrorMessage
            component="div"
            className="text-danger"
            name="lastName"
          />
        </div>

        <div className="mb-4 mt-4">
          <label htmlFor="language" className="form-label fw-bold">
            Language
          </label>
          <Field
            name="language"
            id="language"
            type="text"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
          />
          <ErrorMessage
            component="div"
            className="text-danger"
            name="Language"
          />
        </div>

        <div className="mb-4 mt-4">
          <label htmlFor="referralCode" className="form-label fw-bold">
            Referral code
          </label>
          <Field
            name="referralCode"
            id="referralCode"
            type="text"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
          />
          <ErrorMessage
            component="div"
            className="text-danger"
            name="referralCode"
          />
          <p>If someone referred you, enter their code</p>
        </div>

        <div className="mb-4 mt-4">
          <label htmlFor="carModel" className="form-label fw-bold">
            Vehicle manufacturer and model
          </label>
          <Field
            name="carModel"
            id="carModel"
            type="text"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
          />
          <ErrorMessage component="div" className="text-danger" name="carModel" />
        </div>

        <div className="mb-4 mt-4">
          <label htmlFor="carYear" className="form-label fw-bold">
            Vehicle year
          </label>
          <Field
            name="carYear"
            id="carYear"
            type="text"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
          />
          <ErrorMessage
            component="div"
            className="text-danger"
            name="carYear"
          />
        </div>

        <div className="mb-4 mt-4">
          <label htmlFor="licensePlate" className="form-label fw-bold">
            License plate
          </label>
          <Field
            name="licensePlate"
            id="licensePlate"
            type="text"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
          />
          <ErrorMessage
            component="div"
            className="text-danger"
            name="licensePlate"
          />
        </div>

        <div className="mb-4 mt-4">
          <label htmlFor="carColor" className="form-label fw-bold">
            Vehicle color
          </label>
          <Field
            name="carColor"
            id="carColor"
            type="text"
            className="form-control fs-5 p-3 bg-light-50 border border-0"
          />
          <ErrorMessage component="div" className="text-danger" name="carColor" />
        </div>

        <div className="d-flex justify-content-center mt-3">
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

function ProfileForm1({ setStep }) {
  return (
    <div className="container-sm d-flex flex-column align-items-center mt-4">
      <div className="w-100 mt-4">
        <h2 className="text-sm-center fs-3">
          Personal information and vehicle details
        </h2>
        <p className="text-sm-center text-muted">
          Only your first name and vehicle details are visible to clients during
          the booking.
        </p>
      </div>
      <div className="p-0 w-form-100 w-sm-75 mb-5">
        <RegisterForm setStep={setStep} />
      </div>
    </div>
  );
}

export default ProfileForm1;
