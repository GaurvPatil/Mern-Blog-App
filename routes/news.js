const router = require('express').Router(); 
const {
  getAllNewsPosts,
  createNewsPost,
  getSingleNewsPost,
  updateNewsPost,
  deleteNewsPost,
} = require("../Controllers/News");

router.route("/news").get(getAllNewsPosts).post(createNewsPost);
router
  .route("/news/:id")
  .get(getSingleNewsPost)
  .patch(updateNewsPost)
  .delete(deleteNewsPost);

module.exports = router;
