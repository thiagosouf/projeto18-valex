import { Router } from "express";
import { createPayment } from "../controllers/paymentController.js";

const paymentRouter = Router();

paymentRouter.post("/payment", createPayment);

export default paymentRouter;