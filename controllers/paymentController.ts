import { Request, Response } from "express";
import { findById } from "../repositories/cardRepository.js";
import { sumRecharge } from "../repositories/rechargeRepository.js";
import { findBusiness } from "../repositories/businessRepository.js";
import { insert } from "../repositories/paymentRepository.js";
import { expiration } from "../utils/sqlUtils.js";

import Cryptr from "cryptr"

const cryptr = new Cryptr('myTotallySecretKey');


export async function createPayment(req: Request,res: Response){
const{
    cardId,
    password,
    idBusinesses,
    amount
} = req.body
//amount deve ser maior que 0
if(amount>0){
const checkPay = await findById(cardId)
const checkBalance = await sumRecharge(cardId)
const checkBusiness = await findBusiness(idBusinesses)

const decryptPassword = cryptr.decrypt(checkPay.password)

if(checkBusiness.length > 0  &&
    checkPay.password!== null &&
   checkPay.isBlocked === false &&
   checkPay.type === checkBusiness[0].type &&
   checkBalance.sum>=amount &&
   !expiration===false &&
   password === decryptPassword
   ){

    const payData = {
        cardId,
        businessId:idBusinesses,
        amount,
        password,
        isBlocked:false
    }
    await insert(payData)
    return res.status(200).send("compra efetuada")
}



}
return res.status(422).send("erro na compra")

}