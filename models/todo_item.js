const mysql = require('../config/database').DATABASE;
const activityModel = {
	searchAll: async (callback) => {
		try {
			return mysql.execute(
				`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM todos WHERE deleted_at IS NULL LIMIT 1 OFFSET 0`,
				(err, results) => {
					callback(results.length > 0 ? results[0] : null);
				}
			);
			// return new Promise((resolve, reject) => {
			// 	mysql.execute(
			// 		`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM todos WHERE deleted_at IS NULL LIMIT 1 OFFSET 0`
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
	searchByActivity: async (activity, callback) => {
		try {
			return mysql.execute(
				`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM todos WHERE activity_group_id=? AND deleted_at IS NULL LIMIT 1 OFFSET 0`,
				[activity],
				(err, results) => {
					callback(results.length > 0 ? results[0] : null);
				}
			);
			// return new Promise((resolve, reject) => {
			// 	mysql.execute(
			// 		`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM todos WHERE activity_group_id=? AND deleted_at IS NULL LIMIT 1 OFFSET 0`,
			// 		[activity]
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
	searchActivity: async (activity) => {
		try {
			return new Promise((resolve, reject) => {
				mysql.execute(
					`SELECT id FROM activities WHERE id=? AND deleted_at IS NULL LIMIT 1 OFFSET 0`,
					[activity]
				)
					.then((results) => {
						resolve(
							results.length > 0 ? results[0] : null
						);
					})
					.catch((err) => {
						console.log(err);
					});
			});
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	create: async (params) => {
		try {
			mysql.execute(
				`INSERT INTO todos (id, title, activity_group_id) VALUES (?, ?, ?)`,
				[params.id, params.title, params.activity_group_id]
			);
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	searchOne: async (id, callback) => {
		try {
			return mysql.execute(
				`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM todos WHERE id=? AND deleted_at is NULL LIMIT 1 OFFSET 0`,
				[id],
				(err, results) => {
					callback(results.length > 0 ? results[0] : null);
				}
			);
			// return new Promise((resolve, reject) => {
			// 	mysql.execute(
			// 		`SELECT id, activity_group_id, title, is_active, priority, created_at, updated_at, deleted_at FROM todos WHERE id=? AND deleted_at is NULL LIMIT 1 OFFSET 0`,
			// 		[id]
			// 	)
			// 		.then((results) => {
			// 			resolve(
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
				`UPDATE todos SET title=?, is_active=?, updated_at=now() WHERE id=?`,
				[params.title, params.is_active, params.id]
			);
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	remove: async (id) => {
		try {
			mysql.execute(
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
