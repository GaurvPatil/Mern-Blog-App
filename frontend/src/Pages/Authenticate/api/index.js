import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const likePost = (id, categoryName) =>
  API.patch(`/api/category/posts/${categoryName}/${id}/likepost`);

export const commentPost = (value, id , categoryName) =>
  API.patch(`/api/category/posts/${categoryName}/${id}/commentpost`, { value });

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
