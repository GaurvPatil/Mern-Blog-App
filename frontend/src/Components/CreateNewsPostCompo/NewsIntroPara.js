import React, { useState } from "react";
import {
  Button,
  makeStyles,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { article, btn } from "../MultiStepForm/CommonStyle";
import ParaArr from "../MultiStepForm/CommonComponents.js/ParaArr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  article,
  btn,
  section: {
    width: "100%",
    paddingBottom: "2rem",
    borderBottom: "2px solid gray",
  },
  textArea: {
    width: "100%",
    marginBottom: "2rem",
  },
}));

const NewsIntroPara = ({ newsDispatch }) => {
  const [sectionData, setSectionData] = useState({
    paragraphs: [],
  });

  const [intro, setIntro] = useState("");
  const classes = useStyles();

  const add = () => {
    if (intro.length > 0 || sectionData.paragraphs.length > 0) {
      newsDispatch({
        type: "INTRO_PARA",
        payload: { paragraphs: sectionData.paragraphs, intro },
      });
      const notify = () =>
        toast.success("Intro and Para sdded successfully! ", {
          autoClose: 2000,
        });

      notify();
    } else {
      alert("please fill data");
    }
  };

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

        <div style={{ textAlign: "center" }}>
          <Button
            className={classes.btn}
            style={{
              background: "green",
            }}
            onClick={add}
          >
            Add
          </Button>
        </div>

        <ToastContainer />
      </section>
    </>
  );
};

export default NewsIntroPara;
