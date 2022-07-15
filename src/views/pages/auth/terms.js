import React from "react";
import { makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import TermsPage from "src/views/component/auth/Terms";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    height: "100%",
  },
}));

const TermsView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Terms & Conditions">
      <TermsPage />
    </Page>
  );
};

export default TermsView;
