// repositories/order.repository.js

import { db } from "../database/database.connection.js";

export async function createOrderDB(userId) {
  const query = "INSERT INTO orders (user_id) VALUES ($1) RETURNING *";
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows[0];
}

export async function getOrderByIdDB(orderId) {
  const query = "SELECT * FROM orders WHERE id = $1";
  const values = [orderId];
  const result = await db.query(query, values);
  return result.rows[0];
}

export async function updateOrderItemDB(orderId, itemId, quantity) {
  const query = "UPDATE order_items SET quantity = $1 WHERE order_id = $2 AND id = $3";
  const values = [quantity, orderId, itemId];
  await db.query(query, values);
}
