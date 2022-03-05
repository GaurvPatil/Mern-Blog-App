import { viewMarketActionTypes } from "../actionTypes/actionTypes";

// Currrency reducer
const initialState = {
  currency: "INR",
  symbol: "₹",
};

export const viewMarketReducer = (state = initialState, { type }) => {
  switch (type) {
    case viewMarketActionTypes.INR:
      return { ...state, currency: "INR", symbol: "₹" };

    case viewMarketActionTypes.DOLLAR:
      return { ...state, currency: "USD", symbol: "$" };

    default:
      return state;
  }
};



