import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Avatar,
  Toolbar,
  makeStyles,
  Badge,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
// import Logo from "src/components/Logo";
import { IntlContext } from "src/App";
import { clearStorage, fetchFromStorage } from "src/helpers/context";
import { ReactComponent as NotificationIcon } from "src/assets/images/icons/notification.svg";
import { ReactComponent as UserProfile } from "src/assets/images/icons/profile.svg";
import { ReactComponent as Logout } from "src/assets/images/icons/logout.svg";
import axiosInstance from "src/helpers/axios/axiosInstance";
import { URLS } from "src/helpers/constants/urls";

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: "#366092" },
  title: {
    marginRight: "auto",
  },
  button: {
    color: "#fff",
    fontSize: "21px",
    fontFamily: `Staatliches`,
    fontWeight: "400",
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "0px 8px",
    textTransform: "none",
    marginRight: "25px",
    "&:hover": { backgroundColor: "transparent" },
    "&:last-child": {
      marginRight: 0,
    },
  },
  avatar: { width: 36, height: 36, cursor: "pointer" },
  active: {
    color: "#438AC1",
    fontSize: "21px",
    fontFamily: `Staatliches`,
    fontWeight: "400",
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "0px 8px",
    textTransform: "none",
    marginRight: "25px",
    "&:hover": { backgroundColor: "transparent" },
    "&:last-child": {
      marginRight: 0,
    },
  },
}));

const TopBar = ({
  auth,
  user_statics,
  verify_count,
  className,
  onMobileNavOpen,
  organisationData,
  tooltipStep,
  editWebsiteTooltipDetails,
  subscriptionTooltipDetails,
  ...rest
}) => {
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;
  const classes = useStyles();

  const deviceID = fetchFromStorage("deviceId");
  const redux_userData = useSelector((state) => state?.reduxData?.userData);
  const redux_notification_count = useSelector(
    (state) => state?.reduxData?.notificationCountData
  );
  const userData = redux_userData
    ? redux_userData?.UserData
    : fetchFromStorage("userData")?.UserData;

  const logout = async () => {
    if (deviceID) {
      const requestData = {
        deviceId: deviceID,
      };
      await axiosInstance.post(URLS.logout, requestData);
    }
    window.location = "/";
    clearStorage();
  };

  return (
    <>
      <AppBar
        className={`${clsx(classes.root, className)} app-bar`}
        elevation={0}
        {...rest}
      >
        <Toolbar>
          <NavLink to="/home" className="logo-anchor">
            {/* <Logo /> */}
            <Typography variant="h3" className="logo-text">
              Sezz You
            </Typography>
          </NavLink>
          <Hidden mdDown>
            <NavLink
              to="/home"
              className="logo-anchor link-text"
              style={{ marginLeft: "81px" }}
            >
              {localesData?.home}
            </NavLink>
            <NavLink to="#" className="logo-anchor link-text">
              {localesData?.hour_channel}
            </NavLink>
            <NavLink to="/membership" className="logo-anchor link-text">
              {localesData?.my_membership}
            </NavLink>
          </Hidden>
          <Box flexGrow={1} />

          {auth ? (
            <Hidden mdDown>
              <>
                {/* NOTIFICATION */}
                <IconButton className="app-bar-notification-btn">
                  <Badge
                    badgeContent={
                      redux_notification_count !== undefined
                        ? redux_notification_count
                        : user_statics?.UserTotalCount?.unreadNotification
                    }
                    color="error"
                  >
                    <NotificationIcon />
                  </Badge>
                </IconButton>
                {/* USER PROFILE */}
                <IconButton className="app-bar-notification-btn">
                  {userData?.user_profile ? (
                    <Avatar
                      className="app-bar-avtar"
                      src={userData?.user_profile}
                      alt={userData?.user_profile}
                    />
                  ) : (
                    <UserProfile />
                  )}
                </IconButton>

                {/* LOGOUT */}
                <IconButton
                  onClick={() => logout()}
                  className="app-bar-notification-btn"
                  style={{ paddingRight: "0px" }}
                >
                  <Logout />
                </IconButton>
              </>
            </Hidden>
          ) : (
            <Box width={"31.27px"} />
          )}
          {/* MENU BAR */}
          <Hidden lgUp>
            {/* NOTIFICATION */}
            <IconButton className="app-bar-notification-btn">
              <Badge
                badgeContent={
                  redux_notification_count !== undefined
                    ? redux_notification_count
                    : user_statics?.UserTotalCount?.unreadNotification
                }
                color="error"
              >
                <NotificationIcon />
              </Badge>
            </IconButton>
            {/* USER PROFILE */}
            <IconButton
              className="app-bar-notification-btn"
              style={{ marginRight: "8px" }}
            >
              {userData?.user_profile ? (
                <Avatar
                  className="app-bar-avtar"
                  src={userData?.user_profile}
                  alt={userData?.user_profile}
                />
              ) : (
                <UserProfile />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              onClick={onMobileNavOpen}
              style={{ padding: "0px" }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
