import { Request, Response } from "express";
import { razorpay } from "../lib/razorpay";
import { prisma } from "../db/prisma";
import { logger } from "../utils/logger";

export const createOrder = async (req: Request, res: Response) => {

    try {
        const registration = await prisma.registration.create({
            data: {
                name: "Test User",
                email: "Test Email",
                phone: "999999999",
                event_id: "2"
            }
        })

        const order = await prisma.order.create({
            data: {
                amount: req.body.amount,
                registration_id: registration.id
            }
        })

        const razorpayOrder = await razorpay.orders.create({
            amount: req.body.amount,
            currency: 'INR',
            receipt: order.id
        });

        await prisma.order.update({
            where: { id: order.id },
            data: {
                razorpay_order_id: razorpayOrder.id
            }
        })

        res.json({
            razorpay_order_id: razorpayOrder.id, 
            order_id: order.id,
            amount: req.body.amount,
        })
    } catch (err) {
        logger.error("PAYMENT", "Error processing payment");
        res.status(400).send("Not able to create order. Please try again!");
    }
}