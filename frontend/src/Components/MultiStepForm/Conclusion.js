import React, { useState } from "react";
import { Button, Container, makeStyles } from "@material-ui/core";
import { article, btn } from "./CommonStyle";
import ParaArr from "./CommonComponents.js/ParaArr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  article,
  btn,
  section: {
    width: "80%",
    marginTop: "4rem",
    paddingBottom: "2rem",
    borderBottom: "2px solid gray",
  },
  Container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  [theme.breakpoints.down("md")]: {
    section: {
      width: "100%",
    },
  },
}));

const Conclusion = () => {
  const [sectionData, setSectionData] = useState({
    paragraphs: [],
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const addSectionData = () => {
    if (sectionData.paragraphs.length > 0) {
      dispatch({ type: "CONCLUSION_DATA", payload: sectionData.paragraphs });

      const notify = () =>
        toast.success("Conclusion Added SuccessFully!", {
          autoClose: 2000,
        });

      notify();
      setSectionData({
        paragraphs: [],
      });
    } else {
      alert("pleas fill data");
    }
  };

  return (
    <Container maxWidth="lg" className={classes.Container}>
      <section className={classes.section}>
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
            className={classes.btn}
            onClick={addSectionData}
            style={{
              background: "green",
            }}
          >
            Add Conclusion
          </Button>
        </div>
      </section>

      <ToastContainer />
    </Container>
  );
};

export default Conclusion;
