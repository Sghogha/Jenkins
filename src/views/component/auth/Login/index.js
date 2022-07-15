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
import { saveToStorage } from "src/helpers/context";
import { useDispatch } from "react-redux";
import { loginUser } from "src/helpers/store/Actions/auth";
import "../auth.scss";
import PreLoader from "src/components/Loader";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const resendOTP = async (email) => {
    setLoader(true);
    const requestData = {
      email: email ? email : "",
      type: "register",
    };
    try {
      const { status, data } = await axiosInstance.post(
        URLS.resendOTP,
        requestData
      );
      if (status === 200) {
        setApiMessage("success", data?.message);
        setLoader(false);
      }
    } catch (error) {
      setApiMessage("error", error?.response?.data?.message);
      setLoader(false);
    }
  };

  const tokenSaveHandler = async (data) => {
    let token = data?.token;
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 60000);
    if (token) {
      saveToStorage("authData", data);
      dispatch(loginUser(data));
      if (data?.channel_status) {
        navigate(`/home`);
        window.location.reload();
      } else {
        navigate(`/home`);
        window.location.reload();
      }
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
                  {localesData?.login?.signin}
                </Typography>

                <Box className="form-content">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email(localesData?.validation?.valid_email)
                        .max(255)
                        .required(localesData?.validation?.required_message),
                      password: Yup.string()
                        .required(localesData?.validation?.required_message)
                        .min(6, localesData?.validation?.passowrd_length),
                    })}
                    onSubmit={async (requestData) => {
                      setLoader(true);
                      try {
                        const { status, data } = await axiosInstance.post(
                          URLS.signIn,
                          requestData
                        );

                        if (status === 200) {
                          if (data?.user_Verify_status === "pending") {
                            setApiMessage("error", data?.message);
                            setTimeout(() => {
                              navigate(`/verify-otp/${requestData?.email}`);
                              resendOTP(requestData?.email);
                            }, 5000);
                          } else {
                            tokenSaveHandler(data?.data);
                          }
                          setLoader(false);
                        }
                      } catch (error) {
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
                          <Grid
                            item
                            xs={12}
                            md={12}
                            className="text-field-grid"
                          >
                            <FormHelperText className="custom-field-helper">
                              {localesData?.password}
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
                              type={showPassword ? "text" : "password"}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      disableRipple
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                    >
                                      {showPassword ? (
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
                              disabled={isDisabled}
                            >
                              {localesData?.login?.signin}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    )}
                  </Formik>
                </Box>

                <Box className="fancy-link" style={{ marginTop: "54px" }}>
                  <Box style={{ marginBottom: "6px" }}>
                    <NavLink to="/forgot-password" className="switch_to_signin">
                      {localesData?.login?.forgot_password}
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

export default LoginPage;
