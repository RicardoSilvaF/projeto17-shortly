import { db } from "../database/database.connection.js";

export async function authenticate(req, res, next){
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')
    if(!token){
        return res.sendStatus(401);
    }
    try{
        const authenticate = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
        if (!authenticate.rowCount){
            console.log("auth fail");
            return res.sendStatus(401);
        }
        res.locals.session = authenticate.rows[0];
        next();
    }
    catch(error){
        res.status(500).send(error.message);
    }
}