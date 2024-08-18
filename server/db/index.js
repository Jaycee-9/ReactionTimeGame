import mongoose from "mongoose";

const connectToDb = async () => {
  await mongoose.connect(process.env.dataBaseConnection);
  console.log("database connected successfully");
};

export default connectToDb;
