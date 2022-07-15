import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Box,
  Grid,
  Typography,
  FormHelperText,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { IntlContext } from "src/App";
import { CustomTextField } from "src/views/component/UI/textfield";
import axiosInstance from "src/helpers/axios/axiosInstance";
import { URLS } from "src/helpers/constants/urls";
import { setApiMessage } from "src/helpers/commonFunctions";
import "../auth.scss";
import PreLoader from "src/components/Loader";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loader, setLoader] = useState(false);

  const resendOTP = async () => {
    setLoader(true);
    const requestData = {
      email: email ? email : "",
      type: "forgot",
    };

    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 60000);
    try {
      const { status } = await axiosInstance.post(URLS.resendOTP, requestData);
      if (status === 200) {
        setApiMessage("success", localesData?.resendOTP?.resendotp_msg);
        setLoader(false);
      }
    } catch (error) {
      setIsDisabled(false);
      setApiMessage("error", error?.response?.data?.message);
      setLoader(false);
    }
  };
  return (
    <Box className="auth-section-box">
      {loader && <PreLoader />}
      <Grid container className="auth-grid-container">
        <Grid item xs={12} sm={12} md={12} lg={12} className="auth-left-grid">
          <Box className="content">
            <Card>
              <CardContent>
                <Typography className="title">
                  {localesData?.resetpassword?.forgot_password}
                </Typography>
                <Typography className="description">
                  {localesData?.resetpassword?.description}
                </Typography>
                <Box className="form-content">
                  <Formik
                    initialValues={{
                      otp: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={Yup.object().shape({
                      otp: Yup.string()
                        .min(4, localesData?.resetpassword?.invalid_otp)
                        .required(localesData?.validation?.required_message),
                      password: Yup.string()
                        .required(localesData?.validation?.required_message)
                        .min(6, localesData?.validation?.passowrd_length),
                      confirmPassword: Yup.string()
                        .required(localesData?.validation?.required_message)
                        .min(6, localesData?.validation?.passowrd_length)
                        .when("password", {
                          is: (val) => (val && val.length > 0 ? true : false),
                          then: Yup.string().oneOf(
                            [Yup.ref("password")],
                            localesData?.validation?.password_confpass_not_match
                          ),
                        }),
                    })}
                    onSubmit={async (requestData) => {
                      setLoader(true);
                      const sendData = {
                        email: email,
                        otp: requestData.otp,
                        password: requestData.password,
                      };
                      setIsDisabledButton(true);
                      setTimeout(() => {
                        setIsDisabledButton(false);
                      }, 60000);
                      try {
                        const { status, data } = await axiosInstance.post(
                          URLS.resetPassword,
                          sendData
                        );
                        if (status === 200) {
                          setApiMessage("success", data?.message);
                          setTimeout(() => {
                            navigate("/");
                          }, 5000);
                          setLoader(false);
                        }
                      } catch (error) {
                        setIsDisabledButton(false);
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
                              {localesData?.resetpassword?.otp}
                              <span className="valid_star">*</span>
                            </FormHelperText>
                            <CustomTextField
                              error={Boolean(touched.otp && errors.otp)}
                              fullWidth
                              helperText={touched.otp && errors.otp}
                              variant="outlined"
                              className="custom-textfield"
                              size="small"
                              name="otp"
                              onBlur={handleBlur}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (
                                  e.target.value === "" ||
                                  re.test(e.target.value)
                                ) {
                                  handleChange(e);
                                }
                              }}
                              inputProps={{ maxLength: 6 }}
                              value={values.otp}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={12}
                            className="text-field-grid"
                          >
                            <FormHelperText className="custom-field-helper">
                              {localesData?.resetpassword?.new_passowrd}
                              <span className="valid_star">*</span>
                            </FormHelperText>
                            <CustomTextField
                              error={Boolean(
                                touched.password && errors.password
                              )}
                              fullWidth
                              helperText={touched.password && errors.password}
                              variant="outlined"
                              className="custom-textfield password-text-field"
                              size="small"
                              name="password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.password?.replace(/\s+/g, "") || ""}
                              type={
                                showPassword?.password ? "text" : "password"
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      disableRipple
                                      onClick={() =>
                                        setShowPassword({
                                          ...showPassword,
                                          password: !showPassword?.password,
                                        })
                                      }
                                    >
                                      {showPassword?.password ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={12}
                            className="text-field-grid"
                          >
                            <FormHelperText className="custom-field-helper">
                              {localesData?.resetpassword?.repeate_password}
                              <span className="valid_star">*</span>
                            </FormHelperText>
                            <CustomTextField
                              error={Boolean(
                                touched.confirmPassword &&
                                  errors.confirmPassword
                              )}
                              fullWidth
                              helperText={
                                touched.confirmPassword &&
                                errors.confirmPassword
                              }
                              variant="outlined"
                              className="custom-textfield password-text-field"
                              size="small"
                              name="confirmPassword"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={
                                values.confirmPassword?.replace(/\s+/g, "") ||
                                ""
                              }
                              type={
                                showPassword?.confirmPassword
                                  ? "text"
                                  : "password"
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      disableRipple
                                      onClick={() =>
                                        setShowPassword({
                                          ...showPassword,
                                          confirmPassword: !showPassword?.confirmPassword,
                                        })
                                      }
                                    >
                                      {showPassword?.confirmPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Button
                              variant="contained"
                              fullWidth
                              type="submit"
                              className="signup-button btn-blue"
                              disabled={isDisabledButton}
                            >
                              {localesData?.resetpassword?.reset_password}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    )}
                  </Formik>

                  <Typography
                    className="resend-otp-text"
                    onClick={() => {
                      !isDisabled && resendOTP();
                    }}
                  >
                    {localesData?.resetpassword?.resend_otp}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPasswordPage;
