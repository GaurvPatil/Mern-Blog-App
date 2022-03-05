const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("../modules/adminSchema");
require("dotenv").config();

const signin = async (req, res) => {
  const { adminName, password } = req.body;

  try {
    const existingUser = await admin.findOne({ adminName });

    if (!existingUser)
      return res.status(404).send({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).send({ message: "Invalid credentials" });

    res.status(200).json({ message: "Welcome" });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
};

const signup = async (req, res) => {
  const { adminName, password } = req.body;

  try {
    const existingUser = await admin.findOne({ adminName });

    if (existingUser)
      return res.status(404).send({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await admin.create({
      adminName,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      { expiresIn: "54151564514584145645156h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).send({ message: "Server error" });

    console.log(error);
  }
};

module.exports = {
  signin,
  signup,
};
