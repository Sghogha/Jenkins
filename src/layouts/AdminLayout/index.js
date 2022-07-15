import React, { useContext, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  makeStyles,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CssBaseline,
  withStyles,
  Hidden,
  Avatar,
  Typography,
  Collapse,
} from "@material-ui/core";
import { IntlContext } from "src/App";
import {
  ChevronRight,
  ChevronLeft,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { fetchFromStorage } from "src/helpers/context";
import NavBar from "./NavBar";
import TopBar from "../MainLayout/TopBar";
import "src/layouts/layout.scss";

// ICON
import { ReactComponent as Dashboard } from "src/assets/images/icons/dashboard.svg";
import { ReactComponent as Pancil } from "src/assets/images/icons/pencil.svg";
import { ReactComponent as BillingInformtion } from "src/assets/images/icons/subscriptions.svg";
import { ReactComponent as Orgdetails } from "src/assets/images/icons/org-details.svg";

// SELECTED ICON
import { ReactComponent as SDashboard } from "src/assets/images/icons/s_dashboard.svg";
import { ReactComponent as SBillingInformtion } from "src/assets/images/icons/s_subscriptions.svg";
import { ReactComponent as SOrgdetails } from "src/assets/images/icons/s_org-details.svg";
import { ReactComponent as SPencil } from "src/assets/images/icons/s_pencil.svg";

const drawerWidth = 335;

// SIDE DRAWER
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    marginTop: "51px",
    background: "#1E2125",
    paddingBottom: "51px",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    marginTop: "51px",
    background: "#1E2125",
    paddingBottom: "51px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  sideDrawercontent: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerIcon: {
    paddingRight: "21px",
    // minWidth: "auto",
    minWidth: "47px",
    color: "#40BFC5",
  },
  drawerTextColor: {
    color: "#FFFFFF",
  },
  active: {
    backgroundColor: "#40BFC5",
    color: "#1e2125",
  },
  collapseIcon: {
    color: "#40BFC5",
  },
}));

// SIDE DRAWER MENU
const MuiListItem = withStyles({
  root: {
    width: "auto",
    borderRadius: "12px",
    margin: "0 18px 8px 18px",
    padding: "8px",
    "&$selected": {
      // margin: "0 18px 8px 18px",
      backgroundColor: "#40BFC5",
      color: "#1e2125",
      "& .MuiListItemIcon-root": {
        color: "#1e2125",
      },
      "& .MuiListItemText-root": {
        color: "#1e2125",
      },
    },
    "&$selected:hover": {
      backgroundColor: "#40BFC5",
      color: "#1e2125",
      "& .MuiListItemIcon-root": {
        color: "#1e2125",
      },
      "& .MuiListItemText-root": {
        color: "#1e2125",
      },
    },
    "&:hover": {
      backgroundColor: "#2d7b7e",
      color: "#1e2125",
      "& .MuiListItemIcon-root": {
        color: "#1e2125",
      },
      "& .MuiListItemText-root": {
        color: "#1e2125",
      },
    },
  },
  selected: {},
})(ListItem);

// MENUS
const menusItems = [
  {
    href: "/advertise/dashboard",
    title: "Dashboard",
    icon: <Dashboard />,
    activeIcon: <SDashboard />,
    subMenus: [],
  },
  {
    href: "#",
    title: "Manage Video Ads",
    icon: <Pancil />,
    activeIcon: <Pancil />,
    subMenus: [
      {
        href: "/advertise/new",
        title: "New Ad",
        icon: <Pancil />,
        activeIcon: <SPencil />,
        subMenus: [],
      },
      {
        href: "/advertise/all",
        title: "All Ads",
        icon: <Pancil />,
        activeIcon: <SPencil />,
        subMenus: [],
      },
    ],
  },
  {
    href: "/advertise/organisation-details",
    title: "Organisation Details",
    icon: <Orgdetails />,
    activeIcon: <SOrgdetails />,
    subMenus: [],
  },
  {
    href: "/advertise/billing-information",
    title: "Billing Information",
    icon: <BillingInformtion />,
    activeIcon: <SBillingInformtion />,
    subMenus: [],
  },
];
const DashboardLayout = () => {
  const classes = useStyles();
  const location = useLocation();
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;
  const redux_auth = useSelector((state) => state?.reduxData?.authData);
  const redux_userData = useSelector((state) => state?.reduxData?.userData);
  const user_statics = redux_userData
    ? redux_userData
    : fetchFromStorage("userData");
  const auth = redux_auth ? redux_auth : fetchFromStorage("authData");

  const redux_organisationData = useSelector(
    (state) => state?.reduxData?.organisationData
  );
  const organisationData = redux_organisationData
    ? redux_organisationData
    : fetchFromStorage("organisationData");

  const verify_count = useSelector(
    (state) => state?.reduxData?.user_profile_count
  );
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(false);

  // DRAWER OPEN
  const handleDrawerOpen = () => {
    setCollapse(true);
  };

  // DRAWER CLOSE
  const handleDrawerClose = () => {
    setCollapse(false);
  };

  // OPEN SUBMENUS
  const handleOpenSubmenu = () => {
    setOpenSubmenu(!openSubmenu);
  };

  useEffect(() => {
    if (location.pathname === "/admin") {
      setOpenSubmenu(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <ToastContainer style={{ padding: "5px" }} limit={1} />
      <TopBar
        auth={auth}
        user_statics={user_statics}
        verify_count={verify_count}
        organisationData={organisationData}
        onMobileNavOpen={() => setMobileNavOpen(true)}
      />
      <NavBar
        auth={auth}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        localesData={localesData}
      />
      <Hidden mdDown>
        {location.pathname !== "/admin" && (
          <Box className="left-menu-drawer">
            <CssBaseline />
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: collapse,
                [classes.drawerClose]: !collapse,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: collapse,
                  [classes.drawerClose]: !collapse,
                }),
              }}
            >
              {/* COLLAPSE ICON */}
              <Box className={classes.toolbar}>
                <IconButton
                  className={classes.drawerIcon}
                  onClick={collapse ? handleDrawerClose : handleDrawerOpen}
                  disableRipple
                >
                  {collapse ? (
                    <>
                      <ChevronLeft />
                      <Typography className="collapse-text">
                        {localesData?.collapse}
                      </Typography>
                    </>
                  ) : (
                    <ChevronRight />
                  )}
                </IconButton>
              </Box>
              {/* AVATAR */}
              <Box className="avatar-section">
                {organisationData?.org_profile_id ? (
                  <Avatar src={organisationData?.org_profile_id} />
                ) : (
                  <Avatar>{organisationData?.name?.charAt(0)}</Avatar>
                )}
                <Typography variant="h5">{organisationData?.name}</Typography>
              </Box>
              {/* MENUS LIST */}
              <List>
                {menusItems.map((item) => (
                  <Box key={item?.title}>
                    <MuiListItem
                      button
                      component={Link}
                      to={item?.href}
                      selected={item?.href === location.pathname}
                      disableRipple
                      onClick={
                        item?.title === "Manage Video Ads"
                          ? () => handleOpenSubmenu()
                          : null
                      }
                    >
                      <ListItemIcon className={classes.drawerIcon}>
                        {item?.href === location.pathname
                          ? item?.activeIcon
                          : item?.icon}
                      </ListItemIcon>
                      <ListItemText className={classes.drawerTextColor}>
                        {item?.title}
                      </ListItemText>
                      {item?.subMenus?.length !== 0 ? (
                        openSubmenu ? (
                          <ExpandLess className={classes.collapseIcon} />
                        ) : (
                          <ExpandMore className={classes.collapseIcon} />
                        )
                      ) : null}
                    </MuiListItem>
                    {item?.subMenus?.map((obj, index) => (
                      <Collapse in={openSubmenu} key={index}>
                        <MuiListItem
                          key={obj?.title}
                          button
                          component={Link}
                          to={obj?.href}
                          selected={obj?.href === location.pathname}
                          disableRipple
                        >
                          {collapse ? (
                            <ListItemIcon></ListItemIcon>
                          ) : (
                            <ListItemIcon className={classes.drawerIcon}>
                              {obj?.href === location.pathname
                                ? obj?.activeIcon
                                : obj?.icon}
                            </ListItemIcon>
                          )}

                          <ListItemText className={classes.drawerTextColor}>
                            {obj?.title}
                          </ListItemText>
                        </MuiListItem>
                        {obj?.subMenus?.map((sub, index) => (
                          <MuiListItem
                            key={sub?.title}
                            button
                            component={Link}
                            to={sub?.href}
                            selected={sub?.href === location.pathname}
                            disableRipple
                            className="post-submenu"
                          >
                            <ListItemText className={classes.drawerTextColor}>
                              {sub?.title}
                            </ListItemText>
                          </MuiListItem>
                        ))}
                      </Collapse>
                    ))}
                  </Box>
                ))}
              </List>
            </Drawer>
          </Box>
        )}
      </Hidden>
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
