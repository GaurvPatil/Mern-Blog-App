import { Container, makeStyles, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Loading from "../../../Components/Loading";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const useStyles = makeStyles((theme) => ({
  cardDiv: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: 300,
    maxHeight: 480,
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  CardActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const AllNewsPostData = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [getData, setGetdata] = useState([]);
  

  const fetchingAllData = async (mounted) => {
    try {
      const getURl = `http://localhost:8080/api/category/posts/news`;
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
    <Container className={classes.container}>
      {getData.map((news) => {
        const { _id, createdAt, category } = news;
        return (
          <Card className={classes.card} key={_id}>
            <CardHeader
              title="News"
              subheader={createdAt.substring(0, 10)}
              className={classes.cardheader}
              style={{ textAlign: "center" }}
            />
            <CardMedia
              className={classes.media} //cover image
              image={news.coverImage}
              title="postpic"
            />

            <CardActions disableSpacing className={classes.CardActions}>
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
      <ToastContainer />
    </Container>
  );
};

export default AllNewsPostData;
