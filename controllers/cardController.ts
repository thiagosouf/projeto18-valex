import {connection} from "../database.js";
import { Request, Response } from "express";
import { findByTypeAndEmployeeId,
         insert,
         buscarKey,
         findById,
         updateCard,
         updateBlock } from "../repositories/cardRepository.js"
import { findByCardId, sumPayment} from "../repositories/paymentRepository.js"
import { findRechargeId, sumRecharge } from "../repositories/rechargeRepository.js"
import { expiration } from "../utils/sqlUtils.js";
import Cryptr from "cryptr"


const cryptr = new Cryptr('myTotallySecretKey');

export async function createCard(req: Request, res: Response) {
    const {
        employeeId,
        number,
        cardholderName,
        password,
        isVirtual,
        originalCardId,
        isBlocked,
        type
    } = req.body;
    let {securityCode} = req.body
    const apiKey = req.header("x-api-key");
    
    const checkKey = await buscarKey(apiKey,employeeId)
    if(checkKey>0){
        
        const findTypeEmployee = await findByTypeAndEmployeeId(type, employeeId)
        if(findTypeEmployee){res.send("Já possui o Cartão")}

        const m = String (new Date().getMonth()+1).padStart(2,'0');
        const y = String (new Date().getFullYear()-1995).padStart(2,'0');
        const expirationDate = m+"/"+y

        securityCode = cryptr.encrypt(securityCode);

        const cardData = {
            employeeId,
            number,
            cardholderName,
            securityCode,
            expirationDate,
            password,
            isVirtual,
            originalCardId,
            isBlocked,
            type
        }
        const insertCard = await insert(cardData)


    } else {
        console.log("Usuario não encontrado!")
    }
    
    console.log(apiKey)

    res.json(apiKey);
}

export async function activationCard(req: Request, res: Response){
    const {
        id,
        securityCode
    } = req.body;
    let {password} = req.body;

    

    const checkCard = await findById(id)
    console.log(checkCard)
    if(!checkCard){res.send("Cartão inválido!")}
    const cvc = cryptr.decrypt(checkCard.securityCode)
    console.log(securityCode, cvc)
    console.log(!expiration)
    console.log(checkCard.password)
    if(securityCode === cvc && (!expiration===false) && (checkCard.password === null) && (password.length === 4)){
        password = cryptr.encrypt(password);
        await updateCard(id, password)
        console.log("Dados VaLIDOS")
    }
    else{console.log("Dados Inválidos")}

res.json(id);
}

export async function balanceCard(req: Request, res: Response){
    const {
        id,
        number,
        securityCode,
        password
    } = req.body;

    const checkCard = await findById(id)
    console.log(checkCard)
    const cvc = cryptr.decrypt(checkCard.securityCode)
    const decryptPassword = cryptr.decrypt(checkCard.password)
    if(!checkCard && (securityCode !== cvc) && (password !== decryptPassword) && (number !== checkCard.number)){res.send("Cartão inválido!")} //trocar 
    const transactions = await findByCardId(id);
    const recharges = await findRechargeId(id);
    const amountPay = await sumPayment(id);
    const amountRecharge = await sumRecharge(id);


    const pay = Object.values(amountPay).join()
    const recharge = Object.values(amountRecharge).join()
    const balance = parseInt(recharge) - parseInt(pay)
    console.log(balance)


    const result = {"balance":balance, transactions, recharges}

    res.json(result);
}

export async function blockCard(req: Request, res: Response){
    const {
        id,
        password
    } = req.body;

    const checkCard = await findById(id)
    const decryptPassword = cryptr.decrypt(checkCard.password)
    if ((checkCard)  && (password === decryptPassword) && (!expiration===false) && (checkCard.isBlocked === false)){
        const result = await updateBlock(id, true)
        res.json(result)
    }
    else{res.json(id)}
}

export async function desBlockCard(req: Request, res: Response){
    const {
        id,
        password
    } = req.body;

    const checkCard = await findById(id)
    const decryptPassword = cryptr.decrypt(checkCard.password)
    if ((checkCard)  && (password === decryptPassword) && (!expiration===false) && (checkCard.isBlocked === true)){
        const result = await updateBlock(id, false)
        res.json(result)
    }
    else{res.json(id)}
}