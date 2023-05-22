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

export async function getShortened(req,res){
    const { shortUrl } = req.params;
    try{
        const search = await db.query(`SELECT * FROM "shortenedURLs" WHERE "shortenedUrl" = $1`, [shortUrl]);
        if (search.rowCount === 0){
            return res.sendStatus(404);
        }

        await db.query(`UPDATE "shortenedURLs" SET "visitCounter" = "visitCounter" + 1 WHERE "shortenedUrl" = $1`, [shortUrl]);
        return res.redirect(search.rows[0].url);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}

export async function deleteUrl(req,res){
    const { id } = req.params;
    const { userId } = res.locals.session;
    try{
        if(!userId){
            return res.sendStatus(401);
        }
        const urlTable = await db.query(`SELECT * FROM "shortenedURLs" WHERE id = $1`, [id]);
        if(!urlTable.rows[0].userId){
            return res.sendStatus(404);
        }
        if(urlTable.rows[0].userId !== userId){
            return res.sendStatus(401);
        }

        await db.query(`DELETE FROM "shortenedURLs" WHERE id = $1`, [id]);
        return res.sendStatus(204);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}