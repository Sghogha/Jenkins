import { Config } from "../context/config";
export const URLS = {
  getGroupType: "/v1/public/auth/type",
  getCountry: "/v1/public/country/getCountry",
  getState: "/v1/public/country/getRegion1",
  getCity: "/v1/public/country/getRegion2",
  getNationalitys: "/v1/public/country/nation",
  getCategory: "/v1/public/auth/category",
  sendCode: "/v1/public/auth/send-code",
  // AUTH MODULE
  signIn: "/v1/public/user/login",
  signUp: "/v1/public/user/register",
  verifyOTP: "/v1/public/user/verifyOtp",
  resendOTP: "/v1/public/user/resendOtp",
  resetPassword: "/v1/public/user/resetPassword",
  forgotPassword: "/v1/public/user/forgotPassword",
  socialLogin: "/v1/public/user/sociallogin",

  logout: "/v1/private/user/logout",

  mediaURL: Config.mediaURL,
};
