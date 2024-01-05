import { instance } from "../server.js"
import crypto from "crypto"
import { payment } from "../model/paymentModel.js";

export const checkout = async( req , res) => {
    var options = {
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      const order = await instance.orders.create(options)
      console.log(order)
      res.status(200).json({
        success: true,
        order
      })
}

export const paymentVerification = async( req , res) => {
  console.log(req.body)
  const {razorpay_payment_id , razorpay_order_id , razorpay_signature} = req.body

  const body = razorpay_order_id  + "|" + razorpay_payment_id

  const expectedSignature = crypto.createHmac('sha256' , process.env.RAZORPAY_API_SECRET)
                            .update(body.toString())
                            .digest('hex');

                            // console.log("expectedSignature" , expectedSignature)
                            // console.log("razorpay_signature" , razorpay_signature)

  // var response = {"signatureIsValid": "false"} 
  if (expectedSignature === razorpay_signature) {
    await payment.create({
      razorpay_payment_id ,
       razorpay_order_id ,
        razorpay_signature
    })
    res.redirect(
      `http://localhost:3001/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false
    });
  }

  
    // var options = {
    //     amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
    //     currency: "INR",
    //     receipt: "order_rcptid_11"
    //   };
    //   const order = await instance.orders.create(options)
    //   console.log(order)
      res.status(200).json({
        success: true,
        // order
      })
}