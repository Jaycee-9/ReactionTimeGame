import Result from "../models/result-schema.js";
import User from "../models/user-schema.js";
export const uploadResults = async (req, res) => {
  try {
    // Prepare the result object
    const result = {
      userId: req.body.userData.userId,
      username: req.body.userData.username,
      time: req.body.result,
    };

    // Create and save the new result
    const newResult = new Result(result);
    await newResult.save();

    return res.status(200).json({ msg: "Result saved successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong while uploading the result" });
  }
};

export const getUserStats = async (req, res) => {
  const { userId } = req.query;

  try {
    const allResult = await Result.find({ userId: userId });
    return res.status(200).json(allResult);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "something went wrong while fetching the user stats" });
  }
};

export const getAllResults = async (req, res) => {
  try {
    const result = await Result.find({});
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "error while fetching posts" });
  }
};

export const getPositions = async (req, res) => {
  try {
    const { userId } = req.query;
    const userIds = userId.split(",");
    const players = await Result.find({ userId: { $in: userIds } });
    const filteredArray = players.filter((score) => score.time > 0);

    const sortedPlayers = filteredArray.sort((a, b) => a.time - b.time);
    return res.status(200).json(sortedPlayers);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "something went wrong while fetching the score board" });
  }
};
