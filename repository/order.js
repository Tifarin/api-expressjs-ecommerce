import dbPool from "../utils/db.js";

export const createOrder = async (user_id, status) => {
    const order_date = new Date();
    const sql = `
        INSERT INTO orders (user_id, order_date, status)
        VALUES (?, ?, ?)
    `;
    const result = await dbPool.query(sql, [user_id, order_date, status]);
    return result.insertId;
};

export const getOrderById = async (order_id) => {
    const sql = `
        SELECT id, user_id, order_date, status, created_at
        FROM orders
        WHERE id = ?
    `;
    const [rows, fields] = await dbPool.query(sql, [order_id]);
    return rows[0];
};

export const updateOrderStatus = async (order_id, status) => {
    const sql = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `;
    const result = await dbPool.query(sql, [status, order_id]);
    return result;
};

export const deleteOrder = async (order_id) => {
    const sql = `DELETE FROM orders WHERE id = ?`;
    const result = await dbPool.query(sql, [order_id]);
    return result;
};
