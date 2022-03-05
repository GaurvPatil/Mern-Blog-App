import { pData } from "../actionTypes/actionTypes";

const initialstate = {
  category: "",
  header: "",
  title: "",
  coverImage: "",
  body: {
    conclusion: [],
    comments: [],
    likes: [],
  },
};

export const postDataReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case pData.CATEGORY_DATA:
      return (state = { ...state, category: payload });

    case pData.HEADER_DATA:
      return (state = { ...state, header: payload });

    case pData.TITLE_DATA:
      return (state = { ...state, title: payload });

    case pData.COVERIMAGE_DATA:
      return (state = { ...state, coverImage: payload });

    case pData.BODY_DATA:
      const addBody = { ...state.body, ...payload };
      return (state = { ...state, body: addBody });

    case pData.CONCLUSION_DATA:
      const addConclusion = { ...state.body, conclusion: payload };
      return (state = { ...state, body: addConclusion });

    default:
      return state;
  }
};
