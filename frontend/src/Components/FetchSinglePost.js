import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import PostComplited from "./PostComplited";
import { useParams } from "react-router-dom";
import { Likes } from "./Likes";
import AlertDialogSlide from "./loginModal";
import { Button, CardActions, Container, IconButton } from "@material-ui/core";
import ShareModal from "./ShareModal";
import { useDispatch } from "react-redux";
import { likePostAction } from "../Pages/Authenticate/actions/likePostAction";
import CommentSection from "./CommentSection";

const FetchSinglePost = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState();
  const params = useParams();
  const postUrl = `/category/${post?.category}/${post?._id}`;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
const [like , setLike] = useState()
  const fetchingPost = async (mounted) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/category/posts/${params.categoryname}/${params.id}`
      );

      if (mounted) {
        setPost(data.data);
        setLike(data.data)
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    fetchingPost(mounted);
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Container maxWidth="lg" style={{ marginBottom: "5rem " }}>
      <PostComplited post={post} />
      <div style={{ margin: "3rem 0" }}>
        <CardActions disableSpacing>
          {user?.result ? (
            <Button
              size="small"
              color="primary"
              disabled={!user?.result}
            
              onClick={async() => {
                if (user.result) {
                 const newLike = await dispatch(likePostAction(post._id, post.category));
                  setLike(newLike)
                  
                }
              }}
              style={{
                fontWeight: "bold",
              }}
            >
              <Likes  postLikes = {like} post = {post}/>
            </Button>
          ) : (
            <>
              <AlertDialogSlide likes={post.body.likes.length} />
            </>
          )}

          <IconButton aria-label="share">
            <ShareModal postUrl={postUrl} />
          </IconButton>
        </CardActions>
      </div>
      <CommentSection post={post} />
    </Container>
  );
};

export default FetchSinglePost;
