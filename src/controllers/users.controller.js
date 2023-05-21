import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function postSignUp (req,res){
    try{
        const {name, email, password} = req.body;
        const duplicateValidate = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if(duplicateValidate.rows[0]){
            return res.sendStatus(409);
        }
        const passwordBCrypted = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, passwordBCrypted]);

        res.sendStatus(201);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}