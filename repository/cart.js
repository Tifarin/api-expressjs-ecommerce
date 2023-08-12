import dbPool from "../utils/db.js";

export const addToCart = async (user_id, product_id, quantity) => {
    const sql = `
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES (?, ?, ?)
    `;
    const result = await dbPool.query(sql, [user_id, product_id, quantity]);
    return result.insertId;
};

export const getCartItemsByUserId = async (user_id) => {
    const sql = `
        SELECT id, user_id, product_id, quantity, created_at
        FROM cart
        WHERE user_id = ?
    `;
    const [rows, fields] = await dbPool.query(sql, [user_id]);
    return rows;
};

export const updateCartItemQuantity = async (cart_id, newQuantity) => {
    const sql = `
        UPDATE cart
        SET quantity = ?
        WHERE id = ?
    `;
    const result = await dbPool.query(sql, [newQuantity, cart_id]);
    return result;
};

export const removeFromCart = async (cart_id) => {
    const sql = `DELETE FROM cart WHERE id = ?`;
    const result = await dbPool.query(sql, [cart_id]);
    return result;
};

export const clearCartByUserId = async (user_id) => {
    const sql = `DELETE FROM cart WHERE user_id = ?`;
    const result = await dbPool.query(sql, [user_id]);
    return result;
};

export const getCartItemByUserAndProduct = async (user_id, product_id) => {
    const sql = `
        SELECT id, user_id, product_id, quantity, created_at
        FROM cart
        WHERE user_id = ? AND product_id = ?
    `;
    const [rows, fields] = await dbPool.query(sql, [user_id, product_id]);
    return rows[0];
};
