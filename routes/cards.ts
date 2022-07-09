import { Router } from "express";
import { createCard, activationCard, balanceCard } from "../controllers/cardController.js"

const authRouter = Router();

authRouter.post("/create", createCard);
authRouter.post("/activate", activationCard)
authRouter.get("/balance", balanceCard)

export default authRouter;