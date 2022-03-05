import React, { useState, useRef } from "react";
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
    section: {
      width: "100%",
    },
  },
}));

const SectionOne = ({ dispatchBody }) => {
  const [sectionData, setSectionData] = useState({
    intro: "",
    paragraphs: [],
  });

  const [intro, setIntro] = useState("");
  const classes = useStyles();

  let finalData = useRef("");
  // final Add Section data
  const addSectionData = () => {
    if (intro.length > 0 && sectionData.paragraphs.length > 0) {
      finalData.current = {
        intro: intro,
        paragraphs: sectionData.paragraphs,
      };

      dispatchBody({ type: "SECTION_ONE", payload: finalData.current });


      // notify and after success

      const notify = () =>
        toast.success("Intro & Para Added Successfully!", {
          autoClose: 2000,
        });

      notify();

      setSectionData({
        intro: "",
        paragraphs: [],
      });
      setIntro("");
    } else {
      alert("Please Fill Data");
    }
  };

  // Modal Setup
  const modalTitle = "Section - 1";
  
  return (
    <>
      <section className={classes.section}>
        <article className={classes.article}>
          <Typography variant="h5"> Intro: </Typography>
          <TextareaAutosize
            placeholder="Intro"
            className={classes.textArea}
            minRows="3"
            value={intro}
            onChange={(e) => {
              setIntro(e.target.value);
            }}
          />
        </article>
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

          {finalData.current && (
            <CustomizedDialogs
              modalTitle={modalTitle}
              finalData={finalData.current}
            />
          )}
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default SectionOne;
