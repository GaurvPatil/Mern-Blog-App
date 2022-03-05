const router = require('express').Router(); 

const {
    getAllSpritualPosts,
    createSpritualPost,
    getSingleSpritualPost,
    updateSpritualPost,
    deleteSpritualPost,
    likePost,
    latestPost,
    commentPost,
    spritualCount,
    spritualPopularOne,
    privatePopular,
} = require("../Controllers/Spritual")
const auth = require("../middlewares/auth")


router.route("/spritual").get(getAllSpritualPosts).post(createSpritualPost);
router.route("/spritual/:id").get(getSingleSpritualPost).patch(updateSpritualPost).delete(deleteSpritualPost);
router.route("/spritual/:id/likepost").patch(auth, likePost)
router.route("/spritual/:id/commentpost").patch(auth, commentPost)
router.route("/latestposts/spritual").get(latestPost)
router.route("/spritual/count").post( spritualCount)
router.route("/spritual/popularone").post(spritualPopularOne)
router.route("/spritual/privatepopular").post(privatePopular)

module.exports = router;