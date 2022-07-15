import { AUTH_USER } from "../constants";

export default function reduxData(state = [], action) {
  switch (action.type) {
    case AUTH_USER:
      return { authData: action.data };

    default:
      return { state: [] };
  }
}
