const mysql = require('../config/database').DATABASE;
const activityModel = {
	searchAll: (callback) => {
		try {
			return mysql.execute(
				`SELECT id, email, title, created_at, updated_at, deleted_at FROM activities WHERE deleted_at IS NULL LIMIT 1 OFFSET 0`,
				(err, results) => {
					callback(results.length > 0 ? results[0] : null);
				}
			);
			// return new Promise((resolve, reject) => {
			// 	mysql.execute(
			// 		`SELECT id, email, title, created_at, updated_at, deleted_at FROM activities WHERE deleted_at IS NULL LIMIT 1 OFFSET 0`
			// 	)
			// 		.then((results) => {
			// 			resolve(
			// 				results.length > 0 ? results[0] : null
			// 			);
			// 		})
			// 		.catch((err) => console.log(err));
			// });
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	create: async (params) => {
		try {
			mysql.execute(
				`INSERT INTO activities (id, email, title) VALUES (?, ?, ?)`,
				[params.id, params.email, params.title]
			);
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	searchOne: async (id, callback) => {
		try {
			return mysql.execute(
				`SELECT id, email, title, created_at, updated_at, deleted_at FROM activities WHERE id=? AND deleted_at IS NULL LIMIT 1 OFFSET 0`,
				[id],
				(err, results) => {
					callback(results.length > 0 ? results[0] : null);
				}
			);
			// return new Promise((resolve, reject) => {
			// 	mysql.execute(
			// 		`SELECT id, email, title, created_at, updated_at, deleted_at FROM activities WHERE id=? AND deleted_at IS NULL LIMIT 1 OFFSET 0`,
			// 		[id]
			// 	)
			// 		.then((results) => {
			// 			resolve(
			// 				results.length > 0 ? results[0] : null
			// 			);
			// 		})
			// 		.catch((err) => {
			// 			console.log(err);
			// 		});
			// });
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	update: async (params) => {
		try {
			mysql.execute(
				`UPDATE activities SET title=?, email=?, updated_at=now() WHERE id=?`,
				[params.title, params.email, params.id]
			);
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	remove: async (id) => {
		try {
			mysql.execute(
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
