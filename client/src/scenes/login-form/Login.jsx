import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import vpassLogo from "../../images/vpass-logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loginValues = { email: "", password: "" };

  const loginValuesValidation = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLoginSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://dms-backend.onrender.com/api/1.0/auth",
        { ...values }
      );

      console.log(response.data);

      navigate("/profile-page");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Formik
        initialValues={loginValues}
        validationSchema={loginValuesValidation}
        onSubmit={handleLoginSubmit}
      >
        <Form>
          <fieldset className="d-flex flex-column p-4 m-3 border border-1 rounded-5">
            <legend className="fs-3 fw-bold mb-4 text-center">
              <img
                className="img-fluid w-25 border rounded-5 mb-5"
                src={vpassLogo}
                alt="VPASS logo"
              />
              <div className="fs-4 fw-normal">Sign in to your DMS Account</div>
            </legend>
            <div className="form-floating mb-3">
              <Field
                name="email"
                type="email"
                id="email"
                className="form-control fs-3 border border-1"
                placeholder="name@example.com"
              />
              <label htmlFor="email">Email</label>
              <ErrorMessage
                component="div"
                className="text-danger"
                name="email"
              />
            </div>

            <div className="form-floating mb-3 mt-3">
              <Field
                name="password"
                type="password"
                id="password"
                className="form-control fs-3 border border-1"
                placeholder="Uppercase-lowercase-number"
              />
              <label htmlFor="password">Password</label>
              <ErrorMessage
                component="div"
                className="text-danger"
                name="password"
              />
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary fs-4">
                {isLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </fieldset>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
