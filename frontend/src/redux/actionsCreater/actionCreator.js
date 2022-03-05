import {
  viewMarketActionTypes,
  themeChangeType,
  flexDirectionChange,
  displayImage,
  idCheckAdmin,
  pData,
  protetced,
} from "../actionTypes/actionTypes";

// Currency Actions
export const rupeeCurrency = () => {
  return {
    type: viewMarketActionTypes.INR,
  };
};

export const dollarCurrency = () => {
  return {
    type: viewMarketActionTypes.DOLLAR,
  };
};

// theme change Actions

export const lightTheme = () => {
  return {
    type: themeChangeType.LIGHT_THEME,
  };
};

export const darkTheme = () => {
  return {
    type: themeChangeType.DARK_THEME,
  };
};

// flex direction and display image
//flex
export const flexRow = () => {
  return {
    type: flexDirectionChange.FLEX_ROW,
  };
};

export const FlexColumn = () => {
  return {
    type: flexDirectionChange.FLEX_COLUMN,
  };
};

// display image

export const displayContents = () => {
  return {
    type: displayImage.DISPLAY_CONTENTS,
  };
};

export const displayProperty = () => {
  return {
    type: displayImage.DISPLAY_NONE,
  };
};

// id check for admin page
export const spritualID = () => {
  return {
    type: idCheckAdmin.SPRITUAL,
  };
};

export const cryptoID = () => {
  return {
    type: idCheckAdmin.CRYPTO,
  };
};
export const lifestyleFashionID = () => {
  return {
    type: idCheckAdmin.LIFESTYLE_FASHION,
  };
};
export const newsID = () => {
  return {
    type: idCheckAdmin.NEWS,
  };
};

// add post data

export const postCategory = (payload) => {
  return {
    type: pData.CATEGORY_DATA,
    payload,
  };
};

export const postTitle = (payload) => {
  return {
    type: pData.TITLE_DATA,
    payload,
  };
};

export const postHeader = (payload) => {
  return {
    type: pData.HEADER_DATA,
    payload,
  };
};

export const postCoverimage = (payload) => {
  return {
    type: pData.COVERIMAGE_DATA,
    payload,
  };
};

export const postBody = (payload) => {
  return {
    type: pData.BODY_DATA,
    payload,
  };
};

export const postConclusion = (payload) => {
  return {
    type: pData.CONCLUSION_DATA,
    payload,
  };
};


// protected routes 
export const adminProtectedLogin = ()=>{
  return {
    type : protetced.ADMIN_LOGIN
  }
} 

export const adminProtectedLogout = ()=>{
  return{
    type: protetced.ADMIN_LOGOUT
  }
}