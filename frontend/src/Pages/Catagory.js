import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { colorChanger } from "../themeColorChanger/themeColorChange";
import { useSelector } from "react-redux";
import ChangePosition from "../changePosition/ChangePosition";
import { cardChanger } from "../cardChanger/cardChanger";
import Footer from "../Components/Footer/Footer";
import { fetchingPostCounts, categoryArr } from "../Components/PostCount/postCount";
import Loading from "../Components/Loading";


const Category = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);
  const checkFlex = useSelector((state) => state.flexReducer);
  const checkDisplay = useSelector((state) => state.ImageToggleReducer);
  const [postCount, setPostCount] = useState([0, 0, 0]);
  const category = categoryArr(postCount);
  const [loading, setLoading] = useState(true);
  

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
      height: 200,
      paddingTop: "56.25%", // 16:9
      display: checkDisplay,
    },
    headcatPostNo: {
      fontSize: "1rem",
      display: cardChanger(checkFlex, "none", "unset"),
    },

    exploreAllDiv: {
      display: "flex",
      flexDirection: cardChanger(checkFlex, "column", "row"),
      alignItems: "center",
    },

    footcatPostNo: {
      fontSize: "1rem",
      display: cardChanger(checkFlex, "unset", "none"),
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
      backgroundColor: colorChanger("#a4e5af", "#212121", checkTheme),
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

  useEffect(() => {
    let mounted = true;
    fetchingPostCounts(mounted, setPostCount, setLoading);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            margin: "2rem",
          }}
        >
          {" "}
          ALL CATEGORIES <br />
          <ChangePosition />
        </Typography>
        <div className={classes.cardOuterDiv}>
          {category.map((cat) => {
        
            return (
              <Card className={classes.card}  key={cat.category}>
                <div
                  style={{
                    textAlign: "center",
                    paddingTop: "10px",
                    display: cardChanger(checkFlex, "", "flex"),
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">   {cat.category}</Typography>
                  <Typography className={classes.headcatPostNo}>
                    ({cat.posts})
                  </Typography>
                </div>
                <CardHeader />
                <CardMedia
                  className={classes.media}
                  image={cat.image}
                  title="postpic"
                />
                <div className={classes.exploreAllDiv}>
                  <CardContent>
                    <Typography className={classes.footcatPostNo}>
                      ({cat.posts})
                    </Typography>
                  </CardContent>

                  <CardActions disableSpacing>
                    <Link
                      className={classes.link}
                      to={cat.link}
                      onClick={() => window.scroll(0, 0)}
                    >
                      {" "}
                      Explore All
                    </Link>
                  </CardActions>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Category;
