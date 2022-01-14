const mysql = require('../config/database');
require('dotenv').config();
const activityModel = {
	searchAll: async () => {
		const connection = await mysql.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`SELECT id, email, title, created_at, updated_at, deleted_at FROM ${process.env.MYSQL_DBNAME}.activities WHERE deleted_at IS NULL LIMIT 1 OFFSET 0`
			);
			connection.release();
		} catch (err) {
			console.error(err);
			connection.release();
			return false;
		}
		return res.length > 0 ? res : null;
	},
	create: async (params) => {
		const connection = await mysql.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`INSERT INTO ${process.env.MYSQL_DBNAME}.activities (email, title, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, null)`,
				[params.email, params.title, params.date, params.date]
			);
			connection.release();
			return res;
		} catch (err) {
			console.error(err);
			connection.release();
			return false;
		}
	},
	searchOne: async (id) => {
		const connection = await mysql.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`SELECT id, email, title, created_at, updated_at, deleted_at FROM ${process.env.MYSQL_DBNAME}.activities WHERE id=? AND deleted_at IS NULL`,
				[id]
			);
			connection.release();
		} catch (err) {
			console.error(err);
			connection.release();
			return false;
		}
		return res.length > 0 ? res[0] : null;
	},
	update: async (params) => {
		const connection = await mysql.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`UPDATE ${process.env.MYSQL_DBNAME}.activities SET title=?, email=?, updated_at=? WHERE id=?`,
				[params.title, params.email, params.date, params.id]
			);
			connection.release();
		} catch (err) {
			console.error(err);
			connection.release();
			return false;
		}
	},
	remove: async (id, date) => {
		const connection = await mysql.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`UPDATE ${process.env.MYSQL_DBNAME}.activities SET deleted_at=? WHERE id=?`,
				[date, id]
			);
			connection.release();
		} catch (err) {
			console.error(err);
			connection.release();
			return false;
		}
	},
};
module.exports = activityModel;
