import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'toko_db',
    port: 3306
});

export default dbPool