import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useLocation } from "react-router";
import Header from "./Header/Header";

const NO_FRAME = ["/sign-in", "/sign-up", "/", "/not-verified"];

export default function AppFrame({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const location = useLocation();

  if (
    !NO_FRAME.find((url) => url === location.pathname) &&
    !location.pathname.includes("/interview/invite") &&
    !location.pathname.includes("/candidate/invite") &&
    !location.pathname.includes("/auth/resetPassword") &&
    !location.pathname.includes("/interview/share")
  ) {
    return (
      <div className="page-container">
        {/* <Sidebar
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            width: DRAWER_WIDTH,
          }}
        /> */}
        <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
        {/* <AppBar onClickHamburgerButton={toggleDrawer} /> */}
        <div className="main-container">
          <Header  open={drawerOpen} toggleDrawer={toggleDrawer} />
          <div className="main-content">{children}</div>
        </div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
