import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import heroImgdark from "../../images/dark.png";
import { colorChanger } from "../../themeColorChanger/themeColorChange";
import { useDispatch, useSelector } from "react-redux";
import ChangePosition from "../../changePosition/ChangePosition";
import { cardChanger } from "../../cardChanger/cardChanger";

const HomeAdminPage = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);
  const checkFlex = useSelector((state) => state.flexReducer);
  const checkDisplay = useSelector((state) => state.ImageToggleReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = [
    {
      id: 1,
      name: "Spritual",
      linkid: "spritual",
      posts: "10",
    },
    {
      id: 2,
      name: "Lifestyle & Fashoin",
      linkid: "lifestyle&fashion",
      posts: "30",
    },
    {
      id: 3,
      name: "Crypto",
      linkid: "crypto",
      posts: "10",
    },
    {
      id: 4,
      name: "News",
      linkid: "news",
      posts: "2",
    },
  ];

  const useStyles = makeStyles((theme) => ({
    cardOuterDiv: {
      display: "flex",
      flexDirection: checkFlex,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "1.5rem",
      fontFamily: "monteserrat",
    },

    card: {
      width: cardChanger(checkFlex, 200, "70%"),
      maxHeight: 480,
      margin: "1rem",
      display: "flex",
      flexDirection: cardChanger(checkFlex, "column", "row"),
      alignItems: cardChanger(checkFlex, "", "center"),
      justifyContent: cardChanger(checkFlex, "", "space-between"),
      padding: cardChanger(checkFlex, "", "0 2rem"),
    },

    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      display: checkDisplay,
    },

    link: {
      padding: "7px",
      marginBottom: cardChanger(checkFlex, "10px", 0),
      width: "120px",
      textAlign: "center",
      borderRadius: "5px",
      letterSpacing: "1px",
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
      border: colorChanger("2px solid black", "2px solid gold", checkTheme),
      backgroundColor: colorChanger("#617d98", "#212121", checkTheme),
    },

    logoutDiv:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "2rem",
    },

    [theme.breakpoints.down("sm")]: {
      card: {
        width: cardChanger(checkFlex, 200, "95%"),
        padding: "5px",
      },
    },

    [theme.breakpoints.down("xs")]: {
      card: {
        width: "95%",
        padding: "5px",
      },
      link: {
        width: "100px",
        padding: "3px",
      },
    },
  }));
  const classes = useStyles();

  const adminlogOut = () => {
    dispatch({ type: "ADMIN_LOGOUT" });
    navigate("/", { replace: true });
  };

  return (
    <>
      <Container maxWidth="lg">
        <div
         className={classes.logoutDiv}
        >
          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              margin: "2rem",
            }}
          >
            <ChangePosition />
          </Typography>
          <Button
            onClick={() => adminlogOut()}
            style={{ background: "red", width: "10%" }}
          >
            Logout
          </Button>
        </div>
        <div className={classes.cardOuterDiv}>
          {category.map((cat) => {
            const linkTo = () => {
              if (cat.name === "News") {
                return true;
              }
              return false;
            };

            return (
              <Card className={classes.card} key={cat.id}>
                <div
                  style={{
                    textAlign: "center",
                    paddingTop: "10px",
                    display: cardChanger(checkFlex, "", "flex"),
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">{cat.name}</Typography>
                </div>
                <CardHeader />
                <CardMedia
                  className={classes.media}
                  image={heroImgdark}
                  title="postpic"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CardActions disableSpacing>
                    <Link
                      className={classes.link}
                      to={
                        linkTo === true
                          ? "/postdata/news/allpost"
                          : `/postdata/${cat.linkid}/allpost`
                      }
                      onClick={() => {
                        window.scroll(0, 0);
                        if (cat.name === "Lifestyle & Fashoin") {
                          dispatch({ type: "LIFESTYLE_FASHION" });
                        } else if (cat.name === "News") {
                          dispatch({ type: "NEWS" });
                        }
                        dispatch({ type: cat.linkid.toUpperCase() });
                      }}
                    >
                      {" "}
                      Check
                    </Link>
                  </CardActions>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default HomeAdminPage;
