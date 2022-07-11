import { Router } from "express";
import { createRecharge } from "../controllers/rechargeController.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge", createRecharge);

export default rechargeRouter;