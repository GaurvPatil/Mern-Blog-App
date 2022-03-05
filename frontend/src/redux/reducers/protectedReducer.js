import { protetced } from "../actionTypes/actionTypes";

export const protectedReducer = (state = "logout", { type }) => {
  switch (type) {
    case protetced.ADMIN_LOGIN:
      return (state = "login");
    case protetced.ADMIN_LOGOUT:
      return (state = "logout");

    default:
      return state;
  }
};
