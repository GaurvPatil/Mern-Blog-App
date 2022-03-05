import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { div, label, textField, btn } from "./CommonStyle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  div,
  label,
  textField,
  btn,
}));

const PostTitle = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();


  const addData = () => {
    if (title) {
      dispatch({ type: "TITLE_DATA", payload: title });

      // notify and after success

      const notify = () =>
        toast.success("Title Added SuccessFully!", {
          autoClose: 2000,
        });

      notify();
    } else {
      alert("please add data");
    }
  };

  return (
    <Container>
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
        <Button className={classes.btn} onClick={addData}
          style = {{
            background: "green",
          }}
        >
          Add Title
        </Button>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default PostTitle;
