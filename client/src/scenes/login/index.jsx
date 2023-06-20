import React, { useEffect, useState } from "react";
import { setToken } from "../../state";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import vpassLogo from "../../assets/vpass-logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setSuccessMessage, setErrorMessage, setProfile } from "../../state";
import { Divider, Typography, useTheme } from "@mui/material";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const [profilePhoto, setProfilePhoto] = useState("");
  const [licenseFront, setLicenseFront] = useState("");
  const [proofOfInsurance, setProofOfInsurance] = useState("");
  const [roadworthinessSticker, setRoadworthinessSticker] = useState("");
  const [ghanaCard, setGhanaCard] = useState("");

  useEffect(() => {
    dispatch(setToken(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post("https://dms-backend.onrender.com/api/1.0/auth", {
        ...values,
      });

      const {
        id,
        firstName,
        lastName,
        language,
        carColor,
        carModel,
        carYear,
        driverLicense,
        nationalId,
        licensePlate,
        referralCode,
        ghanaCard,
        licenseFront,
        profilePhoto,
        proofOfInsurance,
        roadworthinessSticker,
        token,
      } = response.data;
      dispatch(setToken(token));
      navigate("/profile");
      dispatch(setSuccessMessage({ message: "Login Successful" }));
      dispatch(
        setProfile({
          id,
          firstName,
          lastName,
          language,
          carColor,
          carModel,
          carYear,
          driverLicense,
          nationalId,
          licensePlate,
          referralCode,
          ghanaCard,
          licenseFront,
          profilePhoto,
          proofOfInsurance,
          roadworthinessSticker,
        })
      );
      dispatch(setErrorMessage({}));
    } catch (err) {
      dispatch(setErrorMessage({ message: err.response.data.message }));
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://dms-backend.onrender.com/api/1.0/drivers",
        {
          ...values,
          profilePhoto,
          licenseFront,
          proofOfInsurance,
          roadworthinessSticker,
          ghanaCard,
        }
      );
      dispatch(setToken(response.data.token));
      dispatch(
        setSuccessMessage({
          message:
            "User created successfully, please login with your email and password",
        })
      );
      navigate("/login");
      setIsLogin(true);
    } catch (err) {
      dispatch(setErrorMessage(err.response.data.validationErrors));
      // console.log(err.data.message)
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

                <div className="form-floating my-3">
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    className="form-control fs-3 border border-1"
                    placeholder="Uppercase-lowercase-number"
                  />
                  <label
                    htmlFor="password"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    Password
                  </label>
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
              </>
            )}

            {/* REGISTRATION */}
            {!isLogin && (
              <div className="row">
                <legend className="fs-3 fw-bold mb-4 text-center">
                  <div className="fs-4 fw-normal">
                    Sign-up for a DMS account
                  </div>
                </legend>

                {/* Email */}
                <div className="col-4 form-floating my-3">
                  <Field
                    name="email"
                    type="email"
                    className="form-control fs-3 border border-1"
                    placeholder="name@example.com.gh"
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

                {/* Contact */}
                <div className="col-4 form-floating my-3">
                  <Field
                    name="contact"
                    type="contact"
                    className="form-control fs-3 border border-1"
                    placeholder="0550815604"
                  />
                  <label
                    htmlFor="contact"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    Contact
                  </label>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="contact"
                  />
                </div>

                {/* City */}
                <div className="col-4 form-floating my-3">
                  <Field
                    name="city"
                    type="city"
                    className="form-control fs-3 border border-1"
                    placeholder="Kumasi"
                  />
                  <label
                    htmlFor="city"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    City
                  </label>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="city"
                  />
                </div>

                {/* First Name */}
                <div className="col-4 form-floating my-3">
                  <Field
                    name="firstName"
                    type="firstName"
                    className="form-control fs-3 border border-1"
                    placeholder="John"
                  />
                  <label
                    htmlFor="firstName"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    First Name
                  </label>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="firstName"
                  />
                </div>

                {/* Last Name */}
                <div className="col-4 form-floating my-3">
                  <Field
                    name="lastName"
                    type="lastName"
                    className="form-control fs-3 border border-1"
                    placeholder="Doe"
                  />
                  <label
                    htmlFor="lastName"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    Last Name
                  </label>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="lastName"
                  />
                </div>

                {/* Language */}
                <div className="col-4 form-floating my-3">
                  <Field
                    name="language"
                    id="language"
                    as="select"
                    className="form-select fs-5 p-3 border border-1"
                  >
                    <option value="">Select Language</option>
                    {languages.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="language"
                  />
                </div>

                {/* Referral Code */}
                <div className="col-4 form-floating my-3">
                  <Field
                    name="referralCode"
                    id="referralCode"
                    type="text"
                    className="form-control fs-5 p-3 bg-light-50 border border-1"
                    placeholder="12356ffg"
                  />
                  <label
                    htmlFor="lastName"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    Referral Code
                  </label>
                </div>

                {/* Car Year */}
                <div className="col-4 my-3">
                  <Field
                    name="carYear"
                    id="carYear"
                    as="select"
                    className="form-select fs-5 p-3 border border-1"
                  >
                    <option value="">Select Car Year</option>
                    {carYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="carYear"
                  />
                </div>

                {/* Car Model */}
                <div className="col-4 my-3">
                  <Field
                    name="carModel"
                    id="carModel"
                    as="select"
                    className="form-select fs-5 p-3 border border-1"
                  >
                    <option value="">Select Manufacturer and Model</option>
                    {carModels.map((car) => (
                      <optgroup key={car.manufacturer} label={car.manufacturer}>
                        {car.models.map((model) => (
                          <option
                            key={model}
                            value={`${car.manufacturer} - ${model}`}
                          >
                            {model}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </Field>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="carModel"
                  />
                </div>

                {/* License Plate */}
                <div className="col-4 form-floating my-3">
                  <Field
                    name="licensePlate"
                    type="licensePlate"
                    className="form-control fs-3 border border-1"
                    placeholder="GH-2034-15"
                  />
                  <label
                    htmlFor="licensePlate"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    License Plate
                  </label>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="licensePlate"
                  />
                </div>

                {/* Vehicle Color */}
                <div className="col-4 my-3">
                  <Field
                    name="carColor"
                    id="carColor"
                    as="select"
                    className="form-select fs-5 p-3 bg-light-50  border border-1"
                  >
                    <option value="">Select Vehicle Color</option>
                    {colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="carColor"
                  />
                </div>

                {/* National ID */}
                <div className="col-4 form-floating my-3">
                  <Field
                    name="nationalId"
                    type="nationalId"
                    className="form-control fs-3 border border-1"
                    placeholder="38809036666"
                  />
                  <label
                    htmlFor="nationalId"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    National ID
                  </label>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="nationalId"
                  />
                </div>

                {/* Driver License */}
                <div className="col-4 form-floating my-3">
                  <Field
                    name="driverLicense"
                    type="driverLicense"
                    className="form-control fs-3 border border-1"
                    placeholder="AB235235"
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

                {/* Image Uploads */}
                <Typography
                  variant="h3"
                  sx={{ textAlign: "center", margin: "20px 0 40px 0" }}
                >
                  Image Uploads
                </Typography>

                {/* Driver Profile */}
                <div className="col-4 my-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <label htmlFor="profilePhoto" className="form-label fs-4">
                      Driver's profile photo
                    </label>
                  </div>
                  <p className="text-muted">
                    Please provide a clear portrait picture (not a full body
                    picture) of yourself. It should show your full face, front
                    view, with eyes open.
                  </p>
                  <input
                    type="file"
                    onChange={async (e) => {
                      setProfilePhoto(await convertBase64(e.target.files[0]));
                    }}
                    className="form-control fs-3  border border-1"
                  />
                </div>

                {/* Driver's License Front */}
                <div className="col-4 my-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <label htmlFor="licenseFront" className="form-label fs-4">
                      Driver's License Front
                    </label>
                    <p className="text-danger">Reguired *</p>
                  </div>
                  <p className="text-muted">
                    Please upload the front of your driver's license. Class B or
                    AB. More details on{" "}
                    <a href="http://dvla.gov.gh/">http://dvla.gov.gh/</a>
                  </p>
                  <input
                    type="file"
                    onChange={async (e) => {
                      setLicenseFront(await convertBase64(e.target.files[0]));
                    }}
                    className="form-control fs-3  border border-1"
                  />
                </div>

                {/* Proof of Insurance */}
                <div className="col-4 my-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <label
                      htmlFor="proofOfInsurance"
                      className="form-label fs-4"
                    >
                      Proof of insurance
                    </label>
                    <p className="text-danger">Reguired *</p>
                  </div>
                  <p className="text-muted">
                    Third party coverage, comprehensive - Speak to your local
                    Insurance Company for details
                  </p>
                  <input
                    type="file"
                    onChange={async (e) => {
                      setProofOfInsurance(
                        await convertBase64(e.target.files[0])
                      );
                    }}
                    className="form-control fs-3  border border-1"
                  />
                </div>

                {/* Roadworthiness Sticker */}
                <div className="col-4 my-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <label
                      htmlFor="roadworthinessSticker"
                      className="form-label fs-4"
                    >
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
                    onChange={async (e) => {
                      setRoadworthinessSticker(
                        await convertBase64(e.target.files[0])
                      );
                    }}
                    className="form-control fs-3  border border-1"
                  />
                </div>

                {/* Ghana Card */}
                <div className="col-4 my-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <label for="ghanaCard" className="form-label fs-4">
                      Ghana Card
                    </label>
                    <p className="text-danger">Reguired *</p>
                  </div>
                  <p className="text-muted">
                    Please upload a front view of your Ghana Card
                  </p>
                  <input
                    type="file"
                    onChange={async (e) => {
                      setGhanaCard(await convertBase64(e.target.files[0]));
                    }}
                    className="form-control fs-3  border border-1"
                  />
                </div>
                
                <Divider sx={{ margin: "40px 0" }} />
                {/* Button */}
                <div className="col-12 d-grid mt-3 d-flex justify-content-center">
                  <button type="submit" className="col-2 btn btn-primary fs-4">
                    {isLoading ? (
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </div>
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

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const carYears = ["2023", "2022", "2021"];

const languages = ["English", "Spanish", "French"];
const colors = [
  "Red",
  "Yellow",
  "Orange",
  "Green",
  "Blue",
  "Violet",
  "Pink",
  "White",
  "Black",
];

const carModels = [
  { manufacturer: "Toyota", models: ["Corolla", "Camry", "RAV4"] },
  { manufacturer: "Honda", models: ["Civic", "Accord", "CR-V"] },
];

const loginValues = { email: "", password: "" };

const registerValues = {
  email: "",
  contact: "",
  city: "",
  firstName: "",
  lastName: "",
  language: "",
  referralCode: "",
  carModel: "",
  carYear: "",
  licensePlate: "",
  carColor: "",
  nationalId: "",
  driverLicense: "",
};

const loginValuesValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email required"),
  password: Yup.string().required("Password is required"),
});

const registerValuesValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email required"),
  contact: Yup.string().required("Contact is required"),
  city: Yup.string().required("City is required"),
  firstName: Yup.string().required("First Name required"),
  lastName: Yup.string().required("Last Name required"),
  language: Yup.string().required("Language required"),
  carModel: Yup.string().required("Vehicle model required"),
  carYear: Yup.string().required("Vehicle year required"),
  licensePlate: Yup.string().required("License plate number required"),
  carColor: Yup.string().required("Vehicle color required"),
  nationalId: Yup.string().required("National ID is required"),
  driverLicense: Yup.string().required("Driver License is required"),
});
