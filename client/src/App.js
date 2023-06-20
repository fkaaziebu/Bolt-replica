// Page routing
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// State management
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setSuccessMessage } from "./state";

// Styling
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

// Pages
import Layout from "./scenes/layout/index";
import Login from "./scenes/login/index";
import Profile from "./scenes/profile/index";
import Document from "./scenes/document/index";
import Rides from "./scenes/ride/index";
import Vehicle from "./scenes/vehicle/index";
import Home from "./scenes/home/index";

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.auth.errorMessage);
  const success = useSelector((state) => state.auth.successMessage);

  return (
    <div className="container-fluid p-0">
      <div className="error-component d-flex flex-column align-items-end justify-content-center">
        {Object.values(errors).map((err) => {
          return (
            <div
              className="alert alert-danger alert-dismissible fade show m-0"
              role="alert"
              key={err}
            >
              <p className="m-0 me-5">{err}</p>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                onClick={() => {
                  dispatch(setErrorMessage({}));
                }}
              ></button>
            </div>
          );
        })}
        {Object.values(success).map((scs) => {
          return (
            <div
              className="alert alert-success alert-dismissible fade show m-0"
              role="alert"
              key={scs}
            >
              <p className="m-0 me-5">{scs}</p>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                onClick={() => {
                  dispatch(setSuccessMessage({}));
                }}
              ></button>
            </div>
          );
        })}
      </div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={!isAuth ? <Home /> : <Navigate to="/profile" />}
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="profile"
                element={isAuth ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/my documents"
                element={isAuth ? <Document /> : <Navigate to="/login" />}
              />
              <Route
                path="/my rides"
                element={isAuth ? <Rides /> : <Navigate to="/login" />}
              />
              <Route
                path="/vehicles"
                element={isAuth ? <Vehicle /> : <Navigate to="/login" />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
