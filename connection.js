import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://tventertainment06:5LvZh64XPC2EZZQv@cluster0.lrhi6v5.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if unable to connect
  }
};

const obj = {
  connectDB,
  connection: mongoose.connection,
  mongoose: mongoose, // Export the Mongoose connection object
};

const user = mongoose.Schema({ user: "string" });
const userSchema = mongoose.model("user", user);

export const getUser = async () => {
  return userSchema.find({ name: "prajal" }).then((res)=>{
    // console.log(res);
    return res;
  })
}
export default obj;
