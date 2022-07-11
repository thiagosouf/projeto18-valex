import { Request, Response } from "express";
import { findRechardId, insert } from "../repositories/rechargeRepository.js";
import { expiration } from "../utils/sqlUtils.js";

export async function createRecharge(req: Request, res: Response){
    const apiKey = req.header("x-api-key");
    const { cardId, amount } = req.body

    const checkKey = await findRechardId(apiKey,cardId)
    if(checkKey.length>0 && checkKey[0].password !== null && !expiration===false){
        const result = await insert(req.body)
        const status = "Recarga efetuda"
        
    } else {
    return res.status(400).send('erro de premissão')
    }
    return res.status(200).send('Recarga efetuada');
}