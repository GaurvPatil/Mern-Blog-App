import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { Link, } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import { useSelector } from "react-redux";
import { cardChanger } from "../cardChanger/cardChanger";
import ChangePosition from "../changePosition/ChangePosition";
import ShareModal from "../Components/ShareModal";
import AlertDialogSlide from "../Components/loginModal";



const CommonPopularDaa = ({ allPostData}) => {
  const checkFlex = useSelector((state) => state.flexReducer);
  const checkDisplay = useSelector((state) => state.ImageToggleReducer);

  const user = JSON.parse(localStorage.getItem("profile"));

  const useStyles = makeStyles((theme) => ({
    cardDiv: {
      display: "flex",
      flexDirection: checkFlex,
      flexWrap: "wrap",
      gap: "1rem",
      alignItems: "center",
      justifyContent: "center",
    },

    card: {
      width: cardChanger(checkFlex, 300, "70%"),
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
    info: {
      display: checkDisplay,
    },
    CardActions: {
      display: "flex",
      justifyContent: "space-between",
    },

    [theme.breakpoints.down("md")]: {
      card: {
        width: cardChanger(checkFlex, 300, "100%"),
        margin: "0",
        padding: cardChanger(checkFlex, "1rem", "0"),
      },
    },
  }));

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl">
        <div
          style={{
            textAlign: "center",
          }}
        >
          <ChangePosition />
        </div>

        <div className={classes.cardDiv}>
          { allPostData.map((post) => {
              let date = new Date(post.createdAt);
              const postUrl = `/category/${post.category}/${post._id}`;
            return (
              <Card className={classes.card} key={post._id}>
              <CardHeader
                title={post.header}
                subheader={` ${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()} `}
                className={classes.cardheader}
              />
              <CardMedia
                className={classes.media}
                image={post.coverImage }
                title="postpic"
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.info}
                >
                  {post.body.intro.substring(0, 50)}...
                </Typography>

                <Typography component={"span"} variant={"body2"}>
                  <Link
                    to={`/category/${post.category}/${post._id}`}
                    style={{
                      color: "#1f97bb",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Read More{" "}
                  </Link>
                </Typography>
              </CardContent>

              <CardActions disableSpacing className={classes.CardActions}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {user?.result ? (
                    <Typography style={{ fontWeight: "bold" }}>
                      {post.body.likes.length}{" "}
                      {post.body.likes.length === 1 ||
                      post.body.likes.length === 0
                        ? "LIKE"
                        : "LIKES"}{" "}
                    </Typography>
                  ) : (
                    <>
                      <AlertDialogSlide likes={post.body.likes.length} />
                    </>
                  )}

                  <IconButton aria-label="share">
                    <ShareModal postUrl={postUrl} />
                  </IconButton>
                </div>
               
              </CardActions>
            </Card>
            );
          })}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default CommonPopularDaa;
