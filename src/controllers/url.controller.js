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

export async function getUrlById(req,res){
    const { id } = req.params;

    try{
        const search = await db.query(`SELECT * FROM "shortenedURLs" WHERE id = $1`, [id]);

        if(search.rowCount === 0){
            return res.sendStatus(404);
        }

        res.status(200).send({ id: id, shortUrl: search.rows[0].shortenedUrl, url: search.rows[0].url});
    }
    catch(error){
        res.status(500).send(error.message);
    }
}