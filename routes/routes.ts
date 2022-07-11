import  { Router } from 'express';
import cards from "./cards.js";
import recharge from './recharge.js';
import payment from './payment.js'

const router = Router();

router.use(cards);
router.use(recharge);
router.use(payment)


export default router;