import React from "react";
import SideBar from "../global/SideBar"
import Header from "../global/Header";

function ProfilePage() {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div>
        <SideBar />
      </div>
    </div>
  );
}

export default ProfilePage;
