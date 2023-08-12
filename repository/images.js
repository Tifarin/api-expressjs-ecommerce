import dbPool from "../utils/db.js";

export const getData = () => {
    const sql = "SELECT id, product_id, image_url, is_primary, created_at FROM product_images"
    const result = dbPool.query(sql);

    return result;
}

export const getDataByProductId = (productId) => {
    const sql = `SELECT id, product_id, image_url, is_primary, created_at FROM product_images WHERE product_id = ?`
    const result = dbPool.query(sql, [productId]);

    return result;
}

export const addData = async (product_id, image_url) => {
    let created_at = new Date();
    const is_primary = true;
    const sqlUpdateAllProducts = `
       UPDATE product_images
       SET is_primary = 0 where product_id = '${product_id}'
   `;
    const result = dbPool.query(sqlUpdateAllProducts);
    result.then((data) => {
        console.log(data);
    });
    
    const sqlInsertImage = `
        INSERT INTO product_images (product_id, image_url, is_primary, created_at)
        VALUES (?, ?, ?, ?)
    `;
    const insertResult = await dbPool.query(sqlInsertImage, [product_id, image_url, is_primary, created_at]);

    return insertResult;
}


export const updateData = (id, product_id, image_url, is_primary) => {
    let updated_at = new Date();
    const sql = `UPDATE product_images SET product_id =?, image_url =?, is_primary =?, updated_at= ? WHERE id =?`
    const result = dbPool.query(sql, [product_id, image_url, is_primary,updated_at, id]);
    return result;
}

export const deleteData = (id) => {
    const sql = `DELETE FROM product_images WHERE product_id = ?`
    const result = dbPool.query(sql, id);
    return result;
}