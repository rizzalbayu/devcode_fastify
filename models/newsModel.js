const mysqlPromise = require('../config/database');
require('dotenv').config();
const newsModel = {
	newsList: async function (params) {
		const connection = await mysqlPromise.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`SELECT * FROM ${process.env.DB_NAME}.news ORDER BY id DESC LIMIT ?, ?`,
				[params.offset, params.limit]
			);
			connection.release();
		} catch (err) {
			console.error(err);
			connection.release();
			return false;
		}
		return res.length > 0 ? res : null;
	},
	newsDetail: async function (id) {
		const connection = await mysqlPromise.DATABASE.getConnection();
		var res = [{}];
		try {
			res = await connection.execute(
				`SELECT * FROM ${process.env.DB_NAME}.news WHERE id = ?`,
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
};
module.exports = newsModel;
