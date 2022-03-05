import React, { useState } from "react";
import {
  Button,
  Container,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Footer from "../Components/Footer/Footer";
import aboutimg from "../images/aboutimg.png";
import { aboutData } from "../AboutData";
import { FaAngleDoubleRight } from "react-icons/fa";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import { colorChanger } from "../themeColorChanger/themeColorChange";
import { useSelector } from "react-redux";
import clsx from "clsx";

const About = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);
  const data = aboutData;
  const [value, setValue] = useState(0);

  const useStyles = makeStyles((theme) => ({
    firstdiv: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "1rem",
      marginTop: "4rem",
    },
    image: {
      width: "39%",
      height: "30%",
    },
    bigpara: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },

    personSection: {
      display: "felx",
      flexDirection: "row",
      marginTop: "2rem",
    },
    articleOne: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    name: {
      textAlign: "center",
      fontFamily: "monteserrat",
      padding: "0.5rem",
      margin: "1rem",
      cursor: "pointer",
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
    },
    articleTwo: {
      display: "flex",
      flexDirection: "column",
    },
    medialinks: {
      color: colorChanger("black", "white", checkTheme),
      padding:"5px",
      cursor:"pointer"
    },

    activebtn: {
      color: "#2caeba",
      boxShadow: "0 2px #2caeba",
    },

    [theme.breakpoints.down("md")]: {
      firstdiv: {
        flexDirection: "column-reverse",
      },
      image: {
        width: "50%",
      },
      bigpara: {
        width: "100%",
      },

      personSection: {
        flexDirection: "column",
      },

      articleOne: {
        width: "100%",
        flexDirection: "row",
        marginBottom: "2rem",
        alignItems: "center",
      },
      articleTwo: {
        alignItems: "center",
        justifyContent: "center",
      },
      skilldiv: {
        textAlign: "center",
      },
    },

    [theme.breakpoints.down("sm")]: {
      firstdiv: {
        marginTop: "2rem",
      },
      name: {
        margin: "0",
      },
    },
  }));

  const classes = useStyles();
  const { avtar, name, skills, info, socialLinks } = data[value];
  return (
    <>
      <Container maxWidth="xl" style={{ fontFamily: "sans-serif" }}>
        <div className={classes.firstdiv}>
          <div className={classes.bigpara}>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", fontFamily: "monteserrat" }}
            >
              Who We Are
            </Typography>
            <Typography>
              Lorem ipsun nagd hth ld askda wdih iwhdi iwdhoi oadopa Lorem ipsun
              nagd hth ld askda wdih iwhdi iwdhoi oadopa Lorem ipsun nagd hth ld
              askda wdih iwhdi iwdhoi oadopa Lorem ipsun nagd hth ld askda wdih
              iwhdi iwdhoi oadopa Lorem ipsun nagd hth ld askda wdih iwhdi
              iwdhoi oadopa Lorem ipsun nagd hth ld askda wdih iwhdi iwdhoi
              oadopa Lorem ipsun nagd hth ld askda wdih iwhdi iwdhoi oadopa
              Lorem ipsun nagd hth ld askda wdih iwhdi iwdhoi oadopa ... Lorem
              ipsun nagd hth ld
            </Typography>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Button variant="contained" disabled>
                Blogging
              </Button>
              <Button variant="contained" disabled>
                Web Development
              </Button>
              <Button variant="contained" disabled>
                MERN Stack
              </Button>
              <Button variant="contained" disabled>
                Wordpress
              </Button>
              <Button variant="contained" disabled>
                Content Writing
              </Button>
              <Button variant="contained" disabled>
                SEO
              </Button>
            </div>
          </div>
          <img src={aboutimg} alt="Aboutimg" className={classes.image} />
        </div>

        <div className={classes.personSection} style={{ display: "flex" }}>
          <article className={classes.articleOne}>
            {data.map((person, index) => {
              return (
                <Typography
                  variant="h5"
                  key={person.id}
                  onClick={() => setValue(index)}
                  className={clsx(
                    classes.name,
                    index === value && classes.activebtn
                  )}
                >
                  {person.name}
                </Typography>
              );
            })}
          </article>

          <article className={classes.articleTwo}>
            <div>
              <img src={avtar} alt={name} />
              <Typography
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  width: "200px",
                  fontFamily: "monteserrat"
                }}
              >
                {name}
              </Typography>
            </div>

            <div
              style={{
                width: "200px",
                textAlign: "center",
                padding: "2px",
              }}
            >
              <Link to={socialLinks.linkdin} className={classes.medialinks}
             
              >
                <LinkedInIcon />
              </Link>
              <Link to={socialLinks.twitter} className={classes.medialinks}>
                <TwitterIcon />{" "}
              </Link>
              <Link to={socialLinks.fb} className={classes.medialinks}>
                {" "}
                <FacebookIcon />{" "}
              </Link>
              <Link to={socialLinks.insta} className={classes.medialinks}>
                {" "}
                <InstagramIcon />{" "}
              </Link>
            </div>

            <div className={classes.skilldiv}>
              {skills.map((skill, index) => {
                return (
                  <Button
                    variant="contained"
                    disabled
                    key={index}
                    style={{
                      margin: "10px",
                    }}
                  >
                    {skill}
                  </Button>
                );
              })}
            </div>
            <div>
              {info.map((description, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      margin: "0.5rem",
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <FaAngleDoubleRight style={{color:"aqua"}} size={30} />
                    <Typography>{description}</Typography>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default About;
