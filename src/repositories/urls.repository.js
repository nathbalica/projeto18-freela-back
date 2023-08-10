import { db } from "../database/database.connection.js";

export function createUrlsDB(url, shortUrl, userId) {

    const result = db.query(
        `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id, "shortUrl";`,
        [url, shortUrl, userId]
    )
    return result
}

export function getUrlByIdDB(id) {

    const result = db.query(
        `SELECT id, url, "shortUrl" FROM urls WHERE id=$1`,
        [id]
    )
    return result
}

export function getUrlByshortUrlDB(shortUrl) {

    const result = db.query(
        `SELECT url FROM urls WHERE "shortUrl"=$1`,
        [shortUrl]
    )
    return result
}

export function incrementVisitsDB(shortUrl) {

    const result = db.query(
        `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;`,
        [shortUrl]
    )
    return result
}

export function deleteUrlDB(id) {

    const result = db.query(
        `DELETE FROM urls WHERE id=$1`,
        [id]
    )
    return result
}

export function getUserUrlDB(id) {

    const result = db.query(
        `SELECT "userId" FROM urls WHERE id=$1;`,
        [id]
    )
    return result
}