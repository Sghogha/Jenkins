import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  IconButton,
  List,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import NavItem from "./NavItem";

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: "100%",
  },
}));

const NavBar = ({ onMobileClose, openMobile, auth }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      className="menu-bar"
    >
      {/* MENU BUTTON */}
      <Box p={2}>
        <Box className="close-button">
          <IconButton onClick={onMobileClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <NavItem href="/" title="Sign in" />
          <NavItem href="/sign-up" title="Sign up" />
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <Hidden lgUp>
      <Drawer
        anchor="left"
        classes={{ paper: classes.mobileDrawer }}
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
      >
        {content}
      </Drawer>
    </Hidden>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
