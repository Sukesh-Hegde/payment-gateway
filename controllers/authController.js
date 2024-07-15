const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({ name, email, password_hash: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: "24h",
    });

    res.status(201).send({ auth: true, token });
  } catch (err) {
    res.status(500).send("There was a problem registering the user.");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: "24h",
    });

    res.status(200).send({ auth: true, token });
  } catch (err) {
    res.status(500).send("There was a problem logging in the user.");
  }
};
