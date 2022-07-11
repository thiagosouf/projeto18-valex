import { connection } from "../database.js";
import { TransactionTypes } from "./cardRepository.js";

export interface Business {
  id: number;
  name: string;
  type: TransactionTypes;
}

export async function findBusiness(id: number) {
  const result = await connection.query<Business, [number]>(
    "SELECT * FROM businesses WHERE id=$1",
    [id]
  );

  return result.rows;
}

export async function findBusinessType(id:number, type:TransactionTypes){
  const result = await connection.query<Business, [number, TransactionTypes]>(
    `select * from businesses 
     where id=$1 
     and type=$2`,[id,type]
  );

  return result.rows;
}