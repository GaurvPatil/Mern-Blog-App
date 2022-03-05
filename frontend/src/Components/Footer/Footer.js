import {
  Container,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import NavigationIcon from "@material-ui/icons/Navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Footer = () => {
  const useStyles = makeStyles((theme) => ({
    outerdiv: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginTop: "4rem",
      padding: "4rem 2rem",
      color: "white",
    },
    heads: {
      fontWeight: "bold",
    },

    about: {
      width: "25%",
    },
    news: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    email: {
      width: "180px",
    },
    textField__label: {
      color: "white",
    },
    button: {
      letterSpacing: "1px",
      display: "flex",
      gap: "0.5rem",
      fontSize: "16px",
      padding: "10px",
      background: "#102a42",
      cursor: "pointer",
    },
    insta: {
      display: "flex",
      flexDirection: "column",
      width: "25%",
    },

    instapostdiv: {
      display: "flex",
      flexDirection: "row",
      border: "2px solid gray",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: "100px",
    },

    linksdiv: {
      display: "flex",
      flexDirection: "column",
    },
    follow: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "5px",
    },

    navigateTop: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "2px solid white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",

      transition: "0.4s",
      "&:hover": {
        background: "white",
        color: "black",
      },
    },

    [theme.breakpoints.down("md")]: {
      outerdiv: {
        gap: "1.5rem",
      },
      about: {
        width: "100%",
      },
      insta: {
        width: "50%",
      },
    },

    [theme.breakpoints.down("sm")]: {
      about: {
        width: "100%",
      },
      linksdiv: {
        flexDirection: "row",
        gap: "1rem",
      },
      navigateTop: {
        marginTop: "16px",
      },
    },

    [theme.breakpoints.down("xs")]: {
      insta: {
        width: "100%",
      },
    },
  }));
  const classes = useStyles();
  const [mail, setMail] = useState("");
  return (
    <>
      <Container maxWidth="xl" style={{ background: "black" }}>
        <div className={classes.outerdiv}>
          <div className={classes.about}>
            <Typography variant="h6" className={classes.heads}>
              Who We Are
            </Typography>

            <Typography variant="subtitle1" style={{ fontSize: "13px" }}>
              Lorem ipsun nagd hth ld askda wdih iwhdi iwdhoi oadopa Lorem ipsun
              nagd hth ld askda wdih iwhdi iwdhoi oadopa Lorem ipsun nagd hth ld
              askda wdih iwhdi iwdhoi oadopa Lorem ipsun nagd hth ld askda wdih
              iwhdi iwdhoi oadopa ...
              <Link to="/about" style={{ color: "#1f97bb", cursor: "pointer" }}
              
              onClick={() => window.scroll(0, 0)}
              
              >
                Read More
              </Link>
            </Typography>
          </div>
          <div className={classes.news}>
            <Typography variant="h6" className={classes.heads}>
              Newsletter
            </Typography>

            <TextField
              label="Email.."
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className={classes.email}
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ className: classes.textField__label }}
            />

            <span className={classes.button}
             onClick={() => {
              if (mail.length > 0) {
                const url = "http://localhost:8080/user/subscriber";
                axios
                  .post(url, { email: mail })
                  .then((res) => {
                    const notify = () =>
                      toast.success(res.data.msg, {
                        autoClose: 2000,
                      });

                    notify();
                    setMail("");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
            >
              SUBSCRIBE <ArrowForwardIosIcon />
            </span>
          </div>
          <div className={classes.insta}>
            <Typography variant="h6" className={classes.heads}>
              Instagram
            </Typography>

            <div className={classes.instapostdiv}>
              <div>post-1</div>
              <div>post-2</div>
            </div>
          </div>
          <div className={classes.follow}>
            <Typography variant="h6" className={classes.heads}>
              Follow Us
            </Typography>

            <div className={classes.linksdiv}>
              <Link to="/">
                {" "}
                <InstagramIcon />{" "}
              </Link>
              <Link to="/">
                {" "}
                <LinkedInIcon />{" "}
              </Link>
              <Link to="/">
                {" "}
                <TwitterIcon />
              </Link>
              <Link to="/">
                {" "}
                <FacebookIcon />
              </Link>
            </div>
          </div>
          <Tooltip title="Scroll Top" arrow>
            <div
              className={classes.navigateTop}
              onClick={() => window.scroll(0, 0)}
            >
              <NavigationIcon />
            </div>
          </Tooltip>
        </div>
        <ToastContainer />
      </Container>
      <span
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            background: "black",
            color: "white",
          }}
        >
          All Copyrights Reserved By @ Whiz Holics
        </p>
      </span>
    </>
  );
};

export default Footer;
