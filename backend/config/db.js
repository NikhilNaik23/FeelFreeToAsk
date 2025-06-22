import mongoose from "mongoose";
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB connection error");
    process.exit(1);
  }
};

export default connect;
