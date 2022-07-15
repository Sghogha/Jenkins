import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import ForgotPassword from 'src/views/component/auth/ForotPassword';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    height: '100%'
  }
}));

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Forgot Password">
      <ForgotPassword />
    </Page>
  );
};

export default IndexPage;
