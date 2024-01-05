import {app} from "./app.js"
import razorPay from "razorpay"
import { connectDB } from "./config/database.js";

connectDB()
 

export const instance = new razorPay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });



app.listen(process.env.PORT , () => {
    console.log(`connected ${process.env.PORT}` )
})