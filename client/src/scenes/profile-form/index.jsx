import React from "react";
import Header from "./Header";
import Form from "./Form";

function ProfileForm() {
  return (
    <div className="container-fluid d-flex flex-column align-items-center mt-3">
      <div className="container p-0">
        <Header />
        <Form />
      </div>
    </div>
  );
}

export default ProfileForm;
