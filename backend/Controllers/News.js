const news = require("../modules/newsSchema");

const getAllNewsPosts = async(req, res) => {
  try {
    const data = await news.find({});
    res.status(201).json({ data, length: data.length });
  } catch (error) {
    //server error status code
    res.status(500).json({ msg: error });
  }
};

const createNewsPost = async(req, res) => {
  try {
    const data = await news.create(req.body);
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleNewsPost = async(req, res) => {
  try {
    const { id: postID } = req.params;
    const data = await news.findOne({ _id: postID });
    if (!data) {
      return res.status(404).json({ msg: `No Post With ID: ${postID}` });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateNewsPost = async(req, res) => {
  try {
    const { id: postID } = req.params;
    const data = await news.findOneAndUpdate({ _id: postID }, req.body, {
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

const deleteNewsPost = async(req, res) => {
  try {
    const { id: postID } = req.params;
    const data = await news.findOneAndDelete({ _id: postID });
    if (!data) {
      return res.status(404).json({ msg: `No Post With ID: ${postID}` });
    }
    res.status(200).json({ data: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllNewsPosts,
  createNewsPost,
  getSingleNewsPost,
  updateNewsPost,
  deleteNewsPost,
};
