import Home from "./scenes/home";
import ProfileForm from "./scenes/profile-form"
import LoginForm from "./scenes/login-form"
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
