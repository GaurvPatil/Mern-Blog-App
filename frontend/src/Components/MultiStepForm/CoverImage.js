import { Button, Container, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { div, label, textField, btn } from "./CommonStyle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  div,
  label,
  textField,
  btn,
}));

const CoverImage = () => {
  const [coverImage, setCoverImage] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();

  const uploadImage = () => {
 
    if (coverImage) {
      const formData = new FormData();

      formData.append("file", coverImage);
      formData.append("upload_preset", "on a mission");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dg3djk3zp/image/upload",
          formData
        )
        .then((res) => {
          const imgUrl = res.data.url;
          dispatch({ type: "COVERIMAGE_DATA", payload: imgUrl }); 

          // notify and after success

          const notify = () =>
            toast.success("CoverImage Added SuccessFully!", {
              autoClose: 2000,
            });

          notify();
        })
        .catch((err) => {
          console.log(err);

          const notify = () =>
            toast.error("Cloudinary error", {
              autoClose: 2000,
            });

          notify();
        });
    } else {
      alert("please upload image");
    }
  };

  return (
    <Container>
      <div className={classes.div}>
        <label className={classes.label}> Cover-Image : </label> &nbsp;
        <input
          type="file"
          name="image"
          onChange={(e) => {
            setCoverImage(e.target.files[0]);
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          className={classes.btn}
          onClick={uploadImage}
          style={{
            background: "green",
          }}
        >
          Add Image
        </Button>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default CoverImage;
