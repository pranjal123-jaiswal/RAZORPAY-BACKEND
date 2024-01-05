import express from "express";
import { config } from "dotenv"
import { checkout , paymentVerification } from "./Controller/paymentController.js";
import PaymentRoute from "./routes/paymentRoutes.js"
import cors from "cors"

config({path : "./config/config.env"})

export const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/api/getKey" , (req , res) => {
    res.status(200).json({key: process.env.RAZORPAY_API_KEY})

})

app.post("/checkout", checkout)
app.post("/paymentVerification" , paymentVerification)

app.use("/api" , PaymentRoute.route)