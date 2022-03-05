import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Input from "../../Components/AuthComponents/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = {
  adminName: "",
  password: "",
};

const Admin = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState(initialState);
  const checkLogin = useSelector((state)=> state.protectedReducer)
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.adminName.length > 0 && formData.password.length > 0) {
      try {
        await axios
          .post("http://localhost:8080/user/adminsignin", formData)
          .then((res) => {
            const notify = () =>
              toast.success(res.data.message, {
                autoClose: 2000,
              });

            notify();
            dispatch({ type: "ADMIN_LOGIN" });
            
           if(checkLogin === "login"){
            navigate("/adminhome", { replace: true });
           }
          })
          .catch((err) => {
            const notify = () =>
              toast.error(err.message, {
                autoClose: 2000,
              });

            notify();
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Enter valid credentials");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        marginTop: "5rem",
        marginBottom: "5rem",
      }}
    >
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
      </Paper>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Input
            name="adminName"
            label="User Name"
            handleChange={handleChange}
            autoFocus
          />
          <Input
            name="password"
            label="Password"
            handleChange={handleChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </Grid>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default Admin;
