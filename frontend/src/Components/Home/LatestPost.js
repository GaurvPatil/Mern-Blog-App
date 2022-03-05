import React, { useEffect, useState } from "react";
import paperimg from "../../images/latestpost.png";
import paperimgdark from "../../images/latestpostdark.png";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import ShareModal from "../ShareModal";



import axios from "axios";
import AlertDialogSlide from "../loginModal";


const LatestPost = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);

  // style
  const useStyles = makeStyles((theme) => ({
    outerDiv: {
      padding: "1rem 0",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    // carousel div
    carousel: {
      fontFamily: "sans-serif",
      padding: "1rem",
      "-webkit-touch-callout": "none" /* iOS Safari */,
      "-webkit-user-select": "none" /* Safari */,
      "-khtml-user-select": "none" /* Konqueror HTML */,
      "-moz-user-select": "none" /* Old versions of Firefox */,
      "-ms-user-select": "none" /* Internet Explorer/Edge */,
      "user-select": "none" /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */,
    },
    // card style
    card: {
      maxWidth: 300,
      maxHeight: 450,
      margin: "1rem",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    image: {
      height: "2.9rem",
    },
    CardActions: {
      display: "flex",
      justifyContent: "space-between",
    },

    // laptops desktop 960
    [theme.breakpoints.down("lg")]: {
      card: {
        width: 250,
      },
    },

    //   767  big tablets
    [theme.breakpoints.down("md")]: {
      card: {
        maxHeight: 500,
      },
    },

    //   500  small tablets
    [theme.breakpoints.down("sm")]: {
      container: {
        width: "80%",
      },
    },

    //  320  phones
    [theme.breakpoints.down("xs")]: {
      container: {
        width: "100%",
      },
      carousel: {
        paddingLeft: "2.5rem",
      },
      card: {
        maxWidth: 230,
      },
    },
  }));

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"));



  const [latestPost, setLatesPost] = useState([]);

  const fetchLatestData = async (mounted) => {
    try {
      const cryptoLatest = await axios.get(
        "http://localhost:8080/api/category/posts/latestposts/crypto"
      );
      const spritualLatest = await axios.get(
        "http://localhost:8080/api/category/posts/latestposts/spritual"
      );
      const lfLatest = await axios.get(
        "http://localhost:8080/api/category/posts/latestposts/lifestyle&fashion"
      );

      if (mounted) {
        setLatesPost([
          ...latestPost,
          ...cryptoLatest.data.data,
          ...spritualLatest.data.data,
          ...lfLatest.data.data,
        ]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;

    fetchLatestData(mounted);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  if (loading) {
    <Loading />;
  }
  const items = latestPost.map((post) => {
    const postUrl = `/category/${post.category}/${post._id}`;
    let date = new Date(post.createdAt);

    return (
      <Card className={classes.card} key={post._id}>
        <CardHeader
          title={post.category}
          subheader={` ${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()} `}
        />
        <CardMedia
          className={classes.media}
          image= { post.coverImage  }
          title="postpic"
        />
        <CardContent>
          <Typography component={"span"} variant={"body2"}>
            {post.header}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.body.intro.substring(0, 50)}...
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
                {post.body.likes.length === 1 || post.body.likes.length === 0
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
  });

  const responsive = {
    0: {
      items: 1,
    },

    767: {
      items: 2,
    },
    965: {
      items: 3,
    },
    1250: {
      items: 4,
    },
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <div className={classes.outerDiv}>
        <header className={classes.header}>
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            Latest Posts &nbsp;{" "}
          </Typography>
          <img
            src={checkTheme === "dark" ? paperimgdark : paperimg}
            alt="icon"
            className={classes.image}
          />
        </header>

        <div className={classes.carousel}>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={2000}
            animationDuration={1500}
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
          />
        </div>
      </div>
    </Container>
  );
};

export default LatestPost;
