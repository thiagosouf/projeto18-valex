import { buscarKey, findById, insert, updateBlock } from "../repositories/cardRepository.js";
import Cryptr from "cryptr"

const cryptr = new Cryptr('myTotallySecretKey');

export async function findKey(apikey:string,employeeId:number){
    const card = await buscarKey(apikey,employeeId)
    if (card) throw {type : "unauthorized", message : "Não é possivel realizar essa operação"}
    return;
}

export async function cardByTypeAndEmployee(apikey:string,employeeId:number){
    const card = await buscarKey(apikey,employeeId)
    if (card) throw {type : "conflict", message : "O empregado já possui esse cartão"}
    return;
}

export function generateExpirationDate(){
    const m = String (new Date().getMonth()+1).padStart(2,'0');
    const y = String (new Date().getFullYear()-1995).padStart(2,'0');
    const expirationDate = m+"/"+y
    return expirationDate
}

export function encryptSecurityCode(securityCode:string) {
    securityCode = cryptr.encrypt(securityCode);
    return securityCode
}

export function decryptSecurityCode(securityCode:string){
    securityCode = cryptr.decrypt(securityCode)
    return securityCode
}

export async function insertNewCard(cardData) {
    const insertCard = await insert(cardData)
    return;
}

export async function findId(id:number) {
    const card = await findById(id)
    if (card) throw {type : "notFound", message:"Cartão não encontrado"}
    return card
}

export async function updateCard(id:number, password: string) {
    const card = await updateCard(id, password)
    return;
}

export async function blockCard(id:number){
    const card = await updateBlock(id,true)
    if (card) throw {type: "conflict", message:"Este cartão já está bloqueado"}
    return;
}

export async function deslockCard(id:number){
    const card = await updateBlock(id,false)
    if (card) throw {type: "conflict", message:"Este cartão já está desbloqueado"}
    return;
}