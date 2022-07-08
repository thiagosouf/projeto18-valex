
import { Request, Response } from "express";

export async function createCard(req: Request, res: Response) {
    
    const apiKey = req.header("x-api-key");
    
    
    console.log(apiKey)

    res.json(apiKey);
}