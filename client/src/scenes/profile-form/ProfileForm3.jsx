import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateUserField } from "../../state/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const RegisterForm = ({ setStep }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.registration.user);
  const navigate = useNavigate();

  const profileThreeValues = {
    profilePhoto: "",
    licenseFront: "",
    proofOfInsurance: "",
    roadworthinessSticker: "",
    ghanaCard: "",
  };

  const profileThreeValuesValidation = Yup.object().shape({
    profilePhoto: Yup.mixed(),
    licenseFront: Yup.mixed().required("Required"),
    proofOfInsurance: Yup.mixed().required("Required"),
    roadworthinessSticker: Yup.mixed().required("Required"),
    ghanaCard: Yup.mixed().required("Required"),
  });

  const handleSubmit = async (values) => {
    dispatch(updateUserField({ ...values }));
    
    const {
      profilePhoto,
      licenseFront,
      proofOfInsurance,
      roadworthinessSticker,
      ghanaCard,
    } = user;

    user[profilePhoto] = await convertBase64(profilePhoto);
    user[licenseFront] = await convertBase64(licenseFront);
    user[proofOfInsurance] = await convertBase64(proofOfInsurance);
    user[roadworthinessSticker] = await convertBase64(roadworthinessSticker);
    user[ghanaCard] = await convertBase64(ghanaCard);

    await axios.post("https://dms-backend.onrender.com/api/1.0/drivers", {
      ...user,
    });
    navigate("/login-form");
  };

  return (
    <Formik
      initialValues={profileThreeValues}
      validationSchema={profileThreeValuesValidation}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="mb-5 mt-4">
          <div className="d-flex align-items-center justify-content-between">
            <label htmlFor="profilePhoto" className="form-label fs-4">
              Driver's profile photo
            </label>
            {/* <p className="text-danger">Reguired *</p> */}
          </div>
          <p className="text-muted">
            Please provide a clear portrait picture (not a full body picture) of
            yourself. It should show your full face, front view, with eyes open.
          </p>
          <Field
            name="profilePhoto"
            id="profilePhoto"
            type="file"
            className="form-control fs-5 bg-light-50 border border-0"
          />
          <ErrorMessage
            name="profilePhoto"
            component="div"
            className="text-danger"
          />
        </div>

        <div className="divider"></div>

        <div className="mb-5 mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <label htmlFor="licenseFront" className="form-label fs-4">
              Driver's License Front
            </label>
            <p className="text-danger">Reguired *</p>
          </div>
          <p className="text-muted">
            Please upload the front of your driver's license. Class B or AB.
            More details on{" "}
            <a href="http://dvla.gov.gh/">http://dvla.gov.gh/</a>
          </p>
          <Field
            name="licenseFront"
            id="licenseFront"
            type="file"
            className="form-control fs-5 bg-light-50 border border-0"
          />
          <ErrorMessage
            name="licenseFront"
            component="div"
            className="text-danger"
          />
        </div>

        <div className="divider"></div>

        <div className="mb-5 mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <label htmlFor="proofOfInsurance" className="form-label fs-4">
              Proof of insurance
            </label>
            <p className="text-danger">Reguired *</p>
          </div>
          <p className="text-muted">
            Third party coverage, comprehensive - Speak to your local Insurance
            Company for details
          </p>
          <Field
            name="proofOfInsurance"
            id="proofOfInsurance"
            type="file"
            className="form-control fs-5 bg-light-50 border border-0"
          />
          <ErrorMessage
            name="proofOfInsurance"
            component="div"
            className="text-danger"
          />
        </div>

        <div className="divider"></div>

        <div className="divider"></div>
        <div className="mb-5 mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <label htmlFor="roadworthinessSticker" className="form-label fs-4">
              Roadworthiness Sticker
            </label>
            <p className="text-danger">Reguired *</p>
          </div>
          <p className="text-muted">
            From the DVLA. NOTE: You can bring it to training instead of
            uploading here. More details on the document here -{" "}
            <a href="http://dvla.gov.gh/">http://dvla.gov.gh/</a>
          </p>
          <Field
            name="roadworthinessSticker"
            id="roadworthinessSticker"
            type="file"
            className="form-control fs-5 bg-light-50 border border-0"
          />
          <ErrorMessage
            name="roadworthinessSticker"
            component="div"
            className="text-danger"
          />
        </div>

        <div className="divider"></div>

        <div className="mb-5 mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <label for="ghanaCard" className="form-label fs-4">
              Ghana Card
            </label>
            <p className="text-danger">Reguired *</p>
          </div>
          <p className="text-muted">
            Please upload a front view of your Ghana Card
          </p>
          <Field
            name="ghanaCard"
            id="ghanaCard"
            type="file"
            className="form-control fs-5 bg-light-50 border border-0"
          />
          <ErrorMessage
            name="ghanaCard"
            component="div"
            className="text-danger"
          />
        </div>

        <div className="divider"></div>

        <div className="d-flex justify-content-around mt-3">
          <button
            type="button"
            className="btn btn-primary fs-4 mt-5 py-2 px-4 rounded-pill"
            onClick={() => {
              setStep(2);
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

function ProfileForm3({ setStep }) {
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

export default ProfileForm3;
