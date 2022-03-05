import React, { useReducer } from "react";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import SectionOne from "./BodySections/SectionOne";
import SectionTwo from "./BodySections/SectionTwo";
import SectionThree from "./BodySections/SectionThree";
import SectionFour from "./BodySections/SectionFour";
import { useDispatch } from "react-redux";
import { btn } from "./CommonStyle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  btn,
  outerDiv: {
    marginTop: "4rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "monteserrat",
    width: "100%",
  },
  warning: {
    fontFamily: "monteserrate",
    fontWeight: "300",
    width: "100%",
    textAlign: "center",
    marginTop: "2rem",
    color: "red",
  },
}));

function bodyReducer(state, { type, payload }) {
  switch (type) {
    case "SECTION_ONE":
      const addSecOne = {
        ...state,
        intro: payload.intro,
        paragraphs: payload.paragraphs,
      };
      return (state = addSecOne);

    case "SECTION_TWO":
      let addSecTwo;

      if (payload.length > 0) {
        addSecTwo = {
          ...state,
          subheadings: payload,
        };
      } else if (payload.length === 0) {
        addSecTwo = {
          ...state,
          subheadings: [],
        };
      }
      console.log(addSecTwo)
      return (state = addSecTwo);

    case "SECTION_THREE":
      const addSecThree = {
        ...state,
        optionalImages: { ...payload },
      };
      return (state = addSecThree);

    case "SECTION_FOUR":
      const addSecFour = {
        ...state,
        lastBigImageoptional: payload,
      };
      return (state = addSecFour);

    default:
      return state;
  }
}

const PostBody = () => {
  const [state, dispatchBody] = useReducer(
    bodyReducer,

    {
      intro: "",
      paragraphs: [],
      subheadings: [],
      optionalImages: {},
      lastBigImageoptional: "",
    }
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const checkData = () => {
    if (state.intro && state.paragraphs && state.subheadings.length > 0) {
      const result = window.confirm("Are You Sure");
      if (result) {
        
        dispatch({ type: "BODY_DATA", payload: state });

        const notify = () =>
          toast.success("Body Added Successfully! ", {
            autoClose: 2000,
          });

        notify();
      }
    } else {
      alert("first two sections  is required");
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography className={classes.warning} variant="h5">
        WARNING : Don't Forget To Click Add-Button Every Time You Have Done
        Change In Section
      </Typography>
      <div className={classes.outerDiv}>
        <SectionOne dispatchBody={dispatchBody} />
        <SectionTwo dispatchBody={dispatchBody} />
        <SectionThree dispatchBody={dispatchBody} />
        <SectionFour dispatchBody={dispatchBody} />
      </div>

      <div style={{ textAlign: "center" }}>
        <Button
          className={classes.btn}
          onClick={checkData}
          style={{
            background: "green",
          }}
        >
          Add Body
        </Button>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default PostBody;
