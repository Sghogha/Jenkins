import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
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
import { saveToStorage } from "src/helpers/context";
import { useDispatch } from "react-redux";
import { loginUser } from "src/helpers/store/Actions/auth";
import { CustomTextField } from "src/views/component/UI/textfield";
import axiosInstance from "src/helpers/axios/axiosInstance";
import { URLS } from "src/helpers/constants/urls";
import { setApiMessage } from "src/helpers/commonFunctions";
import {
  initOneSignalNotification,
  getUserId,
} from "src/helpers/OneSignal/index";
import "../auth.scss";
import PreLoader from "src/components/Loader";

const VerifyOTPPage = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;
  const [playerId, setPlayerId] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    initOneSignalNotification();
    var playerID = getUserId();
    Promise.all([playerID]).then((values) => {
      setPlayerId(values[0]);
    });
  }, []);

  const resendOTP = async () => {
    setLoader(true);
    const requestData = {
      email: email ? email : "",
      type: "register",
    };
    try {
      const { status } = await axiosInstance.post(URLS.resendOTP, requestData);
      if (status === 200) {
        setApiMessage("success", localesData?.resendOTP?.resendotp_msg);
        setLoader(false);
      }
    } catch (error) {
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
                  {localesData?.verify_otp?.verify_otp}
                </Typography>
                <Typography className="description">
                  {localesData?.verify_otp?.description}
                </Typography>
                <Box className="form-content">
                  <Formik
                    initialValues={{
                      otp: "",
                    }}
                    validationSchema={Yup.object().shape({
                      otp: Yup.string()
                        .min(4, localesData?.resetpassword?.invalid_otp)
                        .required(localesData?.validation?.required_message),
                    })}
                    onSubmit={async (requestData) => {
                      setLoader(true);
                      const sendData = {
                        email: String(email ? email : ""),
                        otp: requestData.otp,
                        type: "register",
                      };
                      try {
                        const { status, data } = await axiosInstance.post(
                          URLS.verifyOTP,
                          sendData
                        );
                        if (status === 200) {
                          if (data?.data?.token) {
                            if (playerId) {
                              const requestDeviceData = {
                                deviceId: playerId,
                                type: "register",
                              };
                              await axiosInstance.post(
                                URLS.deviceId,
                                requestDeviceData,
                                {
                                  headers: {
                                    Authorization: `Bearer ${data?.data?.token}`,
                                    "Content-Type": "application/json",
                                  },
                                }
                              );
                              saveToStorage("deviceId", playerId);
                            }
                            setApiMessage("success", data?.message);
                            saveToStorage("authData", data?.data);
                            dispatch(loginUser(data?.data));
                            navigate(`/home`);
                            window.location.reload();
                            setLoader(false);
                          }
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
                          <Grid item xs={12} md={12}>
                            <Button
                              variant="contained"
                              fullWidth
                              type="submit"
                              className="signup-button btn-blue"
                            >
                              {localesData?.verify_otp?.submit}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    )}
                  </Formik>

                  <Typography
                    className="resend-otp-text"
                    onClick={() => {
                      resendOTP();
                    }}
                  >
                    {localesData?.verify_otp?.resend_otp}
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

export default VerifyOTPPage;
