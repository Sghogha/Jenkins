import React from "react";
import { Box } from "@material-ui/core";

const Logo = (props) => {
  return (
    <Box className="app-logo">
      <img
        alt="Logo"
        src="/static/logo.svg"
        {...props}
        // style={{ marginTop: 3, }}
        style={{ width: "158.62px", height: "48.59px" }}
      />
    </Box>
  );
};

export default Logo;
