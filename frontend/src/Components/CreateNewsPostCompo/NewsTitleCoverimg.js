import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { div, label, textField, btn } from "../MultiStepForm/CommonStyle";

const useStyles = makeStyles((theme) => ({
  div,
  label,
  textField,
  btn,
}));

const NewsTitleCoverimg = ({ newsDispatch }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");

  const addTitle = (titleText) => {
    if (titleText.length > 0) {
      newsDispatch({ type: "TITLE", payload: titleText });
      const notify = () =>
        toast.success("Title successfully added! ", {
          autoClose: 2000,
        });

      notify();
    } else {
      alert("please fill data");
    }
  };

  return (
    <>
      <div className={classes.div}>
        <label className={classes.label}> Title : </label> &nbsp;
        <TextField
          label="Post Title"
          type="text"
          variant="outlined"
          className={classes.textField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          className={classes.btn}
          style={{
            background: "green",
          }}
          onClick = {()=> addTitle(title) }
        >
          Add Title
        </Button>
      </div>
      <ToastContainer />
    </>
  );
};

export default NewsTitleCoverimg;
