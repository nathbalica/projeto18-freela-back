import { db } from "../database/database.connection.js";

export function createShoppingCartDB(userId) {
  const query = `
    INSERT INTO shopping_cart (user_id)
    VALUES ($1)
    RETURNING id, user_id, created_at;
  `;

  return db.query(query, [userId]);
}

// export function getShoppingCartByUserIdDB(userId) {
//   const query = `
//     SELECT id, user_id, created_at
//     FROM shopping_cart
//     WHERE user_id = $1;
//   `;

//   return db.query(query, [userId]);
// }

export function createCartItemDB(cartId, kittenId) {
  const query = `
    INSERT INTO cart_items (shopping_cart_id, kitten_id)
    VALUES ($1, $2)
    RETURNING id, shopping_cart_id, kitten_id, created_at;
  `;

  return db.query(query, [cartId, kittenId]);
}


export function getCartItemsByCartIdDB(cartId) {
  const query = `
    SELECT ci.id, ci.kitten_id, k.name, k.price
    FROM cart_items ci
    INNER JOIN kittens k ON ci.kitten_id = k.id
    WHERE shopping_cart_id = $1;
  `;

  return db.query(query, [cartId]);
}

export async function getShoppingCartByUserIdDB(userId) {
  const query = `
      SELECT id, user_id, created_at
      FROM shopping_cart
      WHERE user_id = $1;
  `;

  return db.query(query, [userId])
      .then(result => {
          if (result.rows.length > 0) {
              return result.rows[0];
          }
          return null; // Retorna null se não encontrar um carrinho associado ao usuário
      })
      .catch(error => {
          throw error;
      });
}

export async function getCartItemByKittenIdDB(cartId, kittenId) {
  const query = `
    SELECT id, shopping_cart_id, kitten_id, created_at
    FROM cart_items
    WHERE shopping_cart_id = $1 AND kitten_id = $2;
  `;

  const result = await db.query(query, [cartId, kittenId]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

export function updateCartItemDB(itemId, quantity) {
  const query = `
    UPDATE cart_items
    SET quantity = $1
    WHERE id = $2;
  `;

  return db.query(query, [quantity, itemId]);
}

export function deleteCartItemDB(itemId) {
  const query = `
    DELETE FROM cart_items
    WHERE id = $1;
  `;

  return db.query(query, [itemId]);
}

export async function deleteCartItemsByCartIdDB(cartId) {
  const query = `
      DELETE FROM cart_items
      WHERE shopping_cart_id = $1;
  `;

  try {
      await db.query(query, [cartId]);
      return true; // Return success if the items were deleted
  } catch (error) {
      console.error(error);
      throw new Error("Error deleting cart items from the database.");
  }
}






