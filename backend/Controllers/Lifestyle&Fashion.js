const { lfPost } = require("../modules/postSchema");
const mongoose = require("mongoose");

const getAllLFPosts = async (req, res) => {
  try {
    const data = await lfPost.find({});
    res.status(201).json({ data, length: data.length });
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

const createLFPosts = async (req, res) => {
  try {
    const data = await lfPost.create(req.body);
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleLFPosts = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const data = await lfPost.findOne({ _id: postID });
    if (!data) {
      return res.status(404).json({ msg: `No Post With ID: ${postID}` });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateLFPost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const data = await lfPost.findOneAndUpdate({ _id: postID }, req.body, {
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

const deleteLFPost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const data = await lfPost.findOneAndDelete({ _id: postID });
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

    const post = await lfPost.findById(id);

    const index = post.body.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.body.likes.push(req.userId);
    } else {
      post.body.likes = post.body.likes.filter(
        (id) => id !== String(req.userId)
      );
    }
    const updatedPost = await lfPost.findByIdAndUpdate(id, post, {
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

    const post = await lfPost.findById(id);

    post.body.comments.push(value);

    const updatedPost = await lfPost.findByIdAndUpdate(id, post, {
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
    const data = await lfPost.find({}).sort({ $natural: -1 }).limit(2);

    res.status(201).json({ data });
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

const lfCount = async (req, res) => {
  try {
    const data = await lfPost.find({}).countDocuments();
    res.status(201).json({ data });
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

const lfPopularOne = async (req, res) => {
  try {
    const data = await lfPost.find({});
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

    const data = await lfPost.find({});
    const arr = displayPopular(data);
    res.status(201).json({ arr });
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};




module.exports = {
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
  privatePopular
};
