import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  IconButton,
  List,
  makeStyles,
  Collapse,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { clearStorage } from "src/helpers/context";
import NavItem from "./NavItem";
import items from "../menu";
import { ReactComponent as Logout } from "src/assets/images/icons/logout_blue.svg";

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: "100%",
  },
}));

const NavBar = ({ onMobileClose, openMobile, auth, localesData }) => {
  const classes = useStyles();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState(false);

  // OPEN SUBMENUS
  const handleOpenSubmenu = () => {
    setOpenSubmenu(!openSubmenu);
  };

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
      <Box p={2}>
        <Box className="close-button">
          <IconButton onClick={onMobileClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {/* AUTH DRAWER MENU */}
        <List>
          <NavItem href="/home" title={localesData?.home} itemicon={""} />
          {items.map((item, index) => (
            <Box key={index}>
              <NavItem
                key={item.title}
                href={item.href}
                title={item.title}
                itemicon={item.icon}
                onClick={
                  item?.title === "Manage Video Ads"
                    ? () => handleOpenSubmenu()
                    : null
                }
                subMenus={
                  item?.title === "Manage Video Ads" &&
                  item?.subMenus?.length !== 0 ? (
                    openSubmenu ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null
                }
              />

              {item?.subMenus?.map((sub, i) => {
                return (
                  <Collapse
                    in={openSubmenu}
                    key={i}
                    style={{ marginLeft: "50px" }}
                  >
                    <NavItem
                      href={sub.href}
                      title={sub.title}
                      itemicon={sub.icon}
                    />
                  </Collapse>
                );
              })}
            </Box>
          ))}
          <NavItem
            onClick={() => {
              clearStorage();
              window.location = "/";
            }}
            href=""
            title="Logout"
            itemicon={<Logout />}
          />
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
