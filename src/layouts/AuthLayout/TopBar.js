import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "src/components/Logo";
import { IntlContext } from "src/App";

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: "#cdedf6" },
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
  ...rest
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;

  const returnWelcomePage = () => {
    navigate("/welcome");
  };

  return (
    <AppBar
      className={`${clsx(classes.root, className)} app-bar`}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <NavLink to="/home" className="logo-anchor">
          <Logo />
        </NavLink>
        <Box onClick={returnWelcomePage}>
          <Typography variant="h5" className="topbar-return-text">
            {localesData?.register?.return}
          </Typography>
        </Box>
        <Box />
        {location.pathname !== "/terms-conditions" ? (
          <>
            <Hidden lgUp>
              <IconButton
                color="inherit"
                onClick={onMobileNavOpen}
                style={{ padding: "0px" }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
