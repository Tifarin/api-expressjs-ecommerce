import dbPool from "../utils/db.js";

export const getData = () => {
    const sql = "SELECT id, name, created_at FROM categories"
    const result = dbPool.query(sql);

    return result;
}

export const getDataById = (id) => {
    const sql = `
        SELECT
            p.id,
            p.name AS product_name,
            p.description,
            p.price,
            p.stock,
            p.created_at,
            c.name AS category_name
        FROM
            products p
        JOIN
            categories c ON p.category_id = c.id
        WHERE
            p.category_id = ?
    `;
    const result = dbPool.query(sql, [id]);

    return result;
}

export const getDataByName = (name) => {
    const sql = `
        SELECT
            c.id AS category_id,
            c.name AS category_name,
            p.id AS product_id,
            p.name AS product_name,
            p.description,
            p.price,
            p.stock,
            p.created_at AS product_created_at
        FROM
            categories c
        JOIN
            products p ON c.id = p.category_id
        WHERE
            c.name = ?
    `;
    const result = dbPool.query(sql, [name]);

    return result;
}

export const addData = (name) => {
    let createdAt = new Date();
    const sql = "INSERT INTO categories (name, created_at) VALUE(?, ?)"
    const value = [name, createdAt]

    return dbPool.query(sql, value);
}

export const updateData = (name, id) => {
    let updatedAt = new Date();
    const sql = "UPDATE categories SET name = ?, updated_at = ? WHERE id = ?";
    const value = [name, updatedAt, id];
    
    return dbPool.query(sql, value);
}

export const deleteData= (id) => {
    const sql = "DELETE FROM categories WHERE id = ?";
    const value = [id];

    return dbPool.query(sql, value);
}