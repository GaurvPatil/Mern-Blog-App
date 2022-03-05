import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { div, label, textField, btn } from "../MultiStepForm/CommonStyle";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  div,
  label,
  textField,
  btn,
}));

const NewsCoverimg = ({ newsDispatch }) => {
  const [coverImage, setCoverImage] = useState();
  const classes = useStyles();

 



  const addImage = () => {
 
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
         
          newsDispatch({ type: "COVER_IMAGE", payload: imgUrl });

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
    <>
    
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
          onClick={addImage}
          style={{
            background: "green",
          }}
        >
          Add Image
        </Button>
      </div>
      <ToastContainer />
    
    </>
  );
};

export default NewsCoverimg;
