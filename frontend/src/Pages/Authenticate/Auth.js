import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";

import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "../../Components/AuthComponents/icon";
import { signin, signup } from "./actions/authAction";
import { AUTH } from "../../redux/autheticateReducer/actionTypes";
import Input from "../../Components/AuthComponents/Input";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
  const [mailOtp, setMailOtp] = useState("");
  const [otp, setOtp] = useState("");
  

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    if (isSignup) {
      if (regex.test(formData.password)) {
        if (formData.firstName.length > 0 && formData.lastName.length > 0) {
          if (mailOtp === otp && otp.length > 0) {
            dispatch(signup(formData, history));
          } else {
            const notify = () =>
              toast.warn("Enter valid OTP!", {
                autoClose: 2000,
              });
            notify();
          }
        } else {
          const notify = () =>
            toast.warn("input is blank!", {
              autoClose: 2000,
            });
          notify();
        }
      } else {
        const notify = () =>
          toast.warn("Password Not Valid", {
            autoClose: 2000,
          });
        notify();
      }
    } else {
      dispatch(signin(formData, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history("/", { replace: true });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    const notify = () =>
      toast.error("google sign in Unsuccessfully!", {
        autoClose: 2000,
      });

    notify();
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignup === false && (
             
              <Button
              onClick={()=>history("/forgotpassword" , {replace:true})}
              >
                Forgot password
              </Button>
              
            )}
           









            {isSignup && (
              <>
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
                <span
                  style={{
                    fontSize: "10px",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Password should be minimum eight characters, at least one
                  letter, one special charecter & one number
                </span>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    name="otp"
                    label="OTP"
                    variant="outlined"
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />

                  <Button
                    style={{
                      background: "green",
                      fontWeight: "bold",
                    }}
                    onClick={async () => {
                      try {
                        if (formData.email) {
                          axios
                            .post("http://localhost:8080/user/otp", {
                              email: formData.email,
                            })
                            .then((res) => {
                              const notify = () =>
                                toast.success(res.data.msg, {
                                  autoClose: 2000,
                                });

                              notify();
                              setMailOtp(res.data.msgO);
                            })
                            .catch((err) => {
                              const notify = () =>
                                toast.error(err.response.data.msg, {
                                  autoClose: 2000,
                                });

                              notify();
                            });
                        } else {
                          alert("first enter E-mail address");
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Send OTP
                  </Button>
                </div>
              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="712703865197-ml55o6kjve08utuslpi4dti83e8d6of4.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default SignUp;
