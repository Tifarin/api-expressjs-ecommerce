import * as CartRepository from '../repository/cart.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const addToCart = async (req, res, next) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        const cart_id = await CartRepository.addToCart(user_id, product_id, quantity);
        successResponse(res, "Item added to cart successfully", { cart_id });
    } catch (error) {
        next(error);
    }
};

export const getCartItemsByUserId = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const cartItems = await CartRepository.getCartItemsByUserId(user_id);
        successResponse(res, "Cart items retrieved successfully", cartItems);
    } catch (error) {
        next(error);
    }
};

export const updateCartItemQuantity = async (req, res, next) => {
    try {
        const cart_id = req.params.cart_id;
        const { newQuantity } = req.body;
        const result = await CartRepository.updateCartItemQuantity(cart_id, newQuantity);
        if (result.affectedRows > 0) {
            successResponse(res, "Cart item quantity updated successfully", result);
        } else {
            errorResponse(res, "Cart item not found", 404);
        }
    } catch (error) {
        next(error);
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const cart_id = req.params.cart_id;
        const result = await CartRepository.removeFromCart(cart_id);
        if (result.affectedRows > 0) {
            successResponse(res, "Item removed from cart successfully", result);
        } else {
            errorResponse(res, "Cart item not found", 404);
        }
    } catch (error) {
        next(error);
    }
};

export const clearCartByUserId = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const result = await CartRepository.clearCartByUserId(user_id);
        successResponse(res, "Cart cleared successfully", result);
    } catch (error) {
        next(error);
    }
};

export const getCartItemByUserAndProduct = async (req, res, next) => {
    try {
        const { user_id, product_id } = req.params;
        const cartItem = await CartRepository.getCartItemByUserAndProduct(user_id, product_id);
        if (cartItem) {
            successResponse(res, "Cart item retrieved successfully", cartItem);
        } else {
            errorResponse(res, "Cart item not found", 404);
        }
    } catch (error) {
        next(error);
    }
};
