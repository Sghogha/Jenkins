import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Grid,
  Typography,
  FormHelperText,
  Card,
  CardContent,
} from "@material-ui/core";
import { IntlContext } from "src/App";
import { CustomTextField } from "src/views/component/UI/textfield";
import axiosInstance from "src/helpers/axios/axiosInstance";
import { URLS } from "src/helpers/constants/urls";
import { setApiMessage } from "src/helpers/commonFunctions";
import "../auth.scss";
import PreLoader from "src/components/Loader";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;
  const [isDisabled, setIsDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  return (
    <Box className="auth-section-box">
      {loader && <PreLoader />}
      <Grid container className="auth-grid-container">
        <Grid item xs={12} sm={12} md={12} lg={12} className="auth-left-grid">
          <Box className="content">
            <Card>
              <CardContent>
                <Typography className="title">
                  {localesData?.forgotpassword?.forgot_password}
                </Typography>
                <Box className="form-content">
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email(localesData?.validation?.valid_email)
                        .max(255)
                        .required(localesData?.validation?.required_message),
                    })}
                    onSubmit={async (requestData) => {
                      setLoader(true);
                      setIsDisabled(true);
                      setTimeout(() => {
                        setIsDisabled(false);
                      }, 60000);
                      try {
                        const { status, data } = await axiosInstance.post(
                          URLS.forgotPassword,
                          requestData
                        );
                        if (status === 200) {
                          if (data?.status) {
                            setApiMessage("success", data?.message);
                            setTimeout(() => {
                              navigate(`/reset-password/${requestData.email}`);
                            }, 5000);
                          }
                          if (data?.data?.status === "pending") {
                            setApiMessage("error", data?.message);
                            setTimeout(() => {
                              navigate(`/verify-otp/${requestData.email}`, {
                                replace: true,
                              });
                            }, 5000);
                          }
                          setLoader(false);
                        }
                      } catch (error) {
                        setIsDisabled(false);
                        setApiMessage("error", error?.response?.data?.message);
                        setLoader(false);
                      }
                    }}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      touched,
                      values,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                          <Grid
                            item
                            xs={12}
                            md={12}
                            className="text-field-grid"
                          >
                            <FormHelperText className="custom-field-helper">
                              {localesData?.email}
                              <span className="valid_star">*</span>
                            </FormHelperText>
                            <CustomTextField
                              error={Boolean(touched.email && errors.email)}
                              fullWidth
                              helperText={touched.email && errors.email}
                              variant="outlined"
                              className="custom-textfield"
                              size="small"
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Button
                              variant="contained"
                              fullWidth
                              type="submit"
                              className="signup-button btn-blue"
                              disabled={isDisabled}
                            >
                              {localesData?.forgotpassword?.submit}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    )}
                  </Formik>
                </Box>
                <Box className="fancy-link">
                  <Box style={{ marginBottom: "6px" }}>
                    <NavLink to="/" className="switch_to_signin">
                      {localesData?.login?.signin}
                    </NavLink>
                  </Box>
                  <Box style={{ marginBottom: "6px" }}>
                    <NavLink to="/sign-up" className="switch_to_signin">
                      {localesData?.register?.signup}
                    </NavLink>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgotPasswordPage;
