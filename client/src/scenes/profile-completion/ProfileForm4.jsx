import React, { useState } from "react";
import { updateProfile, updateUserField } from "../../state/index";
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
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState("");
  const [licenseFront, setLicenseFront] = useState("");
  const [proofOfInsurance, setProofOfInsurance] = useState("");
  const [roadworthinessSticker, setRoadworthinessSticker] = useState("");
  const [ghanaCard, setGhanaCard] = useState("");

  const profile = useSelector((state) => state.auth.profile);
  const id = useSelector((state) => state.auth.user.id);
  const email = useSelector((state) => state.auth.user.email);
  const token = useSelector((state) => state.auth.user.token);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        dispatch(
          updateProfile({
            profilePhoto,
            licenseFront,
            proofOfInsurance,
            roadworthinessSticker,
            ghanaCard,
          })
        );

        const response = await axios.post(
          "http://localhost:7000/api/1.0/drivers/profile/" + id,
          {
            ...profile,
            profilePhoto,
            licenseFront,
            proofOfInsurance,
            roadworthinessSticker,
            ghanaCard,
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data)

        const isProfileComplete = response.data.isProfileComplete;

        dispatch(updateUserField({ isProfileComplete }));
        if (isProfileComplete) {
          navigate("/profile");
        }
        navigate("/login");
      }}
    >
      <div className="mb-5 mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="profilePhoto" className="form-label fs-4">
            Driver's profile photo
          </label>
        </div>
        <p className="text-muted">
          Please provide a clear portrait picture (not a full body picture) of
          yourself. It should show your full face, front view, with eyes open.
        </p>
        <input
          type="file"
          onChange={async (e) => {
            setProfilePhoto(await convertBase64(e.target.files[0]));
          }}
          className="form-control fs-5 bg-light-50 border border-0"
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
          Please upload the front of your driver's license. Class B or AB. More
          details on <a href="http://dvla.gov.gh/">http://dvla.gov.gh/</a>
        </p>
        <input
          type="file"
          onChange={async (e) => {
            setLicenseFront(await convertBase64(e.target.files[0]));
          }}
          className="form-control fs-5 bg-light-50 border border-0"
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
        <input
          type="file"
          onChange={async (e) => {
            setProofOfInsurance(await convertBase64(e.target.files[0]));
          }}
          className="form-control fs-5 bg-light-50 border border-0"
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
          From the DVLA. NOTE: You can bring it to training instead of uploading
          here. More details on the document here -{" "}
          <a href="http://dvla.gov.gh/">http://dvla.gov.gh/</a>
        </p>
        <input
          type="file"
          onChange={async (e) => {
            setRoadworthinessSticker(await convertBase64(e.target.files[0]));
          }}
          className="form-control fs-5 bg-light-50 border border-0"
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
        <input
          type="file"
          onChange={async (e) => {
            setGhanaCard(await convertBase64(e.target.files[0]));
          }}
          className="form-control fs-5 bg-light-50 border border-0"
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
    </form>
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
