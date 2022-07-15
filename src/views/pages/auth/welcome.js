import React from "react";
import { makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import WelcomePage from "src/views/component/auth/Welcome";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
}));

const WelcomeView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Sign In | Sezz You">
      <WelcomePage />
    </Page>
  );
};

export default WelcomeView;
