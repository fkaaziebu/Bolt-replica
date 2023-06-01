import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setField, resetForm } from "../../state";


const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  language: Yup.string().required("Language is required"),
  model: Yup.string().required("Vehicle model is required"),
  vehicleYear: Yup.string().required("Vehicle year is required"),
  licensePlate: Yup.string().required("License plate is required"),
  color: Yup.string().required("Vehicle color is required"),
});

const RegisterForm = ({ setStep }) => {
  const registrationData = useSelector((state) => state.registration);
  const dispatch = useDispatch();
  const [formError, setFormError] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    if (formError) {
      // Form has errors, do not proceed with submission
      setSubmitting(false);
      return;
    }

    // Handle form submission with valid values
    setStep(2);
  };
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    dispatch(setField({ field: name, value }));
  };


  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        language: "",
        referralCode: "",
        model: "",
        vehicleYear: "",
        licensePlate: "",
        color: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4 mt-4">
            <label htmlFor="firstName" className="form-label fw-bold">
              First name
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="form-control fs-5 p-3 bg-light-50 border border-0"
              placeholder="First name"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="lastName" className="form-label fw-bold">
              Last name
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="form-control fs-5 p-3 bg-light-50 border border-0"
              placeholder="Last name"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="language" className="form-label fw-bold">
              Language
            </label>
            <Field
              as="select"
              id="language"
              name="language"
              className="form-select fs-5 p-3 bg-light-50 border border-0"
            >
              <option value="">Select language</option>
              <option value="English">English</option>
              <option value="American">American</option>
            </Field>
            <ErrorMessage
              name="language"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="referralCode" className="form-label fw-bold">
              Referral code
            </label>
            <Field
              type="text"
              id="referralCode"
              name="referralCode"
              className="form-control fs-5 p-3 bg-light-50 border border-0"
              placeholder="Referral code"
            />
            <p>If someone referred you, enter their code</p>
            <ErrorMessage
              name="referralCode"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="model" className="form-label fw-bold">
              Vehicle manufacturer and model
            </label>
            <Field
              as="select"
              id="model"
              name="model"
              className="form-select fs-5 p-3 bg-light-50 border border-0"
            >
              <option value="">Select vehicle model</option>
              <option value="Model 1">Model 1</option>
              <option value="Model 2">Model 2</option>
              {/* Add more vehicle model options as needed */}
            </Field>
            <ErrorMessage
              name="model"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="vehicleYear" className="form-label fw-bold">
              Vehicle year
            </label>
            <Field
              as="select"
              id="vehicleYear"
              name="vehicleYear"
              className="form-select fs-5 p-3 bg-light-50 border border-0"
            >
              <option value="">Select vehicle year</option>
              <option value="2020">2023</option>
              <option value="2021">2022</option>
              <option value="2021">2021</option>
              <option value="2021">2020</option>
              <option value="2021">2019</option>
              <option value="2021">2018</option>
              <option value="2021">2017</option>
              <option value="2021">2016</option>
              <option value="2021">2015</option>
              <option value="2021">2014</option>
              <option value="2021">2013</option>
              <option value="2021">2012</option>
              <option value="2021">2011</option>
              <option value="2021">2010</option>
              <option value="2021">2009</option>

            </Field>
            <ErrorMessage
              name="vehicleYear"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="licensePlate" className="form-label fw-bold">
              License plate
            </label>
            <Field
              type="text"
              id="licensePlate"
              name="licensePlate"
              className="form-control fs-5 p-3 bg-light-50 border border-0"
              placeholder="717 TTP"
            />
            <ErrorMessage
              name="licensePlate"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="color" className="form-label fw-bold">
              Vehicle color
            </label>
            <Field
              as="select"
              id="color"
              name="color"
              className="form-select fs-5 p-3 bg-light-50 border border-0"
            >
              <option value="">Select vehicle color</option>
              <option value="Red">Red</option>
              <option value="Blue">Orange</option>
              <option value="Blue">Yellow</option>
              <option value="Blue">Green</option>
              <option value="Blue">Blue</option>
              <option value="Blue">Ash</option>
              <option value="Blue">Violet</option>
              <option value="Blue">Grey</option>
              <option value="Blue">White</option>
            </Field>
            <ErrorMessage
              name="color"
              component="div"
              className="text-danger"
            />
          </div>
          {formError && (
            <div className="alert alert-danger" role="alert">
              Please fill in all the required fields.
            </div>
          )}
          <div className="d-flex justify-content-center mt-3">
            <button
              type="submit"
              className="btn btn-primary fs-4 mt-5 py-3 px-5 rounded-pill"
              disabled={isSubmitting}
            >
              Next
            </button>
          </div>
        </Form>
      )}
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
