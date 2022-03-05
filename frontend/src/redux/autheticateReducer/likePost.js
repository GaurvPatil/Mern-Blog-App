import { LIKE } from "../autheticateReducer/actionTypes";

const likePostReducer = (state = "", action) => {
  switch (action.type) {
    case LIKE:
     
      return state = action.payload

    default:
      return state;
  }
};
export default likePostReducer;
