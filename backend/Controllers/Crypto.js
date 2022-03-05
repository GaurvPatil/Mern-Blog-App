const { cryptoPost } = require("../modules/postSchema");
const mongoose = require("mongoose");

const getAllCryptoPosts = async (req, res) => {
  try {
    const data = await cryptoPost.find({});
    res.status(201).json({ data, length: data.length });
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

const createCryptoPost = async (req, res) => {
  try {
    const data = await cryptoPost.create(req.body);
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleCryptoPost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const data = await cryptoPost.findOne({ _id: postID });
    if (!data) {
      return res.status(404).json({ msg: `No Post With ID: ${postID}` });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateCryptoPost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const data = await cryptoPost.findOneAndUpdate({ _id: postID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      return res.status(404).json({ msg: `No Post With ID: ${postID}` });
    }
    res.status(200).json({ id: postID, data: req.body });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteCryptoPost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const data = await cryptoPost.findOneAndDelete({ _id: postID });
    if (!data) {
      return res.status(404).json({ msg: `No Post With ID: ${postID}` });
    }
    res.status(200).json({ data: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const post = await cryptoPost.findById(id);

    const index = post.body.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.body.likes.push(req.userId);
    } else {
      post.body.likes = post.body.likes.filter(
        (id) => id !== String(req.userId)
      );
    }
    const updatedPost = await cryptoPost.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const post = await cryptoPost.findById(id);

    post.body.comments.push(value);

    const updatedPost = await cryptoPost.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

const latestPost = async (req, res) => {
  try {
    const data = await cryptoPost.find({}).sort({ $natural: -1 }).limit(2);

    res.status(201).json({ data });
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

const cryptoCount = async (req, res) => {
  try {
    const data = await cryptoPost.find({}).countDocuments();
    res.status(201).json({ data });
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

const cryptoPopularOne = async (req, res) => {
  try {
    const data = await cryptoPost.find({});
    const popular = data.reduce((max, curr) => {
      if (curr.body.likes.length > max.body.likes.length) {
        max = curr;
      }
      return max;
    }, data[0]);

    res.status(201).json({ popular });
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

const privatePopular = async (req, res) => {
  try {
    const displayPopular = (data) => {
      let first, second, third;
      if (data.length < 3) {
        res.status(201).json({ msg: "no Popular post yet" });
      }
      third = first = second = 0;

      for (let i = 0; i < data.length; i++) {
        const likes = data[i].body.likes.length;
        if (likes > first) {
          third = second;
          second = first;
          first = data[i];
        } else if (likes > second) {
          third = second;
          second = data[i];
        } else if (likes > third) {
          third = data[i];
        }
      }

      return [first, second, third];
    };

    const data = await cryptoPost.find({});
    const arr = displayPopular(data);
    res.status(201).json({ arr });
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

module.exports = {
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
};
