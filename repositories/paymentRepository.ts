import { connection } from "../database.js";

export interface Payment {
  id: number;
  cardId: number;
  businessId: number;
  timestamp: Date;
  amount: number;
  password: string;
  isBlocked: boolean;
}
export type PaymentWithBusinessName = Payment & { businessName: string };
export type PaymentInsertData = Omit<Payment, "id" | "timestamp">;

export async function findByCardId(cardId: number) {
  const result = await connection.query<PaymentWithBusinessName, [number]>(
    `SELECT 
      payments.*,
      businesses.name as "businessName"
     FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
     WHERE "cardId"=$1
    `,
    [cardId]
  );

  return result.rows;
}

export async function insert(paymentData: PaymentInsertData) {
  const { cardId, businessId, amount } = paymentData;

  connection.query<any, [number, number, number]>(
    `INSERT INTO payments ("cardId", "businessId", amount) VALUES ($1, $2, $3)`,
    [cardId, businessId, amount]
  );
}

export async function sumPayment(cardId: number) {
  const result = await connection.query<Payment, [number]>(
`SELECT SUM(amount) AS total
FROM payments
WHERE "cardId"=$1`,
[cardId] 
)
return result.rows[0];
};

export async function findPayment(cardId:number, idBusinesses:number){
  const result = await connection.query<Payment, [number, number]>(
    `
    select cards.password, cards."isBlocked" from payments
    join cards on cards.id = payments."cardId"
    join businesses on businesses.id = payments."businessId"
    where "cardId" = $1
    and "businessId" = $2`,[cardId, idBusinesses]
  )
  return result.rows[0];

}