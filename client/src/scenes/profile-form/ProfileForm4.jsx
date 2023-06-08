import React, { useState } from "react";
import { updateUserField } from "../../state/index";
import { useDispatch, useSelector } from "react-redux";

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
  const [profilePhoto, setProfilePhoto] = useState("");
  const [licenseFront, setLicenseFront] = useState("");
  const [proofOfInsurance, setProofOfInsurance] = useState("");
  const [roadworthinessSticker, setRoadworthinessSticker] = useState("");
  const [ghanaCard, setGhanaCard] = useState("");

  const user = useSelector((state) => state.registration.user);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          updateUserField({
            profilePhoto,
            licenseFront,
            proofOfInsurance,
            roadworthinessSticker,
            ghanaCard,
          })
        );
      }}
    >
      <input
        type="file"
        onChange={async (e) => {
          setProfilePhoto(await convertBase64(e.target.files[0]));
        }}
      />
      <input
        type="file"
        onChange={async (e) => {
          setLicenseFront(await convertBase64(e.target.files[0]));
        }}
      />
      <input
        type="file"
        onChange={async (e) => {
          setProofOfInsurance(await convertBase64(e.target.files[0]));
        }}
      />
      <input
        type="file"
        onChange={async (e) => {
          setRoadworthinessSticker(await convertBase64(e.target.files[0]));
        }}
      />
      <input
        type="file"
        onChange={async (e) => {
          setGhanaCard(await convertBase64(e.target.files[0]));
        }}
      />
      <button type="submit">Submit</button>
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
