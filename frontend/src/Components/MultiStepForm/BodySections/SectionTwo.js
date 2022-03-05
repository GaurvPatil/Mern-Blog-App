import React, {  useState } from "react";
import {
  Button,
  makeStyles,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { article, addBtn } from "../CommonStyle";
import ParaArr from "../CommonComponents.js/ParaArr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomizedDialogs from "../SectionModals/Modal";
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

  sectionBtn: {
    width: "50%",
    fontWeight: "bold",
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

const SectionTwo = ({ dispatchBody }) => {
  // below data is pushed in subheadings
  const [sectionData, setSectionData] = useState({
    head: "",
    paragraphs: [],
    // Image: [], we do that later
  });

  // data we want from this section is stored in below useState
  const [subheadings, setSubheadings] = useState([]);
  const [heading, setHeading] = useState("");
  const [img, setimg] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const classes = useStyles();



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
          setFileUrls([ imgUrl]);

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


  const addItem = () => {
    if (heading.length > 0 && sectionData.paragraphs.length > 0) {
  
      // setting imp data
      setSubheadings([
        ...subheadings,
        {
          heading,
          subheadParas: [...sectionData.paragraphs],
          image: [...fileUrls],
        },
      ]);

     
      dispatchBody({ type: "SECTION_TWO", payload: [
        ...subheadings,
        {
          heading,
          subheadParas: [...sectionData.paragraphs],
          image: [...fileUrls],
        },
      ] });
    
      // notify and after success

      const notify = () =>
        toast.success("Subhead Added Successfully!", {
          autoClose: 2000,
        });

      notify();

      // clear inputs
      setHeading("");
      setFileUrls([])
      setimg([])
      setSectionData({
        ...sectionData,
        paragraphs: [],
      });
    } else {
      alert("Please Fill Data");
    }
  };

  // Modal Setup
  const modalTitle = "Section - 2";

  return (
    <>
      <section className={classes.section}>
        <Typography
          variant="h5"
          style={{
            fontSize: "bold",
            fontFamily: "montserrat",
            margin: "1rem 0",
          }}
        >
          Sub- Heading <br />
          <p> You Can Add Multiple Subheads</p>
          <p style={{ color: "red" }}>
            You Cannot Change Data After Click On Add Sub-head Button
          </p>
        </Typography>


        <article
        
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

        </article>
        {/* Heading  */}
        <article className={classes.article}>
          <Typography variant="h5"> Heading: </Typography>
          <TextareaAutosize
            placeholder="head"
            className={classes.textArea}
            minRows="3"
            value={heading}
            onChange={(e) => {
              setHeading(e.target.value);
            }}
          />
        </article>
        {/* Para  */}
        <ParaArr sectionData={sectionData} setSectionData={setSectionData} />
        {/* for adding Single sub head  */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Button onClick={addItem} className={classes.addBtn}>
            Add Sub-head
          </Button>
          {subheadings.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <CustomizedDialogs
                subheadings={subheadings}
                modalTitle={modalTitle}
                setSubheadings={setSubheadings}
                dispatchBody = { dispatchBody}
              />

              <Button
                style={{ background: "red", fontWeight: "bold" }}
                onClick={() => {
                  const result = window.confirm("Want to delete all subheads?");
                  if (result) {
                    setSubheadings([]);
                    dispatchBody({type:"SECTION_TWO" , payload:[]})
                  }
                }}
              >
                Delete All
              </Button>
            </div>
          )}
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default SectionTwo;
