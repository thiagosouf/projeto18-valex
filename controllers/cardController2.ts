// import { Request, Response } from "express";
// import { findByCardId, sumPayment} from "../repositories/paymentRepository.js"
// import { findRechargeId, sumRecharge } from "../repositories/rechargeRepository.js"
// import { expiration } from "../utils/cardUtils.js";
// import * as cardService from "../services/cardService.js"

// export async function createCard(req: Request, res: Response) {
//     const {
//         employeeId,
//         number,
//         cardholderName,
//         password,
//         isVirtual,
//         originalCardId,
//         isBlocked,
//         type
//     } = req.body;
//     let {securityCode} = req.body
//     const apiKey = req.header("x-api-key");
    
//     await cardService.findKey(apiKey, employeeId)
//     await cardService.cardByTypeAndEmployee(type, employeeId)

//         const expirationDate : string = cardService.generateExpirationDate();

//     securityCode = cardService.encryptSecurityCode(securityCode)
//         const cardData = {
//             employeeId,
//             number,
//             cardholderName,
//             securityCode,
//             expirationDate,
//             password,
//             isVirtual,
//             originalCardId,
//             isBlocked,
//             type
//         }    

//         await cardService.insertNewCard(cardData)

//         res.sendStatus(201);
// }

// export async function activationCard(req: Request, res: Response){
//     const {
//         id,
//         securityCode
//     } = req.body;
//     let {password} = req.body;

    

//     const checkCard = await cardService.findId(id)

//     const cvc = cardService.decryptSecurityCode(checkCard.securityCode)
//     if(securityCode === cvc && (!expiration===false) && (checkCard.password === null) && (password.length === 4)){
//         password = cardService.encryptSecurityCode(password)

//         cardService.updateCard
//         res.sendStatus(201);
//     }
//     else{res.sendStatus(401)}
// }

// export async function balanceCard(req: Request, res: Response){
//     const {
//         id,
//         number,
//         securityCode,
//         password
//     } = req.body;

//     const checkCard = await cardService.findId(id)
//     const cvc = cardService.decryptSecurityCode(checkCard.securityCode)
//     const decryptPassword = cardService.decryptSecurityCode(checkCard.password)
//     if(!checkCard && (securityCode !== cvc) && (password !== decryptPassword) && (number !== checkCard.number)){res.send("Cartão inválido!")} //trocar 
//     const transactions = await findByCardId(id);
//     const recharges = await findRechargeId(id);
//     const amountPay = await sumPayment(id);
//     const amountRecharge = await sumRecharge(id);


//     const pay = Object.values(amountPay).join()
//     const recharge = Object.values(amountRecharge).join()
//     const balance = parseInt(recharge) - parseInt(pay)
//     console.log(balance)


//     const result = {"balance":balance, transactions, recharges}

//     res.sendStatus(201);
// }

// export async function blockCard(req: Request, res: Response){
//     const {
//         id,
//         password
//     } = req.body;
//     console.log("1")
//     const checkCard = await cardService.findId(id)
//     console.log(checkCard)
//     const decryptPassword = cardService.decryptSecurityCode(checkCard.password)
//     if ((checkCard)  && (password === decryptPassword) && (!expiration===false) && (checkCard.isBlocked === false)){
//         const result = await cardService.blockCard(id)
//         res.sendStatus(201);
//     }
//     else{res.sendStatus(401);}
// }

// export async function desBlockCard(req: Request, res: Response){
//     const {
//         id,
//         password
//     } = req.body;

//     const checkCard = await cardService.findId(id)
//     const decryptPassword = cardService.decryptSecurityCode(checkCard.password)
//     if ((checkCard)  && (password === decryptPassword) && (!expiration===false) && (checkCard.isBlocked === true)){
//         const result = await cardService.deslockCard(id)
//         res.sendStatus(201);
//     }
//     else{res.sendStatus(401);}
// }