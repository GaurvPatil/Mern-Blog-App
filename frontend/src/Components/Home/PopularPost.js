import {
  CardActions,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import paperimg from "../../images/latestpost.png";
import paperimgdark from "../../images/latestpostdark.png";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { colorChanger } from "../../themeColorChanger/themeColorChange";
import { fetchingPopularOne } from "../PopularOne/popularOne";
import Loading from "../Loading";
import ShareModal from "../ShareModal";
import AlertDialogSlide from "../loginModal";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "2.9rem",
  },

  cardiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    display: "flex",
    width: "45%",
    margin: "1rem",
    padding: "0.5rem",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cardimage: {
    width: "70%",
  },

  [theme.breakpoints.down("md")]: {
    card: {
      width: "100%",
    },
  },

  [theme.breakpoints.down("sm")]: {
    head: {
      fontSize: "2rem",
    },
    card: {
      flexDirection: "column",
    },
    cardimage: {
      display: "none",
    },
  },
}));

const PopularPost = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"));

  const [pop, setPop] = useState([]);
  useEffect(() => {
    let mounted = true;
    fetchingPopularOne(mounted, setPop, setLoading);
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        margin: "2rem",
        padding: "1rem 0",
        borderBottom: colorChanger(
          "2px solid gray",
          "2px solid gold",
          checkTheme
        ),
      }}
    >
      <header className={classes.header}>
        <Typography
          variant="h3"
          style={{ fontWeight: "bold" }}
          className={classes.head}
        >
          Popular Posts &nbsp;{" "}
        </Typography>
        <img
          src={checkTheme === "dark" ? paperimgdark : paperimg}
          alt="icon"
          className={classes.image}
        />
      </header>
      <div className={classes.cardiv}>
        {pop.map((post) => {
          const postUrl = `/category/${post.category}/${post._id}`;
          return (
            <Card className={classes.card} key={post._id}>
              <CardMedia
                className={classes.cardimage}
                image={post.coverImage}
                title="post picture"
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {post.header}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {post.body.intro.substring(0, 50)}...
                    <Typography component={"span"} variant={"body2"}>
                      <Typography component={"span"} variant={"body2"}>
                        <Link
                          to={`/category/${post.category}/${post._id}`}
                          style={{ color: "#1f97bb" }}
                        >
                          {" "}
                          Read More{" "}
                        </Link>
                      </Typography>
                    </Typography>
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
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PopularPost;
