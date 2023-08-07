import React, { useState } from "react";
import ProfileForm1 from "./ProfileForm1";
import ProfileForm2 from "./ProfileForm2";
import ProfileForm4 from "./ProfileForm4";

const ProjectCompletion = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="container-fluid d-flex flex-column align-items-center mt-3">
      <div className="container p-0">
        {step === 3 && <ProfileForm4 setStep={setStep} />}
        {step === 2 && <ProfileForm2 setStep={setStep} />}
        {step === 1 && <ProfileForm1 setStep={setStep} />}
      </div>
    </div>
  );
};

export default ProjectCompletion;
