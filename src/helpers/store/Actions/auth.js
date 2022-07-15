import { AUTH_USER } from "../constants";

export const loginUser = (data) => {
  return {
    type: AUTH_USER,
    data: data,
  };
};
