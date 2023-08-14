import {
    createShoppingCartDB,
    createCartItemDB,
    getCartItemsByCartIdDB,
    updateCartItemDB,
    deleteCartItemDB,
    getCartItemByKittenIdDB,
    getShoppingCartByUserIdDB
} from "../repositories/cart.repository.js";

export async function createShoppingCart(req, res) {
    try {
        const userId = res.locals.userId;
        
        // Verifica se o usuário já possui um carrinho
        const existingCart = await getShoppingCartByUserIdDB(userId);
        
        if (existingCart) {
            res.status(200).json({
                success: true,
                shoppingCart: existingCart
            });
            return;
        }
        
        const result = await createShoppingCartDB(userId);

        res.status(201).json({
            success: true,
            shoppingCart: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro ao criar o carrinho de compras."
        });
    }
}


export async function createCartItem(req, res) {
    try {
        const { cartId, kittenId } = req.body;

        // Converter os valores para números inteiros
        const parsedCartId = parseInt(cartId);
        const parsedKittenId = parseInt(kittenId);

        // Verificar se as conversões foram bem-sucedidas
        if (isNaN(parsedCartId) || isNaN(parsedKittenId)) {
            res.status(400).json({
                success: false,
                message: "Os valores de cartId e kittenId devem ser números inteiros."
            });
            return;
        }

        // Verificar se o item já existe no carrinho
        const cartItemExists = await getCartItemByKittenIdDB(parsedCartId, parsedKittenId);

        if (cartItemExists !== null) {
            res.status(400).json({
                success: false,
                message: "O item já foi adicionado ao carrinho."
            });
            return;
        }

        // Adicionar o novo item ao carrinho
        const result = await createCartItemDB(parsedCartId, parsedKittenId);

        res.status(201).json({
            success: true,
            cartItem: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro ao adicionar o item ao carrinho."
        });
    }
}


export async function getCartItemsByCartId(req, res) {
    try {
        const { cartId } = req.params;
        console.log(cartId)
        const result = await getCartItemsByCartIdDB(cartId);

        res.status(200).json({
            success: true,
            cartItems: result.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro ao obter os itens do carrinho."
        });
    }
}

export async function updateCartItem(req, res) {
    try {
        const itemId = parseInt(req.params.itemId);
        const { quantity } = req.body;

        await updateCartItemDB(itemId, quantity);

        res.status(200).json({
            success: true,
            message: "Item do carrinho atualizado com sucesso."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar o item do carrinho."
        });
    }
}

export async function deleteCartItem(req, res) {
    try {
        const itemId = parseInt(req.params.itemId);

        await deleteCartItemDB(itemId);

        res.status(204).json({
            success: true,
            message: "Item do carrinho excluído com sucesso."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro ao excluir o item do carrinho."
        });
    }
}

export async function deleteCartItemsByCartId(req, res) {
    try {
        const { cartId } = req.params;

        const cartItemsDeleted = await deleteCartItemsByCartIdDB(cartId);

        if (cartItemsDeleted) {
            res.status(204).json({
                success: true,
                message: "Todos os itens do carrinho foram excluídos com sucesso."
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Não foram encontrados itens no carrinho."
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro ao excluir os itens do carrinho."
        });
    }
}
