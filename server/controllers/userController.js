import User from "../models/user-schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res) => {
  const username = await User.findOne({ username: req.body.username });

  if (username) {
    return res.status(409).json({ msg: "User already exist!" });
  }

  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: req.body.username,
      password: hashPassword,
    };

    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "something went wrong while signing up the user!" });
  }
};

export const userLogin = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(404).json({ msg: "user not found...!" });
  }

  try {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(user.toJSON(), process.env.jwtPrivateKey, {
        expiresIn: "15m",
      });
      return res.status(200).json({
        accessToken: accessToken,
        username: user.username,
        userId: user._id,
      });
    } else {
      return res.status(400).json({ msg: "invalid credentials" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "something went wrong while logging the user!" });
  }
};
