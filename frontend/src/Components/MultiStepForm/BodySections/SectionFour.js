import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { article, addBtn } from "../CommonStyle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  article,
  addBtn,

  section: {
    width: "80%",
    paddingBottom: "2rem",
    borderBottom: "2px solid gray",
  },

  [theme.breakpoints.down("md")]: {
    section: {
      width: "100%",
    },
  },
}));

const SectionFour = ({ dispatchBody }) => {
  const classes = useStyles();
  const [lastImage, setLastImage] = useState();

  const uploadImage = () => {
    if (lastImage) {
      const formData = new FormData();

      formData.append("file", lastImage);
      formData.append("upload_preset", "on a mission");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dg3djk3zp/image/upload",
          formData
        )
        .then((res) => {
          const imgUrl = res.data.url;

          dispatchBody({ type: "SECTION_FOUR", payload: imgUrl });

          // notify and after success

          const notify = () =>
            toast.success("Image Added SuccessFully!", {
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
      <section className={classes.section}>
        <article className={classes.article}>
          <div className={classes.div}>
            <label className={classes.label}> Cover-Image : </label> &nbsp;
            <input
              type="file"
              name="image"
              onChange={(e) => {
                setLastImage(e.target.files[0]);
              }}
            />
          </div>
        </article>

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
      </section>
    </>
  );
};

export default SectionFour;
