import React, { useContext, useEffect } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import { IntlContext } from "src/App";
import { identifiers } from "src/helpers/constants/identifier";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./welcome.scss";
import {
  initOneSignalNotification,
  // getUserId,
  showNativePrompt,
} from "src/helpers/OneSignal/index";

const Welcome = () => {
  const navigate = useNavigate();
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;

  var settings = {
    dots: true,
    infinite: true,
    fade: true,
    autoplay: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    initOneSignalNotification();
    showNativePrompt();
    // var playerID = getUserId();
    // Promise.all([playerID]).then((values) => {
    //   setPlayerId(values[0]);
    // });
  }, []);

  const navigateIndividual = () => {
    navigate("/signup/user");
  };
  const navigateGroup = () => {
    navigate("/signup/org");
  };
  return (
    <Box className="welcome-section-box">
      <Box className="welcome-grid-container">
        {/* LEFT SIDE */}
        <Box className="welcome-left-side">
          <Box className="logo">
            <img alt="Logo" src="/static/logo.svg" />
          </Box>
          <Box className="welcome-title">
            <Typography className="title">
              {localesData?.welcome?.title}
            </Typography>
          </Box>
          <Box className="welcome-description">
            <Typography className="description">
              {localesData?.welcome?.description}
            </Typography>
          </Box>
          <Box className="welcome-btn">
            <Button
              variant="contained"
              className="btn-blue individual-btn"
              onClick={navigateIndividual}
            >
              {localesData?.welcome?.individual_btn}
            </Button>
            <Button
              variant="contained"
              className="btn-blue group-btn"
              onClick={navigateGroup}
            >
              {localesData?.welcome?.group_btn}
            </Button>
          </Box>
          <Box className="welcome-already">
            <Box className="switch-to-signin">
              <Typography className="switch-to-signin">
                {localesData?.welcome?.already_account}
              </Typography>
              <Typography className="switch-to-signin">
                <NavLink to="/sign-in">{localesData?.welcome?.login}</NavLink>
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* RIGHT SIDE */}
        <Box className="welcome-right-side">
          <Box className="welcome-banner-slider">
            <Slider {...settings}>
              {identifiers?.welcomePageSlider?.map((item, i) => {
                return (
                  <Box key={i}>
                    <img
                      src={item?.url}
                      alt="banner"
                      className="welcome-banner"
                    />
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
