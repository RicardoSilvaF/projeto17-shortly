import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function postSignUp(req, res) {
    try {
        const { name, email, password } = req.body;
        const duplicateValidate = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (duplicateValidate.rows[0]) {
            return res.sendStatus(409);
        }
        const passwordBCrypted = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, passwordBCrypted]);

        res.sendStatus(201);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export async function postSignIn(req, res) {
    try {
        const { email, password } = req.body;
        const duplicateValidate = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (!duplicateValidate.rows[0]) {
            return res.sendStatus(401);
        }
        const checkPassword = bcrypt.compareSync(password, duplicateValidate.rows[0].password);
        if (!checkPassword) {
            return res.sendStatus(401);
        }
        else {
            const token = uuid();
            await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2);`, [token, duplicateValidate.rows[0].id]);
            return res.status(200).send({ token });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export async function userProfile(req, res) {
    const { userId } = res.locals.session;

    try {
        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
        if (!user) {
            return res.sendStatus(401);
        }
        const links = await db.query(`SELECT * FROM "shortenedURLs" WHERE "userId" = $1`, [userId]);
        const total_visits = await db.query(`SELECT SUM("visitCounter") AS total_visits FROM "shortenedURLs" WHERE "userId" = $1`, [userId]);
        const linkList = links.rows.map((row) => {
            return {
                id: row.id,
                shortUrl: row.shortenedUrl,
                url: row.url,
                visitCount: row.visitCounter
            }
        })

        const profile = {
            id: userId,
            name: user.rows[0].name,
            visitCount: total_visits.rows[0].total_visits,
            shortenedUrls: linkList
        }
        return res.status(200).send(profile);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}


export async function ranking(req, res) {
    try {
        const { rows } = await db.query(`
          SELECT u.id, u.name, 
          COUNT(s.id) as "linksCount",
          COALESCE(SUM(s."visitCounter"), 0) as "visitCount"
          FROM users u
          LEFT JOIN "shortenedURLs" s ON s."userId" = u.id
          GROUP BY u.id
          ORDER BY "visitCount" DESC
          LIMIT 10
          `)

        return res.send(rows);
    } 
    catch (error) {
        res.status(500).send(error.message);
    }
}
