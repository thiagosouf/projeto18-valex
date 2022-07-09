import { Router } from "express";
import { createCard, activationCard, balanceCard, blockCard, desBlockCard } from "../controllers/cardController.js"

const authRouter = Router();

authRouter.post("/create", createCard);
authRouter.post("/activate", activationCard)
authRouter.get("/balance", balanceCard)
authRouter.post("/block", blockCard)
authRouter.post("/desblock", desBlockCard)

export default authRouter;