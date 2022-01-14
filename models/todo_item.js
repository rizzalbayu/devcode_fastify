const mysql = require('../config/database');
require('dotenv').config();
const activityModel = {
	searchAll: async () => {
		const connection = await mysql.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM ${process.env.MYSQL_DBNAME}.todos WHERE deleted_at IS NULL LIMIT 1 OFFSET 0`
			);
			connection.release();
		} catch (err) {
			console.error(err);
			connection.release();
			return false;
		}
		return res.length > 0 ? res : null;
	},
	searchByActivity: async (activity) => {
		const connection = await mysql.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM ${process.env.MYSQL_DBNAME}.todos WHERE activity_group_id=? AND deleted_at IS NULL LIMIT 1 OFFSET 0`,
				[activity]
			);
			connection.release();
		} catch (err) {
			console.error(err);
			connection.release();
			return false;
		}
		return res.length > 0 ? res : null;
	},
	searchActivity: async (activity) => {
		const connection = await mysql.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`SELECT id FROM ${process.env.MYSQL_DBNAME}.activities WHERE id=? AND deleted_at IS NULL`,
				[activity]
			);
			connection.release();
		} catch (err) {
			console.error(err);
			connection.release();
			return false;
		}
		return res.length > 0 ? res[0] : null;
	},
	create: async (params) => {
		const connection = await mysql.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`INSERT INTO ${process.env.MYSQL_DBNAME}.todos (title, activity_group_id, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, null)`,
				[
					params.title,
					params.activity_group_id,
					params.date,
					params.date,
				]
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
				`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM ${process.env.MYSQL_DBNAME}.todos WHERE id=? AND deleted_at is null`,
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
				`UPDATE ${process.env.MYSQL_DBNAME}.todos SET title=?, is_active=?, updated_at=?, priority=? WHERE id=?`,
				[
					params.title,
					params.is_active,
					params.date,
					params.priority,
					params.id,
				]
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
				`UPDATE ${process.env.MYSQL_DBNAME}.todos SET deleted_at=? WHERE id=?`,
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
