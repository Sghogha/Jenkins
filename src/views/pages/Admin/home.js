import React from "react";
import { makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import Home from "src/views/component/application/Admin/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    height: "100%",
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Advertising | Home">
      <Home />
    </Page>
  );
};

export default HomePage;
