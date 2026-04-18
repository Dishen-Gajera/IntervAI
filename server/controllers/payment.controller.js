import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import razorpay from "../services/razorpay.service.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
console.log("come");
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "User not login" });
        }
        const { amount, planId, credits } = req.body;

        if (!amount || !credits || !planId) {
            return res.status(400).json({ message: "Invalid plan data" });
        }
        const option = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }
        const order = await razorpay.orders.create(option);

        await Payment.create({
            amount: amount,
            credits,
            planId,
            razorpayOrderId: order.id,
            status: "created",
            userId: req.userId
        });

        return res.status(200).json(order);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Fail to create order ${error}` });

    }

}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
            return res.status(400).json({message:"Missing some information"})
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");

        if (razorpay_signature !== expectedSignature) {
            return res.status(400).json({ message: "Invalid Payment Signature" })
        }

        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
        if (!payment) {
            return res.status(400).json({ message: "Payment not found" });
        }
        if (payment.status === "paid") {
            return res.status(400).json({ message: "Already Processed" });
        }
        payment.status = "paid";
        payment.razorpayPaymentId = razorpay_payment_id;
        await payment.save();

        const updateUser = await User.findByIdAndUpdate(payment.userId, { $inc: { credits: payment.credits } }, { new: true });

        return res.status(200).json({
            success:true,
            message:"payment varify and credit added",
            user:updateUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Fail to varify Rozer Payment ${error}` });
    }

} 