import { idCheckAdmin } from "../actionTypes/actionTypes";

const storeId = (id) => {
  localStorage.setItem("AdminID", id);
};

export const adminIDCheckReducer = (state = "", { type }) => {
  switch (type) {
    case idCheckAdmin.SPRITUAL:
      storeId("spritual");
      return (state = "spritual");

    case idCheckAdmin.CRYPTO:
      storeId("crypto");
      return (state = "crypto");
    case idCheckAdmin.LIFESTYLE_FASHION:
      storeId("lifestyle&fashion");
      return (state = "lifestyle&fashion");
    case idCheckAdmin.NEWS:
      storeId("news");
      return (state = "news");
    default:
      return (state = localStorage.getItem("AdminID"));
  }
};
