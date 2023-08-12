import dbPool from "../utils/db.js";

export const createTransaction = async (order_id, payment_method, amount) => {
    const sql = `
        INSERT INTO transactions (order_id, payment_method, amount)
        VALUES (?, ?, ?)
    `;
    const result = await dbPool.query(sql, [order_id, payment_method, amount]);
    return result.insertId;
};

export const getTransactionById = async (transaction_id) => {
    const sql = `
        SELECT id, order_id, payment_method, amount, transaction_date, created_at
        FROM transactions
        WHERE id = ?
    `;
    const [rows, fields] = await dbPool.query(sql, [transaction_id]);
    return rows[0];
};

export const getTransactionsByOrderId = async (order_id) => {
    const sql = `
        SELECT id, order_id, payment_method, amount, transaction_date, created_at
        FROM transactions
        WHERE order_id = ?
    `;
    const [rows, fields] = await dbPool.query(sql, [order_id]);
    return rows;
};