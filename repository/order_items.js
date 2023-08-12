import dbPool from "../utils/db.js";

export const addOrderItem = async (order_id, product_id, quantity, price) => {
    const sql = `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
    `;
    const result = await dbPool.query(sql, [order_id, product_id, quantity, price]);
    return result.insertId;
};

export const getOrderItemsByOrderId = async (order_id) => {
    const sql = `
        SELECT id, order_id, product_id, quantity, price, created_at
        FROM order_items
        WHERE order_id = ?
    `;
    const [rows, fields] = await dbPool.query(sql, [order_id]);
    return rows;
};

export const updateOrderItem = async (item_id, quantity, price) => {
    const sql = `
        UPDATE order_items
        SET quantity = ?, price = ?
        WHERE id = ?
    `;
    const result = await dbPool.query(sql, [quantity, price, item_id]);
    return result;
};

export const deleteOrderItem = async (item_id) => {
    const sql = `DELETE FROM order_items WHERE id = ?`;
    const result = await dbPool.query(sql, [item_id]);
    return result;
};

export const getOrderItemById = async (item_id) => {
    const sql = `
        SELECT id, order_id, product_id, quantity, price, created_at
        FROM order_items
        WHERE id = ?
    `;
    const [rows, fields] = await dbPool.query(sql, [item_id]);
    return rows[0];
};

export const getOrderItemByProductAndOrder = async (product_id, order_id) => {
    const sql = `
        SELECT id, order_id, product_id, quantity, price, created_at
        FROM order_items
        WHERE product_id = ? AND order_id = ?
    `;
    const [rows, fields] = await dbPool.query(sql, [product_id, order_id]);
    return rows[0];
};
