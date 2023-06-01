import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact: Yup.string().required("Contact is required"),
  city: Yup.string().required("City is required"),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      contact: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("https://dms-backend.onrender.com/api/1.0/drivers", {
          email: values.email,
          contact: values.contact,
          city: values.city,
        });
        navigate("/profile-form");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.validationErrors) {
          const { email, contact, city } = err.response.data.validationErrors;
          formik.setFieldError("email", email);
          formik.setFieldError("contact", contact);
          formik.setFieldError("city", city);
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <fieldset className="d-flex flex-column">
        <legend className="fs-3 fw-bold mb-4">Signup as a driver below</legend>
        <div className="mb-1">
          <label htmlFor="email" className="form-label fs-5">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`form-control fs-3 ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
            placeholder="john.doe@gmail.com"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger p-1">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label fs-5">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className={`form-control fs-3 ${formik.touched.contact && formik.errors.contact ? "is-invalid" : ""}`}
            placeholder="0550815604"
            {...formik.getFieldProps("contact")}
          />
          {formik.touched.contact && formik.errors.contact && (
            <p className="text-danger p-1">{formik.errors.contact}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label fs-5">
            City
          </label>
          <input
            type="text"
            id="city"
            className={`form-control fs-3 ${formik.touched.city && formik.errors.city ? "is-invalid" : ""}`}
            placeholder="Kumasi"
            {...formik.getFieldProps("city")}
          />
          {formik.touched.city && formik.errors.city && (
            <p className="text-danger p-1">{formik.errors.city}</p>
          )}
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
