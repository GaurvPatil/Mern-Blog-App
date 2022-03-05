import { COMMENT } from "../autheticateReducer/actionTypes";

const commentPostReducer = (state = "", action) => {
  switch (action.type) {
    case COMMENT:
      
      return state = action.payload

    default:
      return state;
  }
};
export default commentPostReducer;