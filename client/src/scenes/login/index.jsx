import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import vpassLogo from "../../assets/vpass-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setErrorMessage,
  setSuccessMessage,
} from "../../state/index";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/1.0/auth/email",
        {
          ...values,
        }
      );
      dispatch(setEmail(values.email));
      const isActivated = response.data.isActivated;

      if (isActivated) {
        navigate("/enter-password");
      } else {
        navigate("/new-password");
      }
    } catch (err) {
      dispatch(setErrorMessage({ message: err.response.data.message }));
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (values) => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:7000/api/1.0/drivers", {
        ...values,
      });
      dispatch(setSuccessMessage({ message: "Driver created successfully" }));
      setIsLogin(true);
    } catch (err) {
      dispatch(setErrorMessage(err.response.data.validationErrors));
    }
    setIsLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Formik
        initialValues={isLogin ? loginValues : registerValues}
        validationSchema={
          isLogin ? loginValuesValidation : registerValuesValidation
        }
        onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
      >
        <Form>
          <fieldset className="d-flex flex-column p-4 m-3 border border-1 rounded-5">
            {/* LOGIN */}
            {isLogin && (
              <>
                <legend className="fs-3 fw-bold mb-4 text-center">
                  <img
                    className="img-fluid w-25 border rounded-5 mb-5"
                    src={vpassLogo}
                    alt="VPASS logo"
                  />
                  <div className="fs-4 fw-normal">
                    Sign-in to your DMS Account
                  </div>
                </legend>
                <div className="form-floating mb-3">
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    className="form-control fs-3 border border-1"
                    placeholder="name@example.com"
                  />
                  <label
                    htmlFor="email"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    Email
                  </label>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="email"
                  />
                </div>

                <div className="">
                  <Link to="/reset">
                    <em className="text-decoration-none">Forgot password?</em>
                  </Link>
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
              </>
            )}

            {/* REGISTRATION */}
            {!isLogin && (
              <>
                <legend className="fs-3 fw-bold mb-4 text-center">
                  <img
                    className="img-fluid w-25 border rounded-5 mb-5"
                    src={vpassLogo}
                    alt="VPASS logo"
                  />
                  <div className="fs-4 fw-normal">
                    Sign-up for a DMS Account
                  </div>
                </legend>
                <div className="form-floating mb-3">
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    className="form-control fs-3 border border-1"
                    placeholder="name@example.com"
                  />
                  <label
                    htmlFor="email"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    Email
                  </label>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="email"
                  />
                </div>

                <div className="form-floating my-3">
                  <Field
                    name="driverLicense"
                    type="text"
                    id="driverLicense"
                    className="form-control fs-3 border border-1"
                    placeholder="Uppercase-lowercase-number"
                  />
                  <label
                    htmlFor="driverLicense"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    Driver License
                  </label>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="driverLicense"
                  />
                </div>

                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-primary fs-4">
                    {isLoading ? (
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </>
            )}
            <div className="mx-2 my-4">
              {isLogin && (
                <a className="" href="#home" onClick={() => setIsLogin(false)}>
                  Don't have an account?, Sign-up
                </a>
              )}
              {!isLogin && (
                <a className="" href="#home" onClick={() => setIsLogin(true)}>
                  Already have an account?, Login
                </a>
              )}
            </div>
          </fieldset>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;

const loginValues = { email: "" };

const registerValues = {
  email: "",
  driverLicense: "",
};

const loginValuesValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email required"),
});

const registerValuesValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email required"),
  driverLicense: Yup.string().required("Driver License is required"),
});
