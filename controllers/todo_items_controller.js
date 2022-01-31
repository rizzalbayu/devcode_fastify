const todoModel = require('../models/todo_item');
let LRU = require('lru-cache'),
	options = { max: 50, maxAge: 1000 * 60 * 60 },
	cache = new LRU(options);
module.exports = {
	index: async (request, reply) => {
		const key = request.url;
		const data = cache.get(key);
		if (data) {
			return reply.send({
				status: 'Success',
				message: 'Success',
				data: data,
			});
		}
		let query = require('url').parse(request.url, true).query;

		if (query.activity_group_id == null) {
			todoModel.searchAll((results) => {
				cache.set(key, results);
				return reply.send({
					status: 'Success',
					message: 'Success',
					data: results,
				});
			});
		} else {
			todoModel.searchByActivity(
				query.activity_group_id,
				(results) => {
					if (results == null) {
						results = [];
					}
					cache.set(key, results);
					return reply.send({
						status: 'Success',
						message: 'Success',
						data: results,
					});
				}
			);
		}

		// new Promise((resolve, reject) => {
		// 	if (query.activity_group_id == null) {
		// 		resolve(todoModel.searchAll());
		// 	} else {
		// 		resolve(
		// 			todoModel.searchByActivity(
		// 				query.activity_group_id
		// 			)
		// 		);
		// 	}
		// })
		// 	.then((results) => {
		// 		cache.set(key, results[0]);
		// 		if (results == '') {
		// 			results[0] = [];
		// 		}
		// 		return reply.send({
		// 			status: 'Success',
		// 			message: 'Success',
		// 			data: results[0],
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	},
	create: async (request, reply) => {
		if (request.body.title === undefined) {
			return reply.status(400).send({
				status: 'Bad Request',
				message: 'title cannot be null',
				data: {},
			});
		}
		if (request.body.activity_group_id === undefined) {
			return reply.status(400).send({
				status: 'Bad Request',
				message: 'activity_group_id cannot be null',
				data: {},
			});
		}
		// new Promise((resolve, reject) => {
		// 	resolve(
		// 		todoModel.searchActivity(request.body.activity_group_id)
		// 	);
		// })
		// 	.then((results) => {
		// 		if (results == '') {
		// 			return reply.status(404).send({
		// 				status: 'Not Found',
		// 				message:
		// 					'Activity with ID ' +
		// 					request.body.activity_group_id +
		// 					' Not Found',
		// 				data: {},
		// 			});
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
		const createid =
			Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
		const now = new Date(Date.now());
		const params = {
			activity_group_id: request.body.activity_group_id,
			title: request.body.title,
			id: createid,
		};
		todoModel.create(params);
		return reply.status(201).send({
			status: 'Success',
			message: 'Success',
			data: {
				created_at: now,
				updated_at: now,
				id: createid,
				title: request.body.title,
				activity_group_id: request.body.activity_group_id,
				is_active: true,
				priority: 'very-high',
			},
		});
	},
	detail: async (request, reply) => {
		const id = request.params.id;
		const key = request.url;
		const data = cache.get(key);
		if (data) {
			return reply.send({
				status: 'Success',
				message: 'Success',
				data: data,
			});
		}
		todoModel.searchOne(id, (results) => {
			cache.set(key, results);
			if (results == null) {
				return reply.status(404).send({
					status: 'Not Found',
					message: 'Todo with ID ' + id + ' Not Found',
					data: {},
				});
			}
			return reply.send({
				status: 'Success',
				message: 'Success',
				data: results,
			});
		});
		// new Promise((resolve, reject) => {
		// 	resolve(todoModel.searchOne(id));
		// })
		// 	.then((results) => {
		// 		cache.set(key, results[0]);
		// 		if (results == '') {
		// 			return reply.status(404).send({
		// 				status: 'Not Found',
		// 				message:
		// 					'Todo with ID ' + id + ' Not Found',
		// 				data: {},
		// 			});
		// 		}
		// 		return reply.send({
		// 			status: 'Success',
		// 			message: 'Success',
		// 			data: results[0],
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	},
	update: async (request, reply) => {
		const id = request.params.id;
		todoModel.searchOne(id, (results) => {
			if (results == null) {
				return reply.status(404).send({
					status: 'Not Found',
					message: 'Todo with ID ' + id + ' Not Found',
					data: {},
				});
			}
			let { title, is_active } = '';
			if (request.body.title === undefined) {
				title = results.title;
			} else {
				title = request.body.title;
			}
			if (request.body.is_active === undefined) {
				is_active = results.is_active;
			} else {
				is_active = request.body.is_active;
			}
			if (request.body.activity_group_id) {
				return reply.status(400).json({
					status: 'Bad Request',
					message: 'activity_group_id cannot be null',
					data: {},
				});
			}
			const now = new Date(Date.now());
			params = {
				id: id,
				title: title,
				is_active: is_active,
			};
			todoModel.update(params);
			return reply.send({
				status: 'Success',
				message: 'Success',
				data: {
					id: Number(id),
					activity_group_id: results.activity_group_id,
					title: title,
					is_active: is_active,
					priority: results.priority,
					created_at: results.created_at,
					updated_at: now,
					deleted_at: results.deleted_at,
				},
			});
		});
		// const todo = await todoModel.searchOne(id);
		// if (todo == '') {
		// 	return reply.status(404).send({
		// 		status: 'Not Found',
		// 		message: 'Todo with ID ' + id + ' Not Found',
		// 		data: {},
		// 	});
		// }
		// let { title, is_active } = '';
		// if (request.body.title === undefined) {
		// 	title = todo[0].title;
		// } else {
		// 	title = request.body.title;
		// }
		// if (request.body.is_active === undefined) {
		// 	is_active = todo[0].is_active;
		// } else {
		// 	is_active = request.body.is_active;
		// }
		// if (request.body.activity_group_id) {
		// 	return reply.status(400).json({
		// 		status: 'Bad Request',
		// 		message: 'activity_group_id cannot be null',
		// 		data: {},
		// 	});
		// }
		// const now = new Date(Date.now());
		// params = {
		// 	id: id,
		// 	title: title,
		// 	is_active: is_active,
		// };
		// todoModel.update(params);
		// return reply.send({
		// 	status: 'Success',
		// 	message: 'Success',
		// 	data: {
		// 		id: Number(id),
		// 		activity_group_id: todo[0].activity_group_id,
		// 		title: title,
		// 		is_active: is_active,
		// 		priority: todo[0].priority,
		// 		created_at: todo[0].created_at,
		// 		updated_at: now,
		// 		deleted_at: todo[0].deleted_at,
		// 	},
		// });
	},
	remove: async (request, reply) => {
		const id = request.params.id;
		// const todo = await todoModel.searchOne(id);
		// if (todo == '') {
		// 	return reply.status(404).send({
		// 		status: 'Not Found',
		// 		message: 'Todo with ID ' + id + ' Not Found',
		// 		data: {},
		// 	});
		// }
		// todoModel.remove(id);
		// return reply.send({
		// 	status: 'Success',
		// 	message: 'Success',
		// 	data: {},
		// });
		todoModel.searchOne(id, (results) => {
			if (results == null) {
				return reply.status(404).send({
					status: 'Not Found',
					message: 'Todo with ID ' + id + ' Not Found',
					data: {},
				});
			}
			todoModel.remove(id);
			return reply.send({
				status: 'Success',
				message: 'Success',
				data: {},
			});
		});
	},
};
