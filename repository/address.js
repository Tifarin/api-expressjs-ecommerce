import dbPool from "../utils/db.js";

export const getData = () => {
    const sql = "SELECT id, user_id, street_address, city, postal_code, created_at FROM address"
    const result = dbPool.query(sql);

    return result;
}

export const getDataByIdUser = (id) => {
    const sql = "SELECT id, user_id, street_address, city, postal_code, created_at FROM address WHERE user_id = ?"
    const result = dbPool.query(sql, [id]);

    return result;
}

export const addData = (user_id, street_address, city, postal_code) => {
    let created_at = new Date();
    const sqlCheckUser = `
        SELECT id
        FROM users
        WHERE id = ?
    `;
    const userCheckResult = dbPool.query(sqlCheckUser, [user_id]);

    if (userCheckResult.length === 0) {
        return "User ID not found in the database.";
    }

    const sql = `
        INSERT INTO address (user_id, street_address, city, postal_code, created_at)
        VALUES (?, ?, ?, ?, ?)
    `;
    const result = dbPool.query(sql, [user_id, street_address, city, postal_code, created_at]);
    return result;
}

export const updateData = (id,  street_address, city, postal_code) => {
    const sql = `
        UPDATE address
        SET street_address = ?, city = ?, postal_code = ?
        WHERE id = ?
    `;
    const result = dbPool.query(sql, [ street_address, city, postal_code, id]);
    return result;
}

export const deleteData = (id) => {
    const sql = ` DELETE FROM address WHERE id = ? `;
    const result = dbPool.query(sql, [id]);
    return result;
}
