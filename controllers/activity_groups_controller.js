const activityModel = require('../models/activity_group');
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
		// new Promise((resolve, reject) => {
		// 	resolve(activityModel.searchAll());
		// })
		// 	.then((results) => {
		// 		cache.set(key, results[0]);
		// 		return reply.send({
		// 			status: 'Success',
		// 			message: 'Success',
		// 			data: results[0],
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
		activityModel.searchAll((results) => {
			cache.set(key, results);
			return reply.send({
				status: 'Success',
				message: 'Success',
				data: results,
			});
		});
	},
	create: async (request, reply) => {
		if (request.body.title === undefined) {
			return reply.status(400).send({
				status: 'Bad Request',
				message: 'title cannot be null',
				data: {},
			});
		}
		let email = '';
		console.log(request.body.email);
		if (request.body.email === undefined) {
		} else {
			email = request.body.email;
		}
		const createid =
			Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
		const now = new Date(Date.now());
		const params = {
			email: email,
			title: request.body.title,
			id: createid,
		};
		activityModel.create(params);
		return reply.status(201).send({
			status: 'Success',
			message: 'Success',
			data: {
				created_at: now,
				updated_at: now,
				id: createid,
				title: request.body.title,
				email: email,
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
		activityModel.searchOne(id, (results) => {
			cache.set(key, results);
			if (results == null) {
				return reply.status(404).send({
					status: 'Not Found',
					message: 'Activity with ID ' + id + ' Not Found',
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
		// 	resolve(activityModel.searchOne(id));
		// })
		// 	.then((results) => {
		// 		cache.set(key, results[0]);
		// 		if (results == '') {
		// 			return reply.status(404).send({
		// 				status: 'Not Found',
		// 				message:
		// 					'Activity with ID ' +
		// 					id +
		// 					' Not Found',
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
		// const activity = await activityModel.searchOne(id);
		// if (activity == '') {
		// 	return reply.status(404).send({
		// 		status: 'Not Found',
		// 		message: 'Activity with ID ' + id + ' Not Found',
		// 		data: {},
		// 	});
		// }
		// let email = '';
		// if (request.body.email === undefined) {
		// 	email = activity[0].email;
		// }
		// if (request.body.title === undefined) {
		// 	return reply.status(400).send({
		// 		status: 'Bad Request',
		// 		message: 'title cannot be null',
		// 		data: {},
		// 	});
		// }
		// const now = new Date(Date.now());
		// params = {
		// 	id: id,
		// 	email: email,
		// 	title: request.body.title,
		// };
		// activityModel.update(params);
		// return reply.send({
		// 	status: 'Success',
		// 	message: 'Success',
		// 	data: {
		// 		id: Number(id),
		// 		email: email,
		// 		title: request.body.title,
		// 		created_at: activity[0].created_at,
		// 		updated_at: now,
		// 		deleted_at: activity[0].deleted_at,
		// 	},
		// });
		activityModel.searchOne(id, (results) => {
			if (results == null) {
				return reply.status(404).send({
					status: 'Not Found',
					message: 'Activity with ID ' + id + ' Not Found',
					data: {},
				});
			}
			let email = '';
			if (request.body.email === undefined) {
				email = results.email;
			}
			if (request.body.title === undefined) {
				return reply.status(400).send({
					status: 'Bad Request',
					message: 'title cannot be null',
					data: {},
				});
			}
			const now = new Date(Date.now());
			params = {
				id: id,
				email: email,
				title: request.body.title,
			};
			activityModel.update(params);
			return reply.send({
				status: 'Success',
				message: 'Success',
				data: {
					id: Number(id),
					email: email,
					title: request.body.title,
					created_at: results.created_at,
					updated_at: now,
					deleted_at: results.deleted_at,
				},
			});
		});
	},
	remove: async (request, reply) => {
		const id = request.params.id;
		// const activity = await activityModel.searchOne(id);
		// if (activity == '') {
		// 	return reply.status(404).send({
		// 		status: 'Not Found',
		// 		message: 'Activity with ID ' + id + ' Not Found',
		// 		data: {},
		// 	});
		// }
		// activityModel.remove(id);
		// return reply.send({
		// 	status: 'Success',
		// 	message: 'Success',
		// 	data: {},
		// });
		activityModel.searchOne(id, (results) => {
			if (results == null) {
				return reply.status(404).send({
					status: 'Not Found',
					message: 'Activity with ID ' + id + ' Not Found',
					data: {},
				});
			}
			activityModel.remove(id);
			return reply.send({
				status: 'Success',
				message: 'Success',
				data: {},
			});
		});
	},
};
