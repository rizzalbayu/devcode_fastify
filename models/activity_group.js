const mysql = require('../config/database').DATABASE;
const activityModel = {
	searchAll: async () => {
		let res = [{}];
		try {
			res = await mysql.execute(
				`SELECT id, email, title, created_at, updated_at, deleted_at FROM activities WHERE deleted_at IS NULL LIMIT 1 OFFSET 0`
			);
		} catch (err) {
			console.error(err);
			return false;
		}
		return res.length > 0 ? res : null;
	},
	create: async (params) => {
		let res = [{}];
		try {
			res = mysql.execute(
				`INSERT INTO activities (id, email, title) VALUES ( ?, ?, ?)`,
				[params.id, params.email, params.title]
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
				`SELECT id, email, title, created_at, updated_at, deleted_at FROM activities WHERE id=? AND deleted_at IS NULL`,
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
				`UPDATE activities SET title=?, email=?, updated_at=now() WHERE id=?`,
				[params.title, params.email, params.id]
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
				`UPDATE activities SET deleted_at=now() WHERE id=?`,
				[id]
			);
		} catch (err) {
			console.error(err);
			return false;
		}
	},
};
module.exports = activityModel;
