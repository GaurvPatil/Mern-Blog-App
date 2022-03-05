import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Loading from "../../Components/Loading";
import { colorChanger } from "../../themeColorChanger/themeColorChange";
import { cardChanger } from "../../cardChanger/cardChanger";
import {  Container, makeStyles, TextField, Tooltip } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { handleSearchAlldata } from "../../CommonPagination/CommonPagination";
import ChangePosition from "../../changePosition/ChangePosition";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostComplited from "../../Components/PostComplited";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const AllPostData = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);
  const checkFlex = useSelector((state) => state.flexReducer);
  const checkDisplay = useSelector((state) => state.ImageToggleReducer);
  const [getData, setGetdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const location = useLocation();
  const [visibility, setVisibility] = useState(false);
  const [visiblePost, setVisiblePost] = useState();
 

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
      flexDirection: "column",

      textAlign: "center",
      alignItems: cardChanger(checkFlex, "", "center"),
      justifyContent: cardChanger(checkFlex, "", "space-between"),
      padding: cardChanger(checkFlex, "", "0 2rem"),
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      display: checkDisplay,
    },
    CardActions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    [theme.breakpoints.down("md")]: {
      card: {
        flexDirection: "column",
        width: cardChanger(checkFlex, 300, "100%"),
        margin: "0",
        padding: cardChanger(checkFlex, "1rem", "0"),
      },
    },
  }));
  const classes = useStyles();

  const fetchingAllData = async (mounted) => {
    try {
      const path = location.pathname;
      const ID = path.substring(10, path.length - 8);
      const getURl = `http://localhost:8080/api/category/posts/${ID}`;
      const { data } = await axios.get(getURl);

      if (mounted) {
        setGetdata([...data.data]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let mounted = true;
    fetchingAllData(mounted);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let array = handleSearchAlldata(search, getData);
  let newArray =
    array.length > 10
      ? array.slice((page - 1) * 10, (page - 1) * 10 + 10)
      : array;

  const deleteRequest = (category, _id) => {
    const result = window.confirm("are you sure");
    if (result) {
      const deleteUrl = `http://localhost:8080/api/category/posts/${category}/${_id}`;
      axios
        .delete(deleteUrl)
        .then(() => {
          const notify = () =>
            toast.success("Post Successfully Deleted!", {
              autoClose: 2000,
            });

          notify();
        })
        .catch((err) => {
          console.log(err);
          const notify = () =>
            toast.error("Server Error!", {
              autoClose: 2000,
            });
          notify();
        });
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Container maxWidth="xl">
        <Container maxWidth="lg">
          <TextField
            label="Search For Title..."
            variant="outlined"
            style={{
              width: "100%",
              marginBottom: "2rem",
              backgroundColor: colorChanger("#fff", "#333", checkTheme),
            }}
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
          />
          <div
            style={{
              textAlign: "center",
            }}
          >
            <ChangePosition />
          </div>
        
        </Container>
        <div className={classes.cardDiv}>
          {newArray.map((post) => {
            const { _id, createdAt, header, category } = post;

            return (
              <Card className={classes.card} key={_id}>
                <CardHeader
                  title={header}
                  subheader={createdAt.substring(0, 10)}
                  className={classes.cardheader}
                />
                <CardMedia
                  className={classes.media} //cover image
                  image={post.coverImage}
                  title="postpic"
                />

                <CardActions disableSpacing className={classes.CardActions}>
                  <Tooltip title="View">
                    <IconButton
                      aria-label="view"
                      onClick={() => {
                        setVisibility(true);
                        setVisiblePost(post);
                        window.scroll(0, 5000)
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Update">
                    <IconButton aria-label="update">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteRequest(category, _id)}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            );
          })}
        </div>
        <ToastContainer />
      </Container>
      <Pagination
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

      {visibility === true && (
        <>
          <PostComplited post={visiblePost} />
         <div style={{textAlign:"center"}}>
         <Tooltip title="Close">
            <IconButton
              aria-label="close"
              onClick={() => {
                setVisibility(false);
                setVisiblePost();
              }}
            >
              <VisibilityOffIcon />
            </IconButton>
          </Tooltip>
         </div>
        </>
      )}
    </>
  );
};

export default AllPostData;
