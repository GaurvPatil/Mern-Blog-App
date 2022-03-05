import React, { useState } from "react";
import {
  Button,
  Paper,
  Grid,
  Container,
  TextField,
  makeStyles,
} from "@material-ui/core";
import Input from "../Components/AuthComponents/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  email: "",
  password: "",
  confirmPassword: "",
};

const ForgotPass = () => {
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const [mailOtp, setMailOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (formData.email && formData.password && formData.confirmPassword) {
      if (regex.test(formData.password)) {
        if (formData.password === formData.confirmPassword) {
          if (mailOtp === otp && otp.length > 0) {
            axios
              .patch("http://localhost:8080/user/forgetpassword", formData)
              .then((res) => {
                alert("password change successfully!")
                navigate("/auth", { replace: true });
              })
              .catch((err) => {
                const notify = () =>
                  toast.error("Somethin went wrong !", {
                    autoClose: 2000,
                  });

                notify();
              });
          } else {
            const notify = () =>
              toast.warn("Enter valid OTP!", {
                autoClose: 2000,
              });
            notify();
          }
        } else {
          const notify = () =>
            toast.warn("Password & confirm password diffrent!", {
              autoClose: 2000,
            });
          notify();
        }
      } else {
        const notify = () =>
          toast.warn("Password Not Acceptable!", {
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
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />

            <Input
              name="password"
              label="new password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

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
              Password should be minimum eight characters, at least one letter,
              one special charecter & one number
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
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default ForgotPass;
