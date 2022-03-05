import { Button, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { div, label, textField, btn } from "../MultiStepForm/CommonStyle";

const useStyles = makeStyles((theme) => ({
  div,
  label,
  textField,
  btn,
}));

const NewsCategory = ({ newsDispatch }) => {
  const category = useSelector((state) => state.adminIDCheckReducer);
  const classes = useStyles();

  const categoryChek = (cat) => {
    newsDispatch({ type: "CATEGORY", payload: cat });
    const notify = () =>
      toast.success("Category Check! ", {
        autoClose: 2000,
      });

    notify();
  };

  return (
    <>
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
          style={{
            background: "green",
          }}
          onClick={() => categoryChek(category)}
        >
          Check Category
        </Button>
      </div>
      <ToastContainer />
    </>
  );
};

export default NewsCategory;
