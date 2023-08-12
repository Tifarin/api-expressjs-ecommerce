import * as TransactionsRepository from '../repository/transaction.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createTransaction = async (req, res, next) => {
    try {
        const { order_id, payment_method, amount } = req.body;
        const transaction_id = await TransactionsRepository.createTransaction(order_id, payment_method, amount);
        successResponse(res, "Transaction created successfully", { transaction_id });
    } catch (error) {
        next(error);
    }
};

export const getTransactionById = async (req, res, next) => {
    try {
        const transaction_id = req.params.transaction_id;
        const transaction = await TransactionsRepository.getTransactionById(transaction_id);
        if (transaction) {
            successResponse(res, "Transaction retrieved successfully", transaction);
        } else {
            errorResponse(res, "Transaction not found", 404);
        }
    } catch (error) {
        next(error);
    }
};

export const getTransactionsByOrderId = async (req, res, next) => {
    try {
        const order_id = req.params.order_id;
        const transactions = await TransactionsRepository.getTransactionsByOrderId(order_id);
        successResponse(res, "Transactions retrieved successfully", transactions);
    } catch (error) {
        next(error);
    }
};

// Tambahkan fungsi lain seperti update dan delete jika diperlukan
