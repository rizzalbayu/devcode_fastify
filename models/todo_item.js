const mysql = require('../config/database').DATABASE;
const activityModel = {
	searchAll: async () => {
		let res = [{}];
		try {
			res = await mysql.execute(
				`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM todos WHERE deleted_at IS NULL LIMIT 1 OFFSET 0`
			);
		} catch (err) {
			console.error(err);
			return false;
		}
		return res.length > 0 ? res : null;
	},
	searchByActivity: async (activity) => {
		let res = [{}];
		try {
			res = await mysql.execute(
				`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM todos WHERE activity_group_id=? AND deleted_at IS NULL LIMIT 1 OFFSET 0`,
				[activity]
			);
		} catch (err) {
			console.error(err);
			return false;
		}
		return res.length > 0 ? res : null;
	},
	searchActivity: async (activity) => {
		let res = [{}];
		try {
			res = await mysql.execute(
				`SELECT id FROM activities WHERE id=? AND deleted_at IS NULL`,
				[activity]
			);
		} catch (err) {
			console.error(err);
			return false;
		}
		return res.length > 0 ? res[0] : null;
	},
	create: async (params) => {
		let res = [{}];
		try {
			res = mysql.execute(
				`INSERT INTO todos (id, title, activity_group_id) VALUES ( ?, ?, ?)`,
				[params.id, params.title, params.activity_group_id]
			);
			return res;
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	searchOne: async (id) => {
		let res = [{}];
		try {
			res = await mysql.execute(
				`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM todos WHERE id=? AND deleted_at is null`,
				[id]
			);
		} catch (err) {
			console.error(err);
			return false;
		}
		return res.length > 0 ? res[0] : null;
	},
	update: async (params) => {
		let res = [{}];
		try {
			res = mysql.execute(
				`UPDATE todos SET title=?, is_active=?, updated_at=now() WHERE id=?`,
				[params.title, params.is_active, params.id]
			);
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	remove: async (id) => {
		let res = [{}];
		try {
			res = mysql.execute(
				`UPDATE todos SET deleted_at=now() WHERE id=?`,
				[id]
			);
		} catch (err) {
			console.error(err);
			return false;
		}
	},
};
module.exports = activityModel;
