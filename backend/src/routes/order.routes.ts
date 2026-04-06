import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/order.controller";

const router = Router();

router.post("/orders", createOrder);

router.post("/verify", verifyPayment);

export default router;