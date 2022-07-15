import React from "react";
import { Box, Typography, Link } from "@material-ui/core";
import { ReactComponent as InstagramIcon } from "src/assets/images/icons/bInstagram.svg";
import "./coming.scss";

const ComingSoon = () => {
  return (
    <Box className="comming-soon">
      <Typography className="cmng-title">coming Soon</Typography>
      <Typography className="cmng-subtxt">
        "This feature is coming soon. Stay tuned and follow us on Instagram for
        updates."
      </Typography>

      <Box className="cmng-insta">
        <Link target="_blank" href="https://www.instagram.com/">
          <InstagramIcon />
        </Link>
      </Box>
    </Box>
  );
};

export default ComingSoon;
