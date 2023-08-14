import { db } from "../database/database.connection.js";

export function createKittenDB(name, photo, description, yearOld, breed, weight, localization, price, userId) {
  const query = `
    INSERT INTO kittens (name, photo, description, year_old, breed, weight, localization, price, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id, name, photo, description, year_old, breed, weight, localization, price, user_id, status, created_at;
  `;

  // Define the default value of status as true (status)
  // const status = true;

  const values = [name, photo, description, yearOld, breed, weight, localization, price, userId];

  return db.query(query, values);
}

export function getKittenByIdDB(id) {
  const query = `
    select
    k.*,
    u.phone, 
    u.email from users u
    inner join kittens k 
      on k.user_id = u.id
    where k.id = $1
  `;

  return db.query(query, [id]);
}

export async function getUserKittensDB(userId) {
  const query = `
    SELECT * FROM kittens
    WHERE user_id = $1;
  `;

  return db.query(query, [userId]);
}

export function getAllKittensDB() {
  const query = `
    SELECT id, name, photo, description, year_old, breed, weight, localization, price, status, created_at
    FROM kittens;
  `;

  return db.query(query);
}



export function updateKittenDB(id, name, photo, description, yearOld, breed, weight, localization, price) {
  const query = `
    UPDATE kittens
    SET name = $1, photo = $2, description = $3, year_old = $4, breed = $5, weight = $6, localization = $7, price = $8
    WHERE id = $9;
  `;

  return db.query(query, [name, photo, description, yearOld, breed, weight, localization, price, id]);
}

export function toggleKittenStatusDB(id, status) {
  const query = `
    UPDATE kittens
    SET status = $1
    WHERE id = $2;
  `;

  return db.query(query, [status, id]);
}

export function deleteKittenDB(id) {
  const query = `
    DELETE FROM kittens
    WHERE id = $1;
  `;

  return db.query(query, [id]);
}

export function getUserKittenDB(id) {
  const query = `
    SELECT user_id FROM kittens WHERE id = $1;
  `;

  return db.query(query, [id]);
}
