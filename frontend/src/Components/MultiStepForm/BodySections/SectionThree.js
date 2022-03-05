import React, { useState, useRef } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { article, addBtn } from "../CommonStyle";
import ParaArr from "../CommonComponents.js/ParaArr";
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
  textArea: {
    width: "100%",
    marginBottom: "2rem",
  },

  [theme.breakpoints.down("md")]: {
    sectionBtn: {
      width: "100%",
    },
    section: {
      width: "100%",
    },
  },
}));

const SectionThree = ({ dispatchBody }) => {
  const [sectionData, setSectionData] = useState({
    images: [],
    paragraphs: [],
  });

  const [img, setimg] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [displayArea, setDiplayArea] = useState(false);
  const classes = useStyles();
  let finalDataSecThree = useRef("");

  const uploadImages = () => {
    if (img) {
      const formData = new FormData();

      formData.append("file", img);
      formData.append("upload_preset", "on a mission");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dg3djk3zp/image/upload",
          formData
        )
        .then((res) => {
          const imgUrl = res.data.url;
          setFileUrls([...fileUrls, imgUrl]);

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

  // final Add Section data
  const addSectionData = () => {
    if (sectionData.paragraphs.length) {
      finalDataSecThree.current = {
        images: fileUrls,
        paragraphs: sectionData.paragraphs,
      };

      dispatchBody({
        type: "SECTION_THREE",
        payload: finalDataSecThree.current,
      });

      const notify = () =>
        toast.success("section Added SuccessFully!", {
          autoClose: 2000,
        });

      notify();
  
    } else {
      alert("Please fill para ");
    }
  };



  return (
    <>
      <section className={classes.section}>
        <article className={classes.article}>
          <Typography
            variant="h5"
            style={{
              fontSize: "bold",
              fontFamily: "montserrat",
              margin: "1rem 0",
            }}
          >
            Optional Images(max-3) and Para!
          </Typography>

          <article
            style={{
              display: displayArea ? "none" : "unset",
            }}
          >
            <div
              style={{
                margin: "2rem 0",
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <label> upload image : </label> &nbsp;
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  setimg(e.target.files[0]);
                }}
              />
              <Button
                variant="contained"
                component="label"
                onClick={uploadImages}
              >
                Upload
              </Button>
              <Button
                style={{ background: "red" }}
                onClick={() => {
                  if (fileUrls.length === 0 || fileUrls.length > 3) {
                    alert("please upload more than 0 and less than 3 images");
                  } else {
                    const result = window.confirm("Are You Sure");
                    if (result) {
                      setDiplayArea(true);
                    }
                  }
                }}
              >
                Done
              </Button>
            </div>
          </article>
        </article>

        <article
          style={{
            display: displayArea ? "unset" : "none",
          }}
        >
          <ParaArr sectionData={sectionData} setSectionData={setSectionData} />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                addSectionData();
              }}
              className={classes.addBtn}
            >
              Click To Add Data
            </Button>

           
          </div>
        </article>
        <ToastContainer />
      </section>
    </>
  );
};

export default SectionThree;
