import { Router } from "express";
import { createCard, activationCard } from "../controllers/cardController.js"

const authRouter = Router();

authRouter.post("/create", createCard);
authRouter.post("/activate", activationCard)

export default authRouter;