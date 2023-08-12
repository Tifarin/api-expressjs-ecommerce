import * as OrderRepository from '../repository/order.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createOrder = async (req, res, next) => {
    try {
        const { user_id, status } = req.body;
        const order_id = await OrderRepository.createOrder(user_id, status);
        successResponse(res, "Order created successfully", { order_id });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const order_id = req.params.order_id;
        const order = await OrderRepository.getOrderById(order_id);
        if (order) {
            successResponse(res, "Order found", order);
        } else {
            errorResponse(res, "Order not found", 404);
        }
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const order_id = req.params.order_id;
        const { newStatus } = req.body;
        const result = await OrderRepository.updateOrderStatus(order_id, newStatus);
        if (result.affectedRows > 0) {
            successResponse(res, "Order status updated successfully", result);
        } else {
            errorResponse(res, "Order not found", 404);
        }
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const order_id = req.params.order_id;
        const result = await OrderRepository.deleteOrder(order_id);
        if (result.affectedRows > 0) {
            successResponse(res, "Order deleted successfully", result);
        } else {
            errorResponse(res, "Order not found", 404);
        }
    } catch (error) {
        next(error);
    }
};
