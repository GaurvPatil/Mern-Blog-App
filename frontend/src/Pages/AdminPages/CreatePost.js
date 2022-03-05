import React, { useState } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  makeStyles,
} from "@material-ui/core";
import CategoryName from "../../Components/MultiStepForm/CategoryName";
import PostHeader from "../../Components/MultiStepForm/PostHeader";
import PostTitle from "../../Components/MultiStepForm/PostTitle";
import CoverImage from "../../Components/MultiStepForm/CoverImage";
import PostBody from "../../Components/MultiStepForm/PostBody";
import Conclusion from "../../Components/MultiStepForm/Conclusion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostComplited from "../../Components/PostComplited";
import { useSelector } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  stepper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    border: "1px solid #999",
    "& .MuiSvgIcon-root.MuiStepIcon-root.MuiStepIcon-active": {
      color: "red",
    },
    "& .MuiSvgIcon-root.MuiStepIcon-root.MuiStepIcon-completed": {
      color: "green",
    },
  },

  btnDiv: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  btn: {
    background: "#1e5372",
    fontWeight: "bold",
  },
  btnPost: {
    background: "green",
    fontWeight: "bold",
  },
}));

const CreatePost = () => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  const post = useSelector((state) => state.postDataReducer);

  const getSteps = () => {
    return ["CATEGORY", "HEADER", "TITLE", "COVER-IMAGE", "BODY", "CONCLUSION"];
  };

  const handleNext = () => {
    if (activeStep > 5) {
      setActiveStep(5);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePrev = () => {
    if (activeStep < 1) {
      setActiveStep(1);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = getSteps();

  function stepForm(activeNo) {
    if (activeNo === 0) {
      return <CategoryName />;
    } else if (activeNo === 1) {
      return <PostHeader />;
    } else if (activeNo === 2) {
      return <PostTitle />;
    } else if (activeNo === 3) {
      return <CoverImage />;
    } else if (activeNo === 4) {
      return <PostBody />;
    } else if (activeNo === 5) {
      return <Conclusion />;
    }
    return "unkown step";
  }

  const confirmPost = () => {
   
    const { category, header, title, coverImage, body } = post;
    if (
      category &&
      header &&
      title &&
      coverImage &&
      body.intro &&
      body.paragraphs &&
      body.subheadings &&
      body.conclusion
    ) {
      const result = window.confirm("Are You Sure");
      if (result) {
        const url = `http://localhost:8080/api/category/posts/${category}`;
        axios
          .post(url, post)
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
      alert("please first fill required data");
    }
  };

  return (
    <Container maxWidth="lg">
      <div>
        <Stepper className={classes.stepper} activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <PostComplited post={post} />
          ) : (
            stepForm(activeStep)
          )}

          <div className={classes.btnDiv}>
            <Button onClick={handlePrev} className={classes.btn}>
              Previous
            </Button>

            {activeStep === steps.length ? (
              <Button
                onClick={confirmPost}
                className={classes.btnPost}
                style={{
                  background: "green",
                }}
              >
                Post
              </Button>
            ) : (
              <Button onClick={handleNext} className={classes.btn}>
                next
              </Button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default CreatePost;
