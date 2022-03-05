import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { div, label, textField, btn } from "./CommonStyle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  div,
  label,
  textField,
  btn,
}));

const CategoryName = () => {
  const classes = useStyles();
  const category = useSelector((state) => state.adminIDCheckReducer);
  const dispatch = useDispatch();

  const addData = () => {
    if (category) {
      dispatch({ type: "CATEGORY_DATA", payload: category });

      // notify and after success

      const notify = () =>
        toast.success("Category Check!", {
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
        <label className={classes.label}> Category : </label> &nbsp;
        <TextField
          type="text"
          defaultValue={category}
          variant="outlined"
          inputProps={{ readOnly: true }}
          className={classes.textField}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          className={classes.btn}
          onClick={addData}
          style={{
            background: "green",
          }}
        >
          Check Category
        </Button>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default CategoryName;
