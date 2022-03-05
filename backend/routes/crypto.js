
const router = require('express').Router(); 
const {
  getAllCryptoPosts,
  createCryptoPost,
  getSingleCryptoPost,
  updateCryptoPost,
  deleteCryptoPost,
  likePost,
  latestPost,
  commentPost,
  cryptoCount,
  cryptoPopularOne,
  privatePopular,
  
} = require("../Controllers/Crypto");
const auth = require("../middlewares/auth")

router.route("/crypto").get(getAllCryptoPosts).post(createCryptoPost);
router
  .route("/crypto/:id")
  .get(getSingleCryptoPost)
  .patch(updateCryptoPost)
  .delete(deleteCryptoPost);
  router.route("/crypto/:id/likepost").patch(auth, likePost)
  router.route("/crypto/:id/commentpost").patch(auth, commentPost)
  router.route("/latestposts/crypto").get(latestPost)
  router.route("/crypto/count").post(cryptoCount)
  router.route("/crypto/popularone").post(cryptoPopularOne)
  router.route("/crypto/privatepopular").post(privatePopular)

module.exports = router;
