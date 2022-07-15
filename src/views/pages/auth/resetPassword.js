import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import ResetPassword from 'src/views/component/auth/ResetPassword';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    height: '100%'
  }
}));

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Change Password">
      <ResetPassword />
    </Page>
  );
};

export default IndexPage;
