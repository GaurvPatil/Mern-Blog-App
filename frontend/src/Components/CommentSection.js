import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Box } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { commentPostAction } from "../Pages/Authenticate/actions/commentPostAction";
import AlertDialogSlide from "./loginModal";

const CommentSection = ({ post }) => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);

  const useStyles = makeStyles((theme) => ({
    media: {
      borderRadius: "20px",
      objectFit: "cover",
      width: "100%",
      maxHeight: "600px",
    },
    card: {
      display: "flex",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
        flexDirection: "column",
      },
    },
    section: {
      borderRadius: "20px",
      margin: "10px",
      flex: 1,
    },
    imageSection: {
      marginLeft: "20px",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
    recommendedPosts: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    loadingPaper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      borderRadius: "15px",
      height: "39vh",
    },
    commentsOuterContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      justifyContent: "space-between",
    },

    commentsInnerContainer: {
      height: "200px",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: 7,
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: checkTheme === "light" ? "aqua" : "gold",
        outline: `1px solid slategrey`,
      },
    },
  }));

  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.body.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const finalComment = `${user?.result?.name}:${comment}`;

    const newComments = await dispatch(
      commentPostAction(finalComment, post._id, post.category)
    );
    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div style={{ width: "100%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          {user?.result?.name ? (
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          ) : (
          
             <AlertDialogSlide  comment={ comment.length }/>
           
          )}
        </div>
        <Box className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {
          comments?.map((c, i) => {
         
            return(
            <Typography key={i} gutterBottom variant="subtitle1">
              
              <strong>{c.split(":")[0]}</strong> : &nbsp;
              {c.split(":")[1]}
            </Typography>
          )}
          
          )
          }
          <div ref={commentsRef} />
        </Box>
      </div>
    </div>
  );
};

export default CommentSection;
