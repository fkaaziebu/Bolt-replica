import React, { useState } from "react";
import { MDBTabsPane, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required"),
  password: Yup.string().required("Password is required"),
});

const Phone = () => {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleSubmit = (values) => {
    const { phone, password } = values;
    console.log("Phone", phone);
    console.log("Password:", password);
  };

  return (
    <MDBTabsPane show={justifyActive === "tab1"}>
      <Formik
        initialValues={{
          phone: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <Field
              as={MDBInput}
              wrapperClass="mb-4"
              label="Phone number"
              id="phone"
              type="phone"
              name="phone"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-4">
            <Field
              as={MDBInput}
              wrapperClass="mb-4"
              label="Password"
              id="password"
              type="password"
              name="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>
          <MDBBtn type="submit" className="mb-4 w-100">
            Continue
          </MDBBtn>
        </Form>
      </Formik>

      <div className="d-flex justify-content-center mx-4 mb-4">
        <a href="!#">Forgot password?</a>
      </div>
      <p className="text-center">
        Not a DMS Driver? <Link to="/home">Register</Link>
      </p>
    </MDBTabsPane>
  );
};

export default Phone;
