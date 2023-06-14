import Home from "./scenes/home";
import ProfileForm from "./scenes/profile-form"
import LoginForm from "./scenes/login-form"
import ProfilePage from "./scenes/profile-page/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="container-fluid p-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile-form" element={<ProfileForm />} />
          <Route path="/login-form" element={<LoginForm />} />
          <Route path="/profile-page" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
