import axios from "axios";
import spritual from "../../images/spritual.jpg"
import crypto from "../../images/btc.jpg"
import fashion from "../../images/fashion.jpg"

export const categoryArr = (postCount) => {
  const arr = [
    {
      category: "Spritual",
      link: "/category/spritual/allpost",
      posts: postCount[0],
      image:spritual
    },
    {
      category: "Fashion & Lifestyle",
      link: "/category/lifestyle/allpost",
      posts: postCount[1],
      image:fashion
    },
    {
      category: "Crypto",
      link: "/category/crypto/allpost",
      posts: postCount[2],
      image:crypto
    },
  ];
  return arr;
};

export const fetchingPostCounts = async (mounted, setPostCount , setLoading) => {
  try {
    const cryptoPostCount = await axios.post(
      "http://localhost:8080/api/category/posts/crypto/count"
    );

    const spritualPostCount = await axios.post(
      "http://localhost:8080/api/category/posts/spritual/count"
    );

    const lfPostCount = await axios.post(
      "http://localhost:8080/api/category/posts/lifestyle&fashion/count"
    );

    if (mounted) {
      setPostCount([
        spritualPostCount.data.data,

        lfPostCount.data.data,

        cryptoPostCount.data.data,
      ]);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};
