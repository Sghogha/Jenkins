import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { fetchFromStorage } from "src/helpers/context";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import "src/layouts/layout.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    background: "#ffffff",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const location = useLocation();
  const redux_auth = useSelector((state) => state?.reduxData?.authData);
  const statics = useSelector((state) => state?.reduxData?.user_statics);
  const user_statics = statics ? statics : fetchFromStorage("user_statics");
  const auth = redux_auth ? redux_auth : fetchFromStorage("authData");
  const verify_count = useSelector(
    (state) => state?.reduxData?.user_profile_count
  );
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <ToastContainer style={{ padding: "5px" }} limit={1} />
      {location.pathname !== "/" && location.pathname !== "/welcome" && (
        <>
          <TopBar
            auth={auth}
            user_statics={user_statics}
            verify_count={verify_count}
            onMobileNavOpen={() => setMobileNavOpen(true)}
          />
          <NavBar
            auth={auth}
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
        </>
      )}
      <div className="layout-wrapper">
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
