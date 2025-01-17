import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const databaseInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}/${DB_NAME}`
    );
    console.log(
      `[+] Connected to MongoDB (Host): ${databaseInstance.connection.host}`
    );
  } catch (err) {
    console.error("[-] MongoDB Error", err);
    process.exit(1);
  }
};

export default connectDB;
