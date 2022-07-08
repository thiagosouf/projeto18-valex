import { Router } from "express";
import { createCard } from "../controllers/cardController.js"

const authRouter = Router();

authRouter.post("/create", createCard);

export default authRouter;