import express from "express";

import { checkout , paymentVerification } from "../Controller/paymentController.js";

const router = express.Router()

router.get("/" , (req , res) => {
    res.json({
        success: true    })
});

router.post("/checkout", checkout)
router.post("/paymentVerification", paymentVerification)
// console.log("hi123")   

export default router;