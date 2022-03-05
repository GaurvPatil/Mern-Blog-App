import React from "react";
import heroImg from "../../images/light.png";
import heroImgdark from "../../images/dark.png";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsArrowDown } from "react-icons/bs";
import { colorChanger } from "../../themeColorChanger/themeColorChange";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";

const HeroConent = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);

  const useStyles = makeStyles((theme) => ({
    outerDiv: {
      display: "flex",
      flexDirection: "row",
    },

    heroTextOuter: {
      display: "flex",
      flexDirection: "row",
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
    },

    //   hero div
    hero: {
      display: "flex",
      flexDirection: "column",
      width: "50%",
      alignItems: "center",
      justifyContent: "center",
    },
    // text to button
    upperLine: {
      width: "7rem",
      borderTop: colorChanger("4px solid aqua", "4px solid gold", checkTheme),
    },

    mainText: {
      fontWeight: "bold",
    },

    smallPara: {
      fontSize: "1rem",
      color: "gray",
      letterSpacing: "0.1rem",
    },

    // Link div Reach us

    linkdiv: {
      display: "flex",
      alignItems: "center",
      marginTop: "2rem",
    },

    btn: {
      border: "none",
      margin: 10,
      width: "14rem",
      height: "2.5rem",
      borderRadius: 6,
      textTransform: "uppercase",
      cursor: "pointer",
      color: "#fff",
      backgroundSize: "200%",
      transition: "0.4s",
      "&:hover": {
        backgroundPosition: "right",
      },
    },

    btn4: {
      backgroundImage: colorChanger(
        "linear-gradient(to left, #34495e, #9b59b6, #3498db)",
        "linear-gradient(45deg, #FFC312, #EE5A24, #00A8FF)",
        checkTheme
      ),
    },

    // social Icon and Scroll
    iconDiv: {
      marginTop: "1.5rem",
    },
    Icons: {
      padding: "0.6rem",
      color: colorChanger("black", "white", checkTheme),
    },

    scroll: {
      marginTop: "2.5rem",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },

    //   img
    image: {
      width: "50%",
      height: "100%",
    },

    // laptops desktop 960
    [theme.breakpoints.down("lg")]: {
      upperLine: {
        width: "10rem",
      },
      hero: {
        margin: "3rem 0",
      },
      mainText: {
        fontSize: "5rem",
      },
      smallPara: {
        fontSize: "1.3rem",
      },
    },

    //   767  big tablets
    [theme.breakpoints.down("md")]: {
      upperLine: {
        width: "7rem",
      },
      mainText: {
        fontSize: "3rem",
      },
      hero: {
        margin: "5rem 0",
      },
      smallPara: {
        fontSize: "1rem",
      },
    },

    //   500  small tablets
    [theme.breakpoints.down("sm")]: {
      image: {
        display: "none",
      },
      heroTextOuter: {
        height: "auto",
      },
      hero: {
        margin: "5rem 0",
        width: "100%",
      },
      upperLine: {
        width: "8rem",
      },
      mainText: {
        fontSize: "3.5rem",
      },
      smallPara: {
        fontSize: "1.3rem",
      },
      scroll: {
        marginTop: "5rem",
      },
      btn: {
        width: "16rem",
      },
    },

    //  320  phones
    [theme.breakpoints.down("xs")]: {
      hero: {
        margin: "3rem 0",
      },
      upperLine: {
        width: "13.8rem",
      },
      mainText: {
        fontSize: "7rem",
      },

      smallPara: {
        fontSize: "1.5rem",
      },
      Icons: {
        padding: "0.6rem",
      },
      scroll: {
        marginTop: "4rem",
        gap: "20px",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <div className={classes.heroTextOuter}>
        {/* hero div  */}
        <div className={classes.hero}>
          {/* hero text include text and button  */}
          <div className={classes.heroText}>
            <div className={classes.upperLine}> </div>
            <Typography className={classes.mainText} variant="h1">
              Whiz Holics
            </Typography>
            <Typography className={classes.smallPara}>
              {" "}
              Successful Blog: You're only a stranger once.
            </Typography>
            <div className={classes.linkdiv}>
              <Button className={`${classes.btn} ${classes.btn4}`}>
                <Link
                  to="/about"
                  style={{
                    width: "12rem",
                    height: "1.8rem",
                    fontWeight: "600",
                    color: "black",
                  }}
                >
                  {" "}
                  Reach us{" "}
                </Link>
              </Button>
            </div>

            {/* social icons  div  */}
            <div className={classes.socialIcons}>
              {/* icons  */}
              <div className={classes.iconDiv}>
                <Link to="/" className={classes.Icons}>
                  <LinkedInIcon style={{ fontSize: "2.5rem" }} />
                </Link>
                <Link to="/" className={classes.Icons}>
                  <TwitterIcon style={{ fontSize: "2.5rem" }} />
                </Link>
                <Link to="/" className={classes.Icons}>
                  <InstagramIcon style={{ fontSize: "2.5rem" }} />
                </Link>
                <Link to="/" className={classes.Icons}>
                  <FacebookIcon style={{ fontSize: "2.5rem" }} />
                </Link>
              </div>
              <div className={classes.scroll}>
                <span
                  style={{
                    width: "50px",
                    fontSize: "13px",
                    transform: "rotate(90deg)",
                    letterSpacing: "2px",
                  }}
                >
                  Scroll
                </span>
                <BsArrowDown size="50px" />
              </div>
            </div>
          </div>
        </div>

        <img
          src={checkTheme === "dark" ? heroImgdark : heroImg}
          className={classes.image}
          alt="img"
        />
      </div>
    </Container>
  );
};

export default HeroConent;
