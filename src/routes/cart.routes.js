import express from "express";
import {
  createShoppingCart,
  createCartItem,
  getCartItemsByCartId,
  updateCartItem,
  deleteCartItem,
  deleteCartItemsByCartId
} from "../controllers/cart.controller.js";
import { validateAuth } from "../middlewares/users.middlewares.js";

const cartRouter = express.Router();

cartRouter.post("/cart", validateAuth, createShoppingCart);
cartRouter.post("/addCart", validateAuth, createCartItem);
cartRouter.get("/items/:cartId", getCartItemsByCartId);
cartRouter.put("/itemCart/:itemId", validateAuth, updateCartItem);
cartRouter.delete("/itemCart/:itemId", validateAuth, deleteCartItem);
cartRouter.delete("/cart/:cartId/items", validateAuth, deleteCartItemsByCartId);

export default cartRouter;
