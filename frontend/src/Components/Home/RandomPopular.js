import {
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { colorChanger } from "../../themeColorChanger/themeColorChange";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PopularPost from "./PopularPost";
import Loading from "../Loading";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchingPostCounts, categoryArr } from "../PostCount/postCount"

const RandomPopular = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);

  const useStyles = makeStyles((theme) => ({
    Container: {
      display: "flex",
      flexDirection: "column",
    },
    newspostDiv: {
      display: "flex",
      flexDirection: "row",
      fontFamily: "sans-serif",
    },
    newsDiv: {
      width: "70%",
      height: "50%",
      padding: "2rem",
      borderRight: "2px solid gray",
      borderImage:
        "linear-gradient(to bottom, rgba(0,0,0,0) 1%,rgba(0,0,0,1) 25%,rgba(0,0,0,1) 80%,rgba(0,0,0,0) 5%)",
      borderImageSlice: 1,
    },
    image: {
      width: "70%",
      height: "50%",
    },

    readmore: {
      color: "#1f97bb",
      cursor: "pointer",
      fontWeight: "bold",
    },

    // aside

    asideCategory: {
      padding: "2rem",
    },
    cathead: {
      fontWeight: "bold",
      height: "10%",
    },
    link: {
      color: colorChanger("black", "white", checkTheme),
    },
    category: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.5rem",
      marginTop: "2rem",
      width: "210px",
      borderRadius: "5px",
      border: colorChanger("2px solid black", "2px solid gold", checkTheme),
      backgroundColor: colorChanger("#a4e5af", "#212121", checkTheme),
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
      transition: "0.4s",
      "&:hover": {
        background:
          " radial-gradient(circle, rgba(255, 255, 255, 0.15) 1%, transparent 1%) ",
      },
    },

    [theme.breakpoints.down("sm")]: {
      newspostDiv: {
        flexDirection: "column",
      },
      newsDiv: {
        width: "100%",
        borderImage: "none",
        borderRight: "none",
        borderBottom: colorChanger(
          "2px solid black",
          "2px solid gold",
          checkTheme
        ),
      },
    },
  }));

  let navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [postCount, setPostCount] = useState([0, 0, 0]);
  const category = categoryArr(postCount);

  const classes = useStyles();

  const [news, setNews] = useState();
  const [loading, setLoading] = useState(true);

  const fetchingAllCryptoData = async (mounted) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/posts/news"
      );

      if (mounted) {
        setNews([...data.data]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    fetchingPostCounts(mounted, setPostCount , setLoading);
    fetchingAllCryptoData(mounted);
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container
      maxWidth="xl"
      style={
        {
          // background: "red",
        }
      }
    >
      <Container maxWidth="lg" className={classes.Container}>
        <div className={classes.newspostDiv}>
          <div className={classes.newsDiv}>
            <Typography>{news[0].createdAt.substring(0, 10)}</Typography>
            <img src={news[0].coverImage} alt="newspic" className={classes.image} />
            <Typography variant="h6">{news[0].title}</Typography>
            <Typography variant={"body2"}>
              {news[0].body.intro}...
              <Link to={`/news/${news[0]._id}`} className={classes.readmore}>
                Read More
              </Link>
            </Typography>
          </div>

          <aside className={classes.asideCategory}>
            <Typography variant="h4" className={classes.cathead}>
              Categories
            </Typography>

            {category.map((cat) => {
              return (
                <div
                  key={cat.category}
                  className={classes.category}
                  onClick={() => {
                    navigate(cat.link, { replace: true });
                    window.scroll(0, 0);
                  }}
                >
                  {" "}
                  <span>
                    <Link
                      to={cat.link}
                      onClick={() => window.scroll(0, 0)}
                      className={classes.link}
                    >
                      {cat.category}
                    </Link>
                  </span>{" "}
                  <span> ( {cat.posts} )</span>
                </div>
              );
            })}
          </aside>
        </div>
      </Container>

      <PopularPost />

      <Container maxWidth="lg" className={classes.Container}>
        {/* second news post  */}

        <div className={classes.newspostDiv}>
          <div className={classes.newsDiv}>
            <Typography>{news[1].createdAt.substring(0, 10) }</Typography>
            <img src={news[1].coverImage} alt="newspic" className={classes.image} />
            <Typography variant="h6">{news[1].title}</Typography>
            <Typography variant={"body2"}>
              {news[1].body.intro}...
              <Link to={`/news/${news[1]._id}`} className={classes.readmore}>
                Read More
              </Link>
            </Typography>
          </div>
          <aside className={classes.asideCategory}>
            <Typography variant="h4" className={classes.cathead}>
              Newsletter
            </Typography>

            <TextField
              label="Email..."
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              type="email"
              style={{
                width: "210px",
                marginTop: "1rem",
              }}
            />

            <div
              className={classes.category}
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
              <span
                className={classes.link}
                style={{
                  letterSpacing: "3px",
                }}
              >
                SUBSCRIBE
              </span>
              <ArrowForwardIosIcon />
            </div>
          </aside>
        </div>
      </Container>
      <ToastContainer />
    </Container>
  );
};

export default RandomPopular;
