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

const PostHeader = () => {
  const classes = useStyles();
  const [header, setHeader] = useState("");
  const dispatch = useDispatch();

  const addData = () => {
    if (header) {
      dispatch({ type: "HEADER_DATA", payload: header });

      // notify and after success

      const notify = () =>
        toast.success("Header Added SuccessFully!", {
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
        <label className={classes.label}> Header : </label> &nbsp;
        <TextField
          
          label="Post Header"
          type="text"
          variant="outlined"
          className={classes.textField}
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button className={classes.btn} onClick={addData} 
          style = {{
            background: "green",
          }}
        >
          Add Header
        </Button>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default PostHeader;
