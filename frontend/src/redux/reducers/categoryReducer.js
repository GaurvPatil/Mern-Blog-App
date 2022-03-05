import { flexDirectionChange, displayImage } from "../actionTypes/actionTypes";

export const flexReducer = (state = "row", { type }) => {
  switch (type) {
    case flexDirectionChange.FLEX_ROW:
      return (state = "row");
    case flexDirectionChange.FLEX_COLUMN:
      return (state = "column");
    default:
      return state;
  }
};

export const ImageToggleReducer = (state = "unset", { type }) => {
  switch (type) {
    case displayImage.DISPLAY_CONTENTS:
      return (state = "unset");
    case displayImage.DISPLAY_NONE:
      return (state = "none");
    default:
      return state;
  }
};
