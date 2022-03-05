import { LIKE } from "../../../redux/autheticateReducer/actionTypes";
import * as api from "../api/index";

export const likePostAction = (id , categoryName) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  try {
    const { data } = await api.likePost(id,categoryName, user?.token );
   
    dispatch({ type: LIKE, payload: data });
   return data
  } catch (error) {
    console.log(error);
  }
};


