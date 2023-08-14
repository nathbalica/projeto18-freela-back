import express from "express";
import { createOrder, getOrderById, updateOrderItem } from "../controllers/order.controller.js";
import { validateAuth } from "../middlewares/users.middlewares.js";

const orderRouter = express.Router();

orderRouter.post("/order", validateAuth, createOrder);
orderRouter.get("/:orderId", getOrderById);
orderRouter.patch("/:orderId/items/:itemId", validateAuth, updateOrderItem);

export default orderRouter;
