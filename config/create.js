const mysql = require('./database');
require('dotenv').config();
const migration = {
	create: async () => {
		const connection = await mysql.DATABASE.getConnection();
		connection.execute(
			`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DBNAME}`
		);
		connection.execute(
			`CREATE TABLE IF NOT EXISTS ${process.env.MYSQL_DBNAME}.activities (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, title varchar(20) NOT NULL, email varchar(50), created_at datetime, updated_at datetime, deleted_at datetime)`
		);
		connection.execute(
			`CREATE TABLE IF NOT EXISTS ${process.env.MYSQL_DBNAME}.todos (is_active tinyint(1) NOT NULL DEFAULT '1', priority enum('very-high','high','normal','low','very-low') NOT NULL DEFAULT 'very-high', id int NOT NULL PRIMARY KEY AUTO_INCREMENT, activity_group_id int NOT NULL, title varchar(30) NOT NULL, created_at datetime , updated_at datetime ,deleted_at datetime)`
		);
	},
};

module.exports = migration;
