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
  Checkbox,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Divider,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { IntlContext } from "src/App";
import { CustomTextField } from "src/views/component/UI/textfield";
import axiosInstance from "src/helpers/axios/axiosInstance";
import { URLS } from "src/helpers/constants/urls";
import { setApiMessage } from "src/helpers/commonFunctions";
import { ReactComponent as CheckIcon } from "src/assets/images/icons/checked-checkbox.svg";
import { ReactComponent as UncheckIcon } from "src/assets/images/icons/unchecked-checkbox.svg";
// import { ReactComponent as DrodownIcon } from "src/assets/images/icons/drodown.svg";
// import { ReactComponent as CheckedRadio } from "src/assets/images/icons/radio-checked.svg";
// import { ReactComponent as UnCheckedRadio } from "src/assets/images/icons/radio-uncheck.svg";
import { ReactComponent as PersonalDetails } from "src/assets/images/icons/personal-details.svg";
import { ReactComponent as Location } from "src/assets/images/icons/home.svg";
import { ReactComponent as UserDetails } from "src/assets/images/icons/user-details.svg";
import { ReactComponent as Agreement } from "src/assets/images/icons/agreement.svg";
import "../auth.scss";
import PreLoader from "src/components/Loader";
import { CustomSelectInput } from "src/views/component/UI/select";
import banner1 from "../../../../assets/images/banner/banner-bg1.png";
import Terms from "../Terms";

const userListing = [
  { id: 1, name: "Jarrod Veitch", image: banner1 },
  { id: 2, name: "Ben Van Biljon", image: banner1 },
  { id: 3, name: "SezzYou", image: banner1 },
];
const GroupRegisterPage = () => {
  const navigate = useNavigate();
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [groupTypes, setGroupTypes] = useState([]);
  const [countryOption, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  const getGroupTypes = async () => {
    try {
      setLoader(true);
      const { status, data } = await axiosInstance.get(URLS.getGroupType);
      if (status === 200) {
        setGroupTypes(data?.data?.GroupTypes);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const getCountry = async () => {
    try {
      setLoader(true);
      const { status, data } = await axiosInstance.get(URLS.getCountry);
      if (status === 200) {
        console.log("data?.data", data?.data);
        setCountryOptions(data?.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const getState = async () => {
    try {
      setLoader(true);
      const { status, data } = await axiosInstance.get(
        URLS.getState + `/${countryCode}`
      );
      if (status === 200) {
        console.log("data?.data", data?.data);
        setStateOptions(data?.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const getCity = async () => {
    try {
      setLoader(true);
      const { status, data } = await axiosInstance.get(
        URLS.getCity + `/${stateCode}`
      );
      if (status === 200) {
        console.log("data?.data", data?.data);
        setCityOptions(data?.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    getGroupTypes();
    getCountry();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (countryCode !== "") getState();
    // eslint-disable-next-line
  }, [countryCode]);
  useEffect(() => {
    if (stateCode !== "") getCity();
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
                {localesData?.register?.new_group}
              </Typography>
              <Divider className="divider first-divider" />
              <Divider className="divider second-divider" />
            </Box>

            <Box className="form-content">
              <Formik
                initialValues={{
                  groupName: "",
                  groupType: "",
                  userName: "",
                  website: "",
                  addressLine1: "",
                  addressLine2: "",
                  town: "",
                  country: "",
                  Options: "",
                  city: "",
                  postCode: "",
                  email: "",
                  yourUserName: "",
                  password: "",
                  confirmPassword: "",
                  listUser: false,
                  policy: false,
                }}
                validationSchema={Yup.object().shape({
                  groupName: Yup.string()
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
                  yourUserName: Yup.string()
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
                })}
                onSubmit={async (requestData) => {
                  setLoader(true);
                  let sendData = {
                    groupName: requestData.groupName,
                    groupType: requestData.groupType,
                    userName: requestData.userName,
                    website: requestData.website,
                    addressLine1: requestData.addressLine1,
                    addressLine2: requestData.addressLine2,
                    town: requestData.town,
                    country: requestData.country,
                    state: requestData.state,
                    city: requestData.city,
                    postCode: requestData.postCode,
                    email: requestData.email,
                    yourUserName: requestData.yourUserName,
                    password: requestData.password,
                    listUser: requestData.listUser,
                  };

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
                          {localesData?.register?.group_details}
                        </Typography>
                      </Box>
                      <Grid container className="reg-grid-container">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Grid container>
                            {/* GROUP NAME */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.group_name}
                                <span className="valid_star">*</span>
                              </FormHelperText>
                              <CustomTextField
                                error={Boolean(
                                  touched.groupName && errors.groupName
                                )}
                                fullWidth
                                helperText={
                                  touched.groupName && errors.groupName
                                }
                                variant="outlined"
                                className="custom-textfield reg-textfield"
                                name="groupName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.groupName}
                                onKeyPress={(e) => {
                                  if (/[^a-zA-Z ]/g.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </Grid>
                            {/* GROUP TYPE */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.group_type}
                              </FormHelperText>
                              <Select
                                fullWidth
                                className="custom-select reg-textfield"
                                displayEmpty
                                name="groupType"
                                value={values.groupType || ""}
                                onChange={handleChange}
                                input={<CustomSelectInput />}
                                // IconComponent={DrodownIcon}
                              >
                                <MenuItem value="">
                                  <em>- Select -</em>
                                </MenuItem>
                                {groupTypes?.map((obj, index) => (
                                  <MenuItem key={index} value={obj?._id}>
                                    {obj?.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                            {/* USERNAME */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.sezzyou_username}
                                <span className="valid_star">*</span>
                              </FormHelperText>
                              <CustomTextField
                                error={Boolean(
                                  touched.userName && errors.userName
                                )}
                                fullWidth
                                helperText={touched.userName && errors.userName}
                                variant="outlined"
                                className="custom-textfield reg-textfield"
                                name="userName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.userName}
                                onKeyPress={(e) => {
                                  if (/[^a-zA-Z ]/g.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <FormHelperText className="field-helper-text">
                                {localesData?.register?.username_helper}
                              </FormHelperText>
                            </Grid>
                            {/* WEBSITE */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.website}
                              </FormHelperText>
                              <CustomTextField
                                error={Boolean(
                                  touched.website && errors.website
                                )}
                                fullWidth
                                helperText={touched.website && errors.website}
                                variant="outlined"
                                className="custom-textfield reg-textfield"
                                name="website"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.website}
                                onKeyPress={(e) => {
                                  if (/[^a-zA-Z ]/g.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                      </Grid>

                      {/* LOCATION */}
                      <Box className="auth-title-bg">
                        <Box>
                          <Location />
                        </Box>
                        <Typography className="auth-title">
                          {localesData?.register?.location}
                        </Typography>
                      </Box>
                      <Grid container className="reg-grid-container">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Grid container>
                            {/* ADDRESSLINE 1 */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.address1}
                              </FormHelperText>
                              <CustomTextField
                                error={Boolean(
                                  touched.addressLine1 && errors.addressLine1
                                )}
                                fullWidth
                                helperText={
                                  touched.addressLine1 && errors.addressLine1
                                }
                                variant="outlined"
                                className="custom-textfield reg-textfield"
                                name="addressLine1"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.addressLine1}
                                onKeyPress={(e) => {
                                  if (/[^a-zA-Z ]/g.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </Grid>
                            {/* ADDRESSLINE 2 */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.address2}
                              </FormHelperText>
                              <CustomTextField
                                error={Boolean(
                                  touched.addressLine2 && errors.addressLine2
                                )}
                                fullWidth
                                helperText={
                                  touched.addressLine2 && errors.addressLine2
                                }
                                variant="outlined"
                                className="custom-textfield reg-textfield"
                                name="addressLine2"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.addressLine2}
                                onKeyPress={(e) => {
                                  if (/[^a-zA-Z ]/g.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </Grid>
                            {/* TOWN */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.town}
                                <span className="valid_star">*</span>
                              </FormHelperText>
                              <CustomTextField
                                error={Boolean(touched.town && errors.town)}
                                fullWidth
                                helperText={touched.town && errors.town}
                                variant="outlined"
                                className="custom-textfield reg-textfield"
                                name="town"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.town}
                                onKeyPress={(e) => {
                                  if (/[^a-zA-Z ]/g.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </Grid>
                            {/* COUNTRY */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid"
                            >
                              <Select
                                fullWidth
                                className="custom-select reg-textfield"
                                displayEmpty
                                name="country"
                                value={values.country}
                                onChange={handleChange}
                                input={<CustomSelectInput />}
                                // IconComponent={DrodownIcon}
                                error={Boolean(
                                  touched.country && errors.country
                                )}
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
                              className="text-field-grid"
                            >
                              <Select
                                fullWidth
                                className="custom-select reg-textfield"
                                displayEmpty
                                name="state"
                                value={values.state}
                                onChange={handleChange}
                                input={
                                  <CustomSelectInput
                                    disabled={values.country === ""}
                                  />
                                }
                                // IconComponent={DrodownIcon}
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
                                // IconComponent={DrodownIcon}
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
                            {/* POST CODE */}
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="text-field-grid reg-field-grid"
                            >
                              <FormHelperText className="custom-field-helper">
                                {localesData?.register?.post_code}
                              </FormHelperText>
                              <CustomTextField
                                error={Boolean(
                                  touched.postCode && errors.postCode
                                )}
                                fullWidth
                                helperText={touched.postCode && errors.postCode}
                                variant="outlined"
                                className="custom-textfield reg-textfield"
                                name="postCode"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.postCode}
                                onKeyPress={(e) => {
                                  if (/[^a-zA-Z ]/g.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box className="reg-right-content">
                            <Box className="res-right-side">
                              <Typography
                                variant="h6"
                                className="res-right-text"
                              >
                                {localesData?.register?.location_desc}
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
                              error={Boolean(touched.email && errors.email)}
                              fullWidth
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
                              error={Boolean(
                                touched.yourUserName && errors.yourUserName
                              )}
                              fullWidth
                              variant="outlined"
                              className="custom-textfield reg-textfield"
                              name="yourUserName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.yourUserName}
                              onKeyPress={(e) => {
                                if (/[^a-zA-Z]/g.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            <FormHelperText
                              className="field-helper-text"
                              error={Boolean(
                                touched.yourUserName && errors.yourUserName
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
                            {touched.yourUserName && (
                              <Box>
                                {errors.yourUserName ? (
                                  <Box className="error-box">
                                    <Typography
                                      variant="h5"
                                      className="error-box-text"
                                    >
                                      {touched.yourUserName &&
                                        errors.yourUserName}
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
                              error={Boolean(
                                touched.password && errors.password
                              )}
                              fullWidth
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
                              error={Boolean(
                                touched.confirmPassword &&
                                  errors.confirmPassword
                              )}
                              fullWidth
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

                      {/* INITIAL USER LISTENING */}
                      <Box className="auth-title-bg">
                        <Box>
                          <PersonalDetails />
                        </Box>
                        <Typography className="auth-title">
                          {localesData?.register?.initial_user}
                        </Typography>
                      </Box>
                      <Grid container className="reg-grid-container">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Box>
                            <Typography variant="h5" className="listening-desc">
                              {localesData?.register?.listening_desc}
                            </Typography>
                          </Box>
                          <Grid container>
                            {userListing?.map((item, i) => {
                              return (
                                <Grid item xs={6} sm={6} md={6} lg={6} key={i}>
                                  <Box className="user-listing">
                                    <Box>
                                      <img
                                        src={item?.image}
                                        alt=""
                                        className="user-img"
                                      />
                                    </Box>
                                    <Checkbox
                                      icon={<UncheckIcon />}
                                      checkedIcon={<CheckIcon />}
                                      checked={values.listUser}
                                      name={`listUser-${i}`}
                                      onChange={handleChange}
                                    />
                                    <Typography className="user-name">
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
                          <Box className="agreement-section">
                            <Terms />
                          </Box>
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

                      {/* CREATE ACCOUNT BUTTON */}
                      <Box className="auth-title-bg">
                        <Typography className="auth-title">
                          {localesData?.register?.create_your_account}
                        </Typography>
                      </Box>

                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className="create-btn-section"
                        >
                          <Button
                            variant="contained"
                            // fullWidth
                            type="submit"
                            className="btn-blue"
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

export default GroupRegisterPage;
