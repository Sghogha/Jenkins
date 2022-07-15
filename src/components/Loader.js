import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loader_wraper: {
    position: "fixed",
    top: "0",
    left: "0",
    background: "trasparent",
    width: "100%",
    height: "100%",
    zIndex: "2",
  },
  loader_box: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
  loader_icon: {
    color: "#000000",
  },
}));

export default function PreLoader() {
  const classes = useStyles();
  return (
    <Box className={classes.loader_wraper}>
      <Box
        className={classes.loader_box}
        sx={{
          color: "grey.500",
        }}
      >
        <CircularProgress className={classes.loader_icon} color="inherit" />
      </Box>
    </Box>
  );
}
