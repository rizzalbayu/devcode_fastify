const mysql = require('mysql2/promise');
require('dotenv').config();
const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});
con.connect(function (err) {
	console.log('test');
	if (err) throw err;
	console.log('Connected!');
	con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
	con.end();
});
