import {
    createOrderDB,
    getOrderByIdDB,
    updateOrderItemDB
} from "../repositories/order.repository.js";

export async function createOrder(req, res) {
    try {
        const userId = res.locals.userId;
        console.log(userId)
        const order = await createOrderDB(userId);
        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating order."
        });
    }
}

export async function getOrderById(req, res) {
    try {
        const { orderId } = req.params;
        const order = await getOrderByIdDB(orderId);
        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error getting order."
        });
    }
}

export async function updateOrderItem(req, res) {
    try {
        const { orderId, itemId } = req.params;
        const { quantity } = req.body;
        await updateOrderItemDB(orderId, itemId, quantity);
        res.status(200).json({
            success: true,
            message: "Order item updated successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating order item."
        });
    }
}
