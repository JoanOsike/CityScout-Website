const mysql = require("mysql2");
require("dotenv").config();

// ChatGpt was used for help when implementing singletone pattern

class Db {
    static pool = null;

    constructor(){
        if (!Db.pool){
            Db.pool = mysql.createPool({
                host: '127.0.0.1',
                user: 'cityscout_user',
                password: 'password',
                database: 'cityscoutdb',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
            });

            Db.pool.getConnection((err, connection) => {
                if (err) {
                    console.error("Database connection failed:", err);
                } else {
                    console.log("Connected to MySQL");
                    connection.release();
                }
            });
        }
    }

    static getPool() {
        return Db.pool;
    }
}
new Db();
module.exports = Db;
