import { Request, Response } from "express";
import { razorpay } from "../lib/razorpay";
import { prisma } from "../db/prisma";
import { logger } from "../utils/logger";
import crypto from "crypto"

export const createOrder = async (req: Request, res: Response) => {
    try {

        const { name, email, phone, event_id, amount } = req.body;

        const registration = await prisma.registration.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                event_id: String(event_id)
            }
        });

        const order = await prisma.order.create({
            data: {
                amount: req.body.amount,
                registration_id: registration.id
            }
        })

        const razorpayOrder = await razorpay.orders.create({
            amount: req.body.amount * 100,
            currency: 'INR',
            receipt: order.id
        });

        await prisma.order.update({
            where: { id: order.id },
            data: {
                razorpay_order_id: razorpayOrder.id
            }
        })

        res.status(200).json({
            razorpay_order_id: razorpayOrder.id,
            order_id: order.id,
            amount: req.body.amount,
        })
    } catch (err) {
        logger.error("PAYMENT", "Error processing payment");
        res.status(400).send("Not able to create order. Please try again!");
    }
}

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string).update(body.toString()).digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            await prisma.payment.create({
                data: {
                    order_id: order_id,
                    razorpay_payment_id: razorpay_payment_id,
                    razorpay_signature: razorpay_signature,
                    status: "SUCCESS"
                }
            })

            const updatedOrder = await prisma.order.update({
                where: { id: order_id },
                data: { status: "PAID" }
            });

            await prisma.registration.update({
                where: { id: updatedOrder.registration_id },
                data: { status: "CONFIRMED" }
            });

            res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (err) {
        logger.error("PAYMENT", "Error verifying payment signature");
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}