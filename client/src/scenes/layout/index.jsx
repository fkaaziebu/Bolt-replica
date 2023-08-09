import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

function Layout() {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const isProfileCompletion = Boolean(useSelector((state) => state.auth.user.isProfileComplete))
  console.log("IsProfile:", isProfileCompletion)
  return (
    <Box display="flex" width="100%" height="100%">
      {isAuth && isProfileCompletion && <Sidebar />}
      <Box flexGrow={1}>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
