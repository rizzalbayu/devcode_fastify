const mysql = require('mysql2/promise');
require('dotenv').config();
const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DBNAME,
	port: process.env.MYSQL_PORT || 3306,
});
pool.getConnection();

module.exports.DATABASE = pool;
