import {
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Footer from "../Components/Footer/Footer";
import { useSelector } from "react-redux";
import { colorChanger } from "../themeColorChanger/themeColorChange";
import { Pagination } from "@material-ui/lab";
import { handleSearchAlldata } from "../CommonPagination/CommonPagination";
import ChangePosition from "../changePosition/ChangePosition";
import { cardChanger } from "../cardChanger/cardChanger";
import ShareModal from "../Components/ShareModal";
import AlertDialogSlide from "../Components/loginModal";
import { Link, } from "react-router-dom";

const CommonAllData = ({  allPostData }) => {
  const checkFlex = useSelector((state) => state.flexReducer);
  const checkDisplay = useSelector((state) => state.ImageToggleReducer);
  const checkTheme = useSelector((state) => state.themeChangeReducer);

  const useStyles = makeStyles((theme) => ({
    pagination: {
      "& .MuiPaginationItem-root": {
        color: colorChanger("black", "gold", checkTheme),
      },
    },

    //   change Positions

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

  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const post  = allPostData
  const user = JSON.parse(localStorage.getItem("profile"));

  let array = handleSearchAlldata(search, post);

  let newArray =
    array.length > 10
      ? array.slice((page - 1) * 10, (page - 1) * 10 + 10)
      : array;

  return (
    <>
      <Container maxWidth="xl">
        <Container maxWidth="lg">
          <TextField
            label="Search For Title..."
            variant="outlined"
            style={{
              width: "100%",
              marginBottom: "1rem",
              backgroundColor: colorChanger("#fff", "#333", checkTheme),
            }}
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
          />
        </Container>

        <div
          style={{
            textAlign: "center",
          }}
        >
          <ChangePosition />
        </div>

        <div className={classes.cardDiv}>
          {newArray.map((post) => {
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

      {/* pagination from material ui  */}
      <Pagination
        // count for number line array = 100 , 100/10 = 10 if division in float to fixed fix it
        // ex = 0.5 = 1 and parseint change string to int bcz count only takes integer not string
        count={parseInt((array.length / 10).toFixed(0))}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        // after clicking on pagination number this number is change set
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 100);
        }}
      />

      <Footer />
    </>
  );
};

export default CommonAllData;
