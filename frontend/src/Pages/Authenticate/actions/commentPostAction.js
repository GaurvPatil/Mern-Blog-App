import { COMMENT } from "../../../redux/autheticateReducer/actionTypes";
import * as api from "../api/index";


export const commentPostAction = (value, id , categoryName) => async (dispatch) => {
    try {
      const { data } = await api.commentPost(value, id , categoryName);
  
      dispatch({ type: COMMENT, payload: data });
      return data.body.comments;
    } catch (error) {
      console.log(error);
    }
  };