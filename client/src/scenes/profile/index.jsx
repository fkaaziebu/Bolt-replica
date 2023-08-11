import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../state";

function Profile() {
  const id = useSelector((state) => state.auth.user.id);
  const email = useSelector((state) => state.auth.userEmail);
  const token = useSelector((state) => state.auth.user.token);
  const [profile, setProfile] = useState({});
  const profileInfo = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  async function getUserProfile() {
    if (!profileInfo) {
      try {
        const response = await axios.get(
          "https://dms-backend.onrender.com/api/1.0/drivers/profile/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile({ ...response.data.driverProfile });
        dispatch(updateProfile({ ...response.data.driverProfile }));
      } catch (err) {}
    }
  }
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="row d-flex p-4 m-3">
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h2" sx={{ marginBottom: "15px" }}>
          Profile
        </Typography>
        <Typography>
          Here you can check your driver profile details and modify some if they
          are outdated
        </Typography>
      </Box>
      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
        </div>
        <input
          type="text"
          value={profileInfo.firstName || profile.firstName}
          id="firstName"
          className="form-control fs-3 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
        </div>
        <input
          type="text"
          value={profileInfo.lastName || profile.lastName}
          id="lastName"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="contact" className="form-label">
            Phone
          </label>
        </div>
        <input
          type="text"
          value={profileInfo.contact || profile.contact}
          id="contact"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="name" className="form-label">
            Display Name
          </label>
        </div>
        <input
          type="text"
          value={profileInfo.firstName || profile.firstName + " " + profileInfo.lastName || profile.lastName}
          id="name"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="contact" className="form-label">
            Email
          </label>
        </div>
        <input
          type="text"
          value={email}
          id="contact"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h2" sx={{ marginBottom: "15px" }}>
          Driver Documents
        </Typography>
        <Typography>
          Driver and taxi license details. Keep an eye on expiration dates.
        </Typography>
      </Box>
      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="reference" className="form-label">
            Driver License Reference Number
          </label>
        </div>
        <input
          type="text"
          value={profileInfo.driverLicense || profile.driverLicense}
          id="reference"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="expiration" className="form-label">
            Driver license expires
          </label>
        </div>
        <input
          type="text"
          value="21.11.2024"
          id="expiration"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h2" sx={{ marginBottom: "15px" }}>
          Driver vehicle
        </Typography>
        <Typography>
          Driver can currently select this vehicle in the app.
        </Typography>
      </Box>
      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="model" className="form-label">
            Model
          </label>
        </div>
        <input
          type="text"
          value={profileInfo.carModel || profile.carModel}
          id="model"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="year" className="form-label">
            Year
          </label>
        </div>
        <input
          type="text"
          value={profileInfo.carYear || profile.carYear}
          id="year"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="plate" className="form-label">
            Number plate
          </label>
        </div>
        <input
          type="plate"
          value={profileInfo.licensePlate || profile.licensePlate}
          id="plate"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h2" sx={{ marginBottom: "15px" }}>
          Billing information
        </Typography>
        <Typography>
          This information apears on invoices sent to you and your clients
        </Typography>
      </Box>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
        </div>
        <input
          type="text"
          value=""
          id="companyName"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="companyEmail" className="form-label">
            Company Email
          </label>
        </div>
        <input
          type="text"
          value=""
          id="companyEmail"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="address" className="form-label">
            Address
          </label>
        </div>
        <input
          type="text"
          value="NO 22 OSOUN STREET"
          id="address"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="regCode" className="form-label">
            Reg. code
          </label>
        </div>
        <input
          type="text"
          value=""
          id="regCode"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>

      <div className="col-4 my-2">
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="vat" className="form-label">
            VAT no.
          </label>
        </div>
        <input
          type="text"
          value=""
          id="vat"
          className="form-control fs-3 bg-light-50 border border-0"
          disabled
        />
        <p className="mt-3 ms-2">
          To edit, please contact customer support info@dms.gh
        </p>
      </div>
    </div>
  );
}

export default Profile;
