import { db } from "../database/database.connection.js";

export function createUserDB(name, cpf, phone, email, password) {
    return db.query(
        `INSERT INTO users (name, cpf, phone, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [name, cpf, phone, email, password]
    );
}


export function getEmailUserDB(email){
    const result = db.query(`SELECT * FROM users where email=$1;`, [email])
    return result
}

export function userDataDB(userId){
    const result = db.query(`
        SELECT
            u.id AS id,
            u.name AS name,
            SUM(ur."visitCount") AS "visitCount",
            JSON_AGG(
                JSON_BUILD_OBJECT(
                'id', ur.id,
                'shortUrl', ur."shortUrl",
                'url', ur.url,
                'visitCount', ur."visitCount"
                )
            ) AS "shortenedUrls"
        FROM
            users u
            inner JOIN urls ur ON u.id = ur."userId"
            WHERE u.id=$1
            GROUP BY
            u.id, u.name
    `, [userId])
    return result
}

export function rankingUsersDB(){
    const result = db.query(`
        SELECT
            u.id AS id,
            u.name AS name,
            COALESCE(SUM(ur."visitCount"), 0) AS "linksCount",
            COALESCE(SUM(ur."visitCount"), 0) AS "visitCount"
        FROM
            users u
        LEFT JOIN urls ur ON u.id = ur."userId"
        GROUP BY
            u.id, u.name
        ORDER BY
            COALESCE(SUM(ur."visitCount"), 0) DESC
        LIMIT 10;
  
    `)
    return result
}