const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'cityscout_user',
    password: 'password',
    database: 'cityscoutdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL");
        connection.release();
    }
});

module.exports = db;
