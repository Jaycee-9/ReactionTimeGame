import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const result = mongoose.model("results", resultSchema);
export default result;
