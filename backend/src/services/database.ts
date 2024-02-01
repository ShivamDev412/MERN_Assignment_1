import mongoose from "mongoose";

const DatabaseService = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (e: any) {
    console.log(e.message);
  }
};

export default DatabaseService;
