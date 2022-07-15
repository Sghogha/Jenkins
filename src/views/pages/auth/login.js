import React from "react";
import { makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import LoginPage from "src/views/component/auth/Login";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    height: "100%",
  },
}));

const LoginView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Sign In | Sezz You">
      <LoginPage />
    </Page>
  );
};

export default LoginView;
