const router = require("express").Router();
const {
  getAllLFPosts,
  createLFPosts,
  getSingleLFPosts,
  updateLFPost,
  deleteLFPost,
  likePost,
  latestPost,
  commentPost,
  lfCount,
  lfPopularOne,
  privatePopular,
} = require("../Controllers/Lifestyle&Fashion");
const auth = require("../middlewares/auth")

router.route("/lifestyle&fashion").get(getAllLFPosts).post(createLFPosts);
router
  .route("/lifestyle&fashion/:id")
  .get(getSingleLFPosts)
  .patch(updateLFPost)
  .delete(deleteLFPost);

  router.route("/lifestyle&fashion/:id/likepost").patch(auth, likePost)
  router.route("/lifestyle&fashion/:id/commentpost").patch(auth, commentPost)
  router.route("/latestposts/lifestyle&fashion").get(latestPost)
  router.route("/lifestyle&fashion/count").post(lfCount)
  router.route("/lifestyle&fashion/popularone").post(lfPopularOne)
  router.route("/lifestyle&fashion/privatepopular").post(privatePopular)

module.exports = router;
