import dbPool from "../utils/db.js";

export const getData = () => {
    const sql = "SELECT id, name, price, created_at FROM products"
    const result = dbPool.query(sql);

    return result;
}

export const getDataById = (id) => {
    const sql = `
        SELECT
            p.id,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.created_at,
            c.name AS category
        FROM
            products p
        JOIN
            categories c ON p.category_id = c.id
        WHERE
            p.id = ?
    `;
    const result = dbPool.query(sql, [id]);

    return result;
}

export const addData = (name, description, price, stock, category_id) => {
    let created_at = new Date();
    const sqlCheckCategory = `
        SELECT id
        FROM categories
        WHERE id = ?
    `;
    const categoryCheckResult = dbPool.query(sqlCheckCategory, [category_id]);

    if (categoryCheckResult.length === 0) {
        return "Category ID not found in the database.";
    }

    const sqlInsertProduct = `
        INSERT INTO products (name, description, price, stock, created_at, category_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = dbPool.query(sqlInsertProduct, [name, description, price, stock, created_at, category_id]);
    return result;
}

export const updateData = (id, name, description, price, stock, category_id) => {
    const sqlCheckCategory = `
        SELECT id
        FROM categories
        WHERE id = ?
    `;
    const categoryCheckResult = dbPool.query(sqlCheckCategory, [category_id]);

    if (categoryCheckResult.length === 0) {
        return "Category ID not found in the database.";
    }

    const sqlUpdateProduct = `
        UPDATE products
        SET name = ?, description = ?, price = ?, stock = ?, category_id = ?
        WHERE id = ?
    `;
    const result = dbPool.query(sqlUpdateProduct, [name, description, price, stock, category_id, id]);
    return result;
}

export const deleteData = (id) => {
    const sql = ` DELETE FROM products WHERE id = ? `;
    const result = dbPool.query(sql, [id]);
    return result;
}
