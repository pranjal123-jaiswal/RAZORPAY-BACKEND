import mongoose from "mongoose";

export const connectDB = async() => {
  const {connection} = await mongoose.connect(process.env.Mongoose_URL)
  console.log(`connection is establish ${connection.host}`)
}