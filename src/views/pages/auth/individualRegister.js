import React from "react";
import { makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import SignupPage from "src/views/component/auth/Register/IndividualUser";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    height: "100%",
  },
}));

const RegisterView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Create User - Individual">
      <SignupPage />
    </Page>
  );
};

export default RegisterView;
