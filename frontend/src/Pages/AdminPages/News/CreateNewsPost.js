import { Button, Container } from "@material-ui/core";
import React, { useReducer } from "react";
import NewsCategory from "../../../Components/CreateNewsPostCompo/NewsCategory";
import NewsCoverimg from "../../../Components/CreateNewsPostCompo/NewsCoverimg";
import NewsTitleCoverimg from "../../../Components/CreateNewsPostCompo/NewsTitleCoverimg";
import NewsIntroPara from "../../../Components/CreateNewsPostCompo/NewsIntroPara";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function newsReducer(state, { type, payload }) {
  switch (type) {
    case "CATEGORY":
      const cat = { ...state, category: payload };
      return (state = cat);

    case "TITLE":
      const title = { ...state, title: payload };
      return (state = title);

    case "COVER_IMAGE":
      const img = { ...state, coverImage: payload };
      return (state = img);

    case "INTRO_PARA":
      const body = { ...state, body: { ...state.body, ...payload } };
      return (state = body);

    default:
      return state;
  }
}

const CreateNewsPost = () => {
  const [newsState, newsDispatch] = useReducer(
    newsReducer,

    {
      category: "",
      title: "",
      coverImage: "",
      body: {},
     
    }
  );

  const checkData = () => {
    console.log(newsState);
    const { category, title, coverImage, body } = newsState;
    if (category && title && coverImage && body.intro && body.paragraphs) {
      const result = window.confirm("Are You Sure");
      if (result) {
        const url = `http://localhost:8080/api/category/posts/${category} `;

        axios
          .post(url, newsState)
          .then(() => {
            const notify = () =>
              toast.success("Post Successfully Upload!", {
                autoClose: 2000,
              });

            notify();
          })
          .catch((err) => {
            console.log(err);
            const notify = () =>
              toast.error("Server Error!", {
                autoClose: 2000,
              });
            notify();
          });
      }
    } else {
      alert("all fields is required");
    }
  };

  return (
    <Container>
      <NewsCategory newsDispatch={newsDispatch} />
      <NewsTitleCoverimg newsDispatch={newsDispatch} />
      <NewsCoverimg newsDispatch={newsDispatch} />
      <NewsIntroPara newsDispatch={newsDispatch} />

      <div style={{ textAlign: "center" }}>
        <Button
          style={{
            background: "green",
            marginTop: "1rem",
            marginBottom: "4rem",
            fontWeight: "bold",
          }}
          onClick={checkData}
        >
          Post
        </Button>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default CreateNewsPost;
