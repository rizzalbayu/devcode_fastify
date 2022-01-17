const activityModel = require('../models/activity_group');
date = Date.now();
const NodeCache = require('node-cache');
const storage = new NodeCache({
	stdTTL: 3600,
	checkperiod: 120,
	useClones: false,
});
module.exports = {
	index: async (request, reply) => {
		const key = request.url;
		const data = storage.get(key);
		if (data) {
			return reply.send({
				status: 'Success',
				message: 'Success',
				data: data,
			});
		}
		const activity = await activityModel.searchAll();
		storage.set(key, activity[0]);

		return reply.send({
			status: 'Success',
			message: 'Success',
			data: activity[0],
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
		const now = new Date(date);
		const params = {
			email: request.body.email,
			title: request.body.title,
			date: now,
		};
		const activity = await activityModel.create(params);
		return reply.status(201).send({
			status: 'Success',
			message: 'Success',
			data: {
				created_at: now,
				updated_at: now,
				id: activity[0].insertId,
				title: request.body.title,
				email: request.body.email,
			},
		});
	},
	detail: async (request, reply) => {
		const id = request.params.id;
		const key = request.url;
		const data = storage.get(key);
		if (data) {
			return reply.send({
				status: 'Success',
				message: 'Success',
				data: data,
			});
		}
		const activity = await activityModel.searchOne(id);
		storage.set(key, activity[0]);
		if (activity == '') {
			return reply.status(404).send({
				status: 'Not Found',
				message: 'Activity with ID ' + id + ' Not Found',
				data: {},
			});
		}
		return reply.send({
			status: 'Success',
			message: 'Success',
			data: activity[0],
		});
	},
	update: async (request, reply) => {
		const id = request.params.id;

		const activity = await activityModel.searchOne(id);

		if (activity == '') {
			return reply.status(404).send({
				status: 'Not Found',
				message: 'Activity with ID ' + id + ' Not Found',
				data: {},
			});
		}
		let email = '';
		if (request.body.email === undefined) {
			email = activity[0].email;
		}
		if (request.body.title === undefined) {
			return reply.status(400).send({
				status: 'Bad Request',
				message: 'title cannot be null',
				data: {},
			});
		}
		const now = new Date(date);
		params = {
			id: id,
			email: email,
			title: request.body.title,
			date: now,
		};
		await activityModel.update(params);
		return reply.send({
			status: 'Success',
			message: 'Success',
			data: {
				id: Number(id),
				email: email,
				title: request.body.title,
				created_at: activity[0].created_at,
				updated_at: now,
				deleted_at: activity[0].deleted_at,
			},
		});
	},
	remove: async (request, reply) => {
		const id = request.params.id;

		const activity = await activityModel.searchOne(id);

		if (activity == '') {
			return reply.status(404).send({
				status: 'Not Found',
				message: 'Activity with ID ' + id + ' Not Found',
				data: {},
			});
		}
		const now = new Date(date);
		await activityModel.remove(id, now);
		return reply.send({
			status: 'Success',
			message: 'Success',
			data: {},
		});
	},
};
