import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenURL(req,res){
    const { url } = req.body;
    const { userId } = res.locals.session;
    const shortenedUrl = nanoid(10);
    try{
        if(!userId){
            return res.sendStatus(401);
        }
        const shortener = await db.query(`INSERT INTO "shortenedURLs" (url, "shortenedUrl", "userId") VALUES ($1, $2, $3) RETURNING id`, [url, shortenedUrl, userId]);
        res.status(201).send({id: shortener.id, shortUrl: shortenedUrl});
    }
    catch(error){
        res.status(500).send(error.message);
    }
}