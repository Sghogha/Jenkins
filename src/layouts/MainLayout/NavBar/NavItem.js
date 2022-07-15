import React from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { Button, ListItem, makeStyles, ListItemIcon } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: "#fff",
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    fontFamily: "Staatliches",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: "#438AC1",
    "& $title": {},
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
  drawerIcon: {
    paddingRight: "21px",
    minWidth: "47px",
    color: "#40BFC5",
  },
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  defRoute,
  title,
  itemicon,
  subMenus,
  ...rest
}) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <ListItemIcon className={classes.drawerIcon}>{itemicon}</ListItemIcon>
      <Button
        activeclassname={
          defRoute
            ? location.pathname === href
              ? classes.active
              : ""
            : location.pathname.includes(href)
            ? classes.active
            : ""
        }
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
      {subMenus}
    </ListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default NavItem;
