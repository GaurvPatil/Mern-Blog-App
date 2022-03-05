import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../Components/Footer/Footer";
import contactImg from "../images/contactimg.png";
import darkcontactimg from "../images/darkcontactimg.png";
import MailIcon from "@material-ui/icons/Mail";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  topDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4rem",
  },
  leftDiv: {
    width: "50%",
  },
  maildiv: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },

  form: {
    textAlign: "center",
    marginTop: "2rem",
    "& .MuiTextField-root": {
      marginTop: theme.spacing(2),
      width: "100%",
    },
  },
  image: {
    width: "100px",
    height: "100px",
  },
  [theme.breakpoints.down("md")]: {
    topDiv: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    leftDiv: {
      width: "100%",
    },
    maildiv: {
      justifyContent: "center",
    },

    image: {
      display: "none",
    },
  },
}));

const Contact = () => {
  const classes = useStyles();
  const checkTheme = useSelector((state) => state.themeChangeReducer);

  const [msg, setMsg] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, email, message } = msg;
    if (name && email && message) {
      emailjs
        .sendForm(
          "service_niao2kx",
          "template_gt2zlhc",
          event.target,
          "user_SRCWsrATm6awLIsasQoSV"
        )
        .then((res) => {
          console.log(res);
          event.target.reset()
          setMsg({
            name: "",
            email: "",
            message: "",
          })
          const notify = () =>
            toast.success("mail sent successfully!", {
              autoClose: 2000,
            });
          notify();
        })
        .catch((err) => {
          console.log(err);
          const notify = () =>
            toast.error("there was an error!", {
              autoClose: 2000,
            });
          notify();
        });
    } else {
      alert("all fields are required");
    }
  };

  return (
    <>
      <Container
        maxWidth="lg"
        style={{
          fontFamily: "sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={classes.topDiv}>
          <div className={classes.leftDiv}>
            <Typography
              variant="h3"
              style={{ fontFamily: "monteserrat" }}
              className={classes.bigtxt}
            >
              {" "}
              Get In Touch !{" "}
            </Typography>
            <Typography variant={"body2"}>
              {" "}
              contact us for more info & demo{" "}
            </Typography>

            <Typography variant={"body2"} className={classes.maildiv}>
              {" "}
              <MailIcon /> wizholic@gmail.com{" "}
            </Typography>
          </div>
          <img
            className={classes.image}
            src={checkTheme === "light" ? contactImg : darkcontactimg}
            alt="contact-img"
          />
        </div>
        <form className={classes.form} noValidate autoComplete="off"
        onSubmit={handleSubmit} 
        >
          <div>
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Name"
                name = "Name"
                multiline
                maxRows={4}
                variant="outlined"
                value={msg.name}
                onChange={(e) => {
                  setMsg({
                    ...msg,
                    name: e.target.value,
                  });
                }}
              />
              <TextField
                id="outlined-textarea"
                label="Email"
                name = "Email"
                multiline
                variant="outlined"
                value={msg.email}
                onChange={(e) => {
                  setMsg({
                    ...msg,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <TextField
              id="outlined-multiline-static"
              label="Message"
              name = "Message"
              multiline
              rows={8}
              variant="outlined"
              style={{
                width: "100%",
              }}
              value={msg.message}
              onChange={(e) => {
                setMsg({
                  ...msg,
                  message: e.target.value,
                });
              }}
            />
          </div>

          <Button
            variant="contained"
            type="submit"
            color="primary"
            style={{
              marginTop: "1rem",
              width: "200px",
            }}
          
          >
            Submit
          </Button>
        </form>
        <ToastContainer />
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
