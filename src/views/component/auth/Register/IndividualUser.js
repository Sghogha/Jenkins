import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Grid,
  Typography,
  FormHelperText,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Checkbox,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { IntlContext } from "src/App";
import { CustomTextField } from "src/views/component/UI/textfield";
import axiosInstance from "src/helpers/axios/axiosInstance";
import { URLS } from "src/helpers/constants/urls";
import { setApiMessage } from "src/helpers/commonFunctions";
import { ReactComponent as CheckedRadioIcon } from "src/assets/images/icons/check-radio.svg";
import { ReactComponent as UnCheckedRadioIcon } from "src/assets/images/icons/uncheck-radio.svg";
import { ReactComponent as PersonalDetails } from "src/assets/images/icons/personal-details.svg";
import { ReactComponent as Location } from "src/assets/images/icons/home.svg";
import { ReactComponent as UserDetails } from "src/assets/images/icons/user-details.svg";
import { ReactComponent as Interests } from "src/assets/images/icons/Interests.svg";
import { ReactComponent as Agreement } from "src/assets/images/icons/agreement.svg";
import { ReactComponent as MobilePhone } from "src/assets/images/icons/mobile-phone.svg";
// import { ReactComponent as DatePickerIcon } from "src/assets/images/icons/datepicker.svg";
import { ReactComponent as CheckIcon } from "src/assets/images/icons/checked-checkbox.svg";
import { ReactComponent as UncheckIcon } from "src/assets/images/icons/unchecked-checkbox.svg";

import "../auth.scss";
import PreLoader from "src/components/Loader";
import { CustomSelectInput } from "src/views/component/UI/select";
import Terms from "../Terms";

const IndividualRegisterPage = () => {
  const navigate = useNavigate();
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [countryOption, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [categoryOprions, setCategoryOprions] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryPhoneCode, setCountryPhoneCode] = useState("");

  // GET NATIONALITY
  const getNationality = async () => {
    try {
      setLoader(true);

      const { status, data } = await axiosInstance.get(URLS.getNationalitys);
      if (status === 200) {
        setNationalityOptions(data?.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };
  // GET COUNTRY
  const getCountry = async () => {
    try {
      setLoader(true);
      const { status, data } = await axiosInstance.get(URLS.getCountry);
      if (status === 200) {
        setCountryOptions(data?.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  // GET STATE
  const getState = async () => {
    try {
      setLoader(true);
      const { status, data } = await axiosInstance.get(
        URLS.getState + `/${countryCode}`
      );
      if (status === 200) {
        setStateOptions(data?.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  // GET CITY
  const getCity = async () => {
    try {
      setLoader(true);
      const { status, data } = await axiosInstance.get(
        URLS.getCity + `/${stateCode}`
      );
      if (status === 200) {
        setCityOptions(data?.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  // GET CATEGORY
  const getCategory = async () => {
    try {
      setLoader(true);

      const { status, data } = await axiosInstance.get(URLS.getCategory);
      if (status === 200) {
        setCategoryOprions(data?.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  // SEND CODE
  const handleSendCode = async () => {
    if (phoneNumber !== "") {
      let requestData = {
        phone: phoneNumber,
      };
      try {
        setLoader(true);
        const { status, data } = await axiosInstance.post(
          URLS.sendCode,
          requestData
        );
        if (status === 200) {
          setLoader(false);
          setApiMessage("success", data?.message);
        } else {
          setApiMessage("error", data?.message);
        }
      } catch (error) {
        setLoader(false);
        setApiMessage("error", error?.response?.data?.message);
      }
    } else {
      setApiMessage("error", localesData?.validation?.mobile_valid);
    }
  };
  useEffect(() => {
    getNationality();
    getCountry();
    getCategory();
  }, []);

  useEffect(() => {
    if (countryCode !== "") {
      getState();
    }
    // eslint-disable-next-line
  }, [countryCode]);
  useEffect(() => {
    if (stateCode !== "") {
      getCity();
    }
    // eslint-disable-next-line
  }, [stateCode]);

  return (
    <Box className="auth-section-box">
      {loader && <PreLoader />}
      <Grid container className="auth-grid-container">
        <Grid item xs={12} sm={12} md={12} lg={12} className="auth-left-grid">
          <Box className="content">
            <Box>
              <Typography className="content auth-head">
                {localesData?.register?.new_individual}
              </Typography>
              <Divider className="divider first-divider" />
              <Divider className="divider second-divider" />
            </Box>

            <Box className="form-content">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  DOB: "",
                  gender: "",
                  nationality: "",
                  country: "",
                  state: "",
                  city: "",
                  email: "",
                  yourUsername: "",
                  password: "",
                  confirmPassword: "",
                  region_level_1: "",
                  region_level_2: "",
                  policy: false,
                  mobileCountry: "",
                  mobile_no: "",
                  otpCode: "",
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string()
                    .trim()
                    .required(localesData?.validation?.required_message)
                    .matches(/[^0-9]/g, localesData?.validation?.number_valid),
                  lastName: Yup.string()
                    .trim()
                    .required(localesData?.validation?.required_message)
                    .matches(/[^0-9]/g, localesData?.validation?.number_valid),
                  DOB: Yup.string()
                    .trim()
                    .required(localesData?.validation?.required_message),
                  nationality: Yup.string()
                    .trim()
                    .required(localesData?.validation?.required_message),
                  country: Yup.string()
                    .trim()
                    .required(localesData?.validation?.required_message),
                  email: Yup.string()
                    .trim()
                    .email(localesData?.validation?.valid_email)
                    .max(255)
                    .required(localesData?.validation?.required_message)
                    .matches(
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      localesData?.validation?.valid_email
                    ),
                  yourUsername: Yup.string()
                    .trim()
                    .required(localesData?.validation?.required_message)
                    .min(5, localesData?.validation?.username_min_length)
                    .max(20, localesData?.validation?.username_max_length),
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
                  policy: Yup.boolean().oneOf(
                    [true],
                    localesData?.validation?.accept_terms
                  ),
                  mobileCountry: Yup.string()
                    .trim()
                    .required(localesData?.validation?.required_message),
                  otpCode: Yup.string()
                    .trim()
                    .required(localesData?.validation?.required_message),
                })}
                onSubmit={async (requestData) => {
                  setLoader(true);
                  let sendData = {
                    first_name: requestData.firstName,
                    last_name: requestData.lastName,
                    birth_date: requestData.DOB,
                    gender: requestData.gender,
                    country: requestData.country,
                    state: requestData.state,
                    city: requestData.city,
                    email: requestData.email,
                    password: requestData.password,
                    yourUsername: requestData.yourUsername,
                  };
                  console.log("sendData", sendData);
                  try {
                    const { status, data } = await axiosInstance.post(
                      URLS.signUp,
                      sendData
                    );
                    setIsDisabled(true);
                    setTimeout(() => {
                      setIsDisabled(false);
                    }, 60000);
                    if (status === 200) {
                      setApiMessage("success", data?.message);
                      setTimeout(() => {
                        navigate(`/verify-otp/${requestData.email}`, {
                          replace: true,
                        });
                      }, 5000);
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
                    <Box>
                      {/* PERSONAL DETAILS */}
                      <Box className="auth-title-bg">
                        <Box>
                          <PersonalDetails />
                        </Box>
                        <Typography className="auth-title">
                          {localesData?.register?.personal_details}
                        </Typography>
                      </Box>
                      <Grid container className="reg-grid-container">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Grid container>
                            {/* FIRST NAME */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.firstName}
                                <span className="valid_star">*</span>
                              </FormHelperText>
                              <CustomTextField
                                fullWidth
                                error={Boolean(
                                  touched.firstName && errors.firstName
                                )}
                                helperText={
                                  touched.firstName && errors.firstName
                                }
                                variant="outlined"
                                className="custom-textfield reg-textfield"
                                name="firstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                onKeyPress={(e) => {
                                  if (/[^a-zA-Z ]/g.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </Grid>
                            {/* LAST NAME */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.lastName}
                                <span className="valid_star">*</span>
                              </FormHelperText>
                              <CustomTextField
                                fullWidth
                                error={Boolean(
                                  touched.lastName && errors.lastName
                                )}
                                helperText={touched.lastName && errors.lastName}
                                variant="outlined"
                                className="custom-textfield reg-textfield"
                                name="lastName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                onKeyPress={(e) => {
                                  if (/[^a-zA-Z ]/g.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </Grid>
                            {/* BIRTH DATE */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.DOB}
                                <span className="valid_star">*</span>
                              </FormHelperText>
                              <CustomTextField
                                fullWidth
                                error={Boolean(touched.DOB && errors.DOB)}
                                helperText={touched.DOB && errors.DOB}
                                variant="outlined"
                                className="custom-textfield dob-textfield"
                                size="small"
                                name="DOB"
                                type="date"
                                placeholder="- Select -"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.DOB}
                              />
                            </Grid>
                            {/* GENDER */}
                            <Grid
                              item
                              xs={12}
                              md={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.gender}
                              </FormHelperText>
                              <FormControl className="gender-radio">
                                <RadioGroup
                                  row
                                  name="gender"
                                  value={values.gender}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel
                                    value="1"
                                    control={
                                      <Radio
                                        icon={<UnCheckedRadioIcon />}
                                        checkedIcon={<CheckedRadioIcon />}
                                        disableRipple
                                        color="primary"
                                      />
                                    }
                                    label="Male"
                                  />
                                  <FormControlLabel
                                    value="2"
                                    control={
                                      <Radio
                                        icon={<UnCheckedRadioIcon />}
                                        checkedIcon={<CheckedRadioIcon />}
                                        color="primary"
                                        disableRipple
                                      />
                                    }
                                    label="Female"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                            {/* NATIONALITY */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.nationality}
                                <span className="valid_star">*</span>
                              </FormHelperText>
                              <Select
                                fullWidth
                                error={Boolean(
                                  touched.nationality && errors.nationality
                                )}
                                className="custom-select reg-textfield"
                                displayEmpty
                                name="nationality"
                                value={values.nationality || ""}
                                onChange={handleChange}
                                input={<CustomSelectInput />}
                              >
                                <MenuItem value="">
                                  <em>- Select -</em>
                                </MenuItem>
                                {nationalityOptions?.map((obj, index) => (
                                  <MenuItem key={index} value={obj?.value}>
                                    {obj?.value}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched.nationality && errors.nationality && (
                                <FormHelperText
                                  error={Boolean(
                                    touched.nationality && errors.nationality
                                  )}
                                >
                                  {errors.nationality}
                                </FormHelperText>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box className="reg-right-content">
                            <Box className="res-right-side">
                              <Typography
                                variant="h6"
                                className="res-right-text personal_desc_text"
                              >
                                {localesData?.register?.personal_desc}
                              </Typography>
                            </Box>
                          </Box>
                          <Box className="reg-right-content">
                            <Box className="res-right-side">
                              <Typography
                                variant="h6"
                                className="res-right-text"
                              >
                                {localesData?.register?.personal_desc_1}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                      {/* RESIDENCE */}
                      <Box className="auth-title-bg">
                        <Box>
                          <Location />
                        </Box>
                        <Typography className="auth-title">
                          {localesData?.register?.residence}
                        </Typography>
                      </Box>
                      <Grid container className="reg-grid-container">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Grid container>
                            {/* COUNTRY */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <Select
                                fullWidth
                                error={Boolean(
                                  touched.country && errors.country
                                )}
                                className="custom-select reg-textfield"
                                displayEmpty
                                name="country"
                                value={values.country}
                                onChange={(e) => {
                                  handleChange(e);
                                  setCountryCode(e.target.value);
                                }}
                                input={<CustomSelectInput />}
                              >
                                <MenuItem value="">
                                  <em>Country</em>
                                </MenuItem>
                                {countryOption?.map((obj, index) => (
                                  <MenuItem key={index} value={obj?.place_code}>
                                    {obj?.place_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                            {/* REGION LEVEL 1 */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <Select
                                fullWidth
                                className="custom-select reg-textfield"
                                displayEmpty
                                name="state"
                                value={values.state || ""}
                                onChange={(e) => {
                                  handleChange(e);
                                  setStateCode(e.target.value);
                                }}
                                input={
                                  <CustomSelectInput
                                    disabled={values.country === ""}
                                  />
                                }
                              >
                                <MenuItem value="">
                                  <em>Region Level 1</em>
                                </MenuItem>
                                {stateOptions?.map((obj, index) => (
                                  <MenuItem key={index} value={obj?.place_code}>
                                    {obj?.place_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                            {/* REGION LEVEL 2 */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <Select
                                fullWidth
                                className="custom-select reg-textfield"
                                displayEmpty
                                name="city"
                                value={values.city || ""}
                                onChange={handleChange}
                                input={
                                  <CustomSelectInput
                                    disabled={values.state === ""}
                                  />
                                }
                              >
                                <MenuItem value="">
                                  <em>Region Level 2</em>
                                </MenuItem>
                                {cityOptions?.map((obj, index) => (
                                  <MenuItem key={index} value={obj?.place_code}>
                                    {obj?.place_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box className="reg-right-content">
                            <Box className="res-right-side">
                              <Typography
                                variant="h6"
                                className="res-right-text residence_desc_text"
                              >
                                {localesData?.register?.residence_desc}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                      {/* USER DETAILS */}
                      <Box className="auth-title-bg">
                        <Box>
                          <UserDetails />
                        </Box>
                        <Typography className="auth-title">
                          {localesData?.register?.user_details}
                        </Typography>
                      </Box>
                      <Grid container className="reg-grid-container">
                        <Grid container>
                          {/* EMAIL */}
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            className="text-field-grid reg-field-grid"
                          >
                            <FormHelperText className="custom-field-helper">
                              {localesData?.register?.your_email_address}
                              <span className="valid_star">*</span>
                            </FormHelperText>
                            <CustomTextField
                              fullWidth
                              error={Boolean(touched.email && errors.email)}
                              variant="outlined"
                              className="custom-textfield reg-textfield"
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                              onKeyPress={(e) => {
                                if (/[^a-zA-Z ]/g.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            className="text-field-grid reg-field-grid"
                          >
                            {touched.email && (
                              <Box>
                                {errors.email ? (
                                  <Box className="error-box">
                                    <Typography
                                      variant="h5"
                                      className="error-box-text"
                                    >
                                      {touched.email && errors.email}
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Box className="error-box no-error-box">
                                    <Typography
                                      variant="h5"
                                      className="error-box-text"
                                    >
                                      {localesData?.register?.email_confirm}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Grid>
                          {/* YOUR USERNAME */}
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            className="text-field-grid reg-field-grid"
                          >
                            <FormHelperText className="custom-field-helper">
                              {localesData?.register?.choose_your_username}
                              <span className="valid_star">*</span>
                            </FormHelperText>
                            <CustomTextField
                              fullWidth
                              error={Boolean(
                                touched.yourUsername && errors.yourUsername
                              )}
                              variant="outlined"
                              className="custom-textfield reg-textfield"
                              name="yourUsername"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.yourUsername}
                              onKeyPress={(e) => {
                                if (/[^a-zA-Z]/g.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            <FormHelperText
                              className="field-helper-text"
                              error={Boolean(
                                touched.yourUsername && errors.yourUsername
                              )}
                            >
                              {localesData?.validation?.username_valid}
                            </FormHelperText>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            className="text-field-grid reg-field-grid"
                          >
                            {touched.yourUsername && (
                              <Box>
                                {errors.yourUsername ? (
                                  <Box className="error-box">
                                    <Typography
                                      variant="h5"
                                      className="error-box-text"
                                    >
                                      {touched.yourUsername &&
                                        errors.yourUsername}
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Box className="error-box no-error-box">
                                    <Typography
                                      variant="h5"
                                      className="error-box-text"
                                    >
                                      {localesData?.register?.user_available}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Grid>
                          {/* SET PASSWORD */}
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            className="text-field-grid reg-field-grid"
                          >
                            <FormHelperText className="custom-field-helper">
                              {localesData?.register?.set_password}
                              <span className="valid_star">*</span>
                            </FormHelperText>
                            <CustomTextField
                              fullWidth
                              error={Boolean(
                                touched.password && errors.password
                              )}
                              variant="outlined"
                              className="custom-textfield reg-textfield"
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
                            <FormHelperText
                              className="field-helper-text"
                              error={Boolean(
                                touched.password && errors.password
                              )}
                            >
                              {localesData?.register?.password_helper}
                            </FormHelperText>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            className="text-field-grid reg-field-grid"
                          >
                            {touched.password && errors.password && (
                              <Box className="error-box">
                                <Typography
                                  variant="h5"
                                  className="error-box-text"
                                >
                                  {touched.password && errors.password}
                                </Typography>
                              </Box>
                            )}
                          </Grid>
                          {/* RE ENTER PASSWORD */}
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            className="text-field-grid reg-field-grid"
                          >
                            <FormHelperText className="custom-field-helper">
                              {localesData?.register?.reenter_password}
                              <span className="valid_star">*</span>
                            </FormHelperText>
                            <CustomTextField
                              fullWidth
                              error={Boolean(
                                touched.confirmPassword &&
                                  errors.confirmPassword
                              )}
                              variant="outlined"
                              className="custom-textfield reg-textfield"
                              name="confirmPassword"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={
                                values.confirmPassword?.replace(/\s+/g, "") ||
                                ""
                              }
                              type={showRepeatPassword ? "text" : "password"}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      disableRipple
                                      onClick={() =>
                                        setShowRepeatPassword(
                                          !showRepeatPassword
                                        )
                                      }
                                    >
                                      {showRepeatPassword ? (
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
                            sm={12}
                            md={6}
                            lg={6}
                            className="text-field-grid reg-field-grid"
                          >
                            {touched.confirmPassword && (
                              <Box>
                                {errors.confirmPassword ? (
                                  <Box className="error-box">
                                    <Typography
                                      variant="h5"
                                      className="error-box-text"
                                    >
                                      {touched.confirmPassword &&
                                        errors.confirmPassword}
                                    </Typography>
                                  </Box>
                                ) : (
                                  touched.password &&
                                  !errors.password && (
                                    <Box className="error-box no-error-box">
                                      <Typography
                                        variant="h5"
                                        className="error-box-text"
                                      >
                                        {localesData?.register?.password_match}
                                      </Typography>
                                    </Box>
                                  )
                                )}
                              </Box>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* INTERESTS */}
                      <Box className="auth-title-bg">
                        <Box>
                          <Interests />
                        </Box>
                        <Typography className="auth-title">
                          {localesData?.register?.interests}
                        </Typography>
                      </Box>
                      <Grid container className="reg-grid-container">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Box>
                            <Typography className="bold_font_desc">
                              {localesData?.register?.interests_desc}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography className="bold_font_desc">
                              {localesData?.register?.interests_desc_1}
                            </Typography>
                          </Box>
                          {/* CATEGORY LIST */}
                          <Grid container>
                            {categoryOprions?.map((item, i) => {
                              return (
                                <Grid item xs={6} sm={6} md={6} lg={6} key={i}>
                                  <Box className="user-listing">
                                    <Checkbox
                                      icon={<UncheckIcon />}
                                      checkedIcon={<CheckIcon />}
                                      checked={values.listUser}
                                      name={`listUser-${i}`}
                                      onChange={handleChange}
                                    />
                                    <Typography
                                      variant="h6"
                                      className="user-name"
                                    >
                                      {item?.name}
                                    </Typography>
                                  </Box>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* AGREEMENT */}
                      <Box className="auth-title-bg">
                        <Box>
                          <Agreement />
                        </Box>
                        <Typography className="auth-title">
                          {localesData?.register?.agreement}
                        </Typography>
                      </Box>
                      <Grid container className="reg-grid-container">
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className="text-field-grid reg-field-grid"
                        >
                          {/* TERMS */}
                          <Box className="agreement-section">
                            <Terms />
                          </Box>
                          {/* ACCEPT TERMS AND CONDITION */}
                          <Box className="terms-checkbox">
                            <Checkbox
                              icon={<UncheckIcon />}
                              checkedIcon={<CheckIcon />}
                              checked={values.policy}
                              name="policy"
                              onChange={handleChange}
                            />
                            <Typography variant="h5" className="terms">
                              {localesData?.register?.terms_conditions}
                            </Typography>
                          </Box>
                          {Boolean(touched.policy && errors.policy) && (
                            <FormHelperText error>
                              {errors.policy}
                            </FormHelperText>
                          )}
                          <Box className="note-section">
                            <Typography variant="h5" className="note-text">
                              {localesData?.register?.note}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      {/* MOBILE/CELL PHONE VERIFICATION */}
                      <Box className="auth-title-bg">
                        <Box>
                          <MobilePhone />
                        </Box>
                        <Typography className="auth-title">
                          {
                            localesData?.register
                              ?.mobile_cell_phone_verification
                          }
                        </Typography>
                      </Box>
                      <Grid container>
                        {/*MOBILE CELL DESC */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className="text-field-grid reg-field-grid"
                        >
                          <Box>
                            <Typography className="regular_font_desc">
                              {localesData?.register?.mobile_cell_desc}
                            </Typography>
                          </Box>
                        </Grid>
                        {/*LIST START TEXT */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className="text-field-grid reg-field-grid"
                        >
                          <Box>
                            <Typography className="bold_font_desc">
                              {localesData?.register?.list_start_desc}
                            </Typography>
                          </Box>
                          {/*LIST*/}
                          <Box>
                            <ul className="regular_font_desc list">
                              <li>{localesData?.register?.list_item1}</li>
                              <li>{localesData?.register?.list_item2}</li>
                              <li>{localesData?.register?.list_item3}</li>
                              <li>{localesData?.register?.list_item4}</li>
                              <li>{localesData?.register?.list_item5}</li>
                            </ul>
                          </Box>
                          {/*LIST END TEXT */}
                          <Box>
                            <Typography className="regular_font_desc">
                              {localesData?.register?.list_end_desc}
                            </Typography>
                          </Box>
                        </Grid>

                        {/* COUNTRY */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className="text-field-grid reg-field-grid"
                        >
                          <Select
                            fullWidth
                            error={Boolean(
                              touched.mobileCountry && errors.mobileCountry
                            )}
                            className="custom-select reg-textfield"
                            displayEmpty
                            name="mobileCountry"
                            value={values.mobileCountry}
                            onChange={(e) => {
                              handleChange(e);
                              setCountryPhoneCode(e.target.value);
                            }}
                            input={<CustomSelectInput />}
                          >
                            {countryOption?.map((obj, index) => (
                              <MenuItem key={index} value={obj?.phone_code}>
                                {obj?.place_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        {/*SEND CODE BTN*/}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className="text-field-grid reg-field-grid"
                        >
                          <Box className="mobile-field">
                            <Button
                              variant="contained"
                              className="b-btn-blue send_code_btn"
                              onClick={() => handleSendCode()}
                            >
                              {localesData?.register?.send_code}
                            </Button>
                            <Box>
                              <Box>
                                <FormHelperText className="custom-field-helper">
                                  {localesData?.mobile_no}
                                  <span className="valid_star">*</span>
                                </FormHelperText>
                                <CustomTextField
                                  fullWidth
                                  error={Boolean(
                                    touched.mobile_no && errors.mobile_no
                                  )}
                                  helperText={
                                    touched.mobile_no && errors.mobile_no
                                  }
                                  variant="outlined"
                                  className="custom-textfield reg-textfield"
                                  name="mobile_no"
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    handleChange(e);
                                    setPhoneNumber(e.target.value);
                                  }}
                                  value={values.mobile_no}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment
                                        position="start"
                                        className="mobile-adornment"
                                      >
                                        {countryPhoneCode === "" ? (
                                          <AddIcon />
                                        ) : (
                                          <Typography variant="h2">
                                            {countryPhoneCode}
                                          </Typography>
                                        )}
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Box>
                              <Box className="otp-textfield">
                                <CustomTextField
                                  fullWidth
                                  error={Boolean(
                                    touched.otpCode && errors.otpCode
                                  )}
                                  helperText={touched.otpCode && errors.otpCode}
                                  variant="outlined"
                                  className="custom-textfield reg-textfield"
                                  placeholder="Enter Code Here"
                                  name="otpCode"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.otpCode}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Grid>

                        {/*CREATE MY ACCOUNT BTN */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className="reg-field-grid create_my_acc_grid"
                        >
                          <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            className="signup-button btn-blue create_my_acc_btn"
                            disabled={isDisabled}
                          >
                            {localesData?.register?.create_my_account}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IndividualRegisterPage;
