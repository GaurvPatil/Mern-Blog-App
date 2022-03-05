import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
const user = JSON.parse(localStorage.getItem("profile"));
export const Likes = ({ post, postLikes }) => {
  if (post.body.likes.length > 0 || postLikes?.body.likes.length > 0) {
    const initial = postLikes ? postLikes?.body.likes : post.body.likes
    return initial.find(
      (like) => like === (user?.result?.googleId || user?.result?._id)
    ) ? (
      <>
        <FavoriteIcon fontSize="small" style={{ color: "red" }} />
        &nbsp;
        {postLikes ? postLikes.body.likes.length : post.body.likes.length}
      </>
    ) : (
      <>
        <FavoriteBorderIcon fontSize="small" style={{ color: "red" }}/>
        &nbsp;{" "}
        {postLikes ? postLikes.body.likes.length : post.body.likes.length}
      </>
    );
  }

  return (
    <>
      <FavoriteBorderIcon fontSize="small" style={{ color: "red" }}/>
      &nbsp;Like
    </>
  );
};
