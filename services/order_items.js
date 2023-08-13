import * as OrderItemsRepository from '../repository/order_items.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const addOrderItem = async (req, res, next) => {
    try {
        const { order_id, product_id, quantity, price } = req.body;
        const item_id = await OrderItemsRepository.addOrderItem(order_id, product_id, quantity, price);
        successResponse(res, "Order item added successfully", { item_id });
    } catch (error) {
        next(error);
    }
};

export const getOrderItemsByOrderId = async (req, res, next) => {
    try {
        const order_id = req.params.order_id;
        const items = await OrderItemsRepository.getOrderItemsByOrderId(order_id);
        successResponse(res, "Order items retrieved successfully", items);
    } catch (error) {
        next(error);
    }
};

export const updateOrderItem = async (req, res, next) => {
    try {
        const item_id = req.params.item_id;
        const { quantity, price } = req.body;
        const result = await OrderItemsRepository.updateOrderItem(item_id, quantity, price);
        if (result[0].affectedRows > 0) {
            successResponse(res, "Order item updated successfully", result.affectedRows);
        } else {
            errorResponse(res, "Order item not found", 404);
        }
    } catch (error) {
        next(error);
    }
};

export const deleteOrderItem = async (req, res, next) => {
    try {
        const item_id = req.params.item_id;
        const result = await OrderItemsRepository.deleteOrderItem(item_id);
        if (result[0].affectedRows > 0) {
            successResponse(res, "Order item deleted successfully", result.affectedRows);
        } else {
            errorResponse(res, "Order item not found", 404);
        }
    } catch (error) {
        next(error);
    }
};

export const getOrderItemById = async (req, res, next) => {
    try {
        const item_id = req.params.item_id;
        const item = await OrderItemsRepository.getOrderItemById(item_id);
        if (item) {
            successResponse(res, "Order item retrieved successfully", item);
        } else {
            errorResponse(res, "Order item not found", 404);
        }
    } catch (error) {
        next(error);
    }
};

export const getOrderItemByProductAndOrder = async (req, res, next) => {
    try {
        const { product_id, order_id } = req.params;
        const item = await OrderItemsRepository.getOrderItemByProductAndOrder(product_id, order_id);
        if (item) {
            successResponse(res, "Order item retrieved successfully", item);
        } else {
            errorResponse(res, "Order item not found", 404);
        }
    } catch (error) {
        next(error);
    }
};
