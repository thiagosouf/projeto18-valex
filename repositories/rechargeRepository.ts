import { connection } from "../database.js";

export interface Recharge {
  id: number;
  cardId: number;
  timestamp: Date;
  amount: number;
  password: string;
  sum: number;
}
export type RechargeInsertData = Omit<Recharge, "id" | "timestamp">;

export async function findRechargeId(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
    `SELECT * FROM recharges WHERE "cardId"=$1`,
    [cardId]
  );

  return result.rows;
}

export async function insert(rechargeData: RechargeInsertData) {
  const { cardId, amount } = rechargeData;

  connection.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
    [cardId, amount]
  );
}

export async function sumRecharge(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
`SELECT SUM(amount) 
FROM recharges
WHERE "cardId"=$1`,
[cardId] 
)
return result.rows[0];
};

export async function findRechardId(apiKey:string, idCard:number){
  const result = await connection.query<Recharge, [string, number]>(`
  select cards.*, companies.name from employees
  join companies on employees."companyId" = companies.id
  join cards on employees.id = cards."employeeId"
  where "apiKey" = $1
  and cards.id = $2`, [apiKey,idCard])

  return result.rows
}