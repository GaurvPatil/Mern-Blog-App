import { themeChangeType } from "../actionTypes/actionTypes";


// initial state is only for first time to not set color pallete type null in header.js 
//we are using local storage only for to check initial states and relode 
const initialState = {
  mode: () => {
    const mode = localStorage.getItem("mode");
    if (mode) {
 return mode
    } else {
      localStorage.setItem("mode", "light");
    }
    return mode;
  },
};

export const themeChangeReducer = (state = initialState.mode(), { type }) => {
  switch (type) {
    case themeChangeType.LIGHT_THEME:
      return (state = "light");
    case themeChangeType.DARK_THEME:
      return (state = "dark");
    default:
      return state;
  }
};
