import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import VerifyOTPPage from 'src/views/component/auth/VerifyOTP';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    height: '100%'
  }
}));

const VerifyOTPView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Verify OTP">
      <VerifyOTPPage />
    </Page>
  );
};

export default VerifyOTPView;
