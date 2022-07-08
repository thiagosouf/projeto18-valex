import  { Router } from 'express';
import cards from "./cards.js";

const router = Router();

router.use(cards);


export default router;