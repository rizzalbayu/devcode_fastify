const todoModel = require('../models/todo_item');
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
		let todo = [];
		let query = require('url').parse(request.url, true).query;
		if (query.activity_group_id == null) {
			todo = await todoModel.searchAll();
		} else {
			todo = await todoModel.searchByActivity(
				query.activity_group_id
			);
		}
		storage.set(key, todo[0]);

		return reply.send({
			status: 'Success',
			message: 'Success',
			data: todo[0],
		});
	},
	create: async (request, reply) => {
		let { priority, is_active } = '';
		if (request.body.priority === undefined) {
			priority = 'very-high';
		}
		if (request.body.is_active === undefined) {
			is_active = true;
		}
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
		const activity = await todoModel.searchActivity(
			request.body.activity_group_id
		);
		if (activity == '') {
			return reply.status(404).send({
				status: 'Not Found',
				message:
					'Activity with ID ' +
					request.body.activity_group_id +
					' Not Found',
				data: {},
			});
		}
		const now = new Date(date);
		const params = {
			activity_group_id: request.body.activity_group_id,
			title: request.body.title,
			date: now,
		};
		const todo = await todoModel.create(params);
		return reply.status(201).send({
			status: 'Success',
			message: 'Success',
			data: {
				created_at: now,
				updated_at: now,
				id: todo[0].insertId,
				title: request.body.title,
				activity_group_id: request.body.activity_group_id,
				is_active: is_active,
				priority: priority,
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
		const todo = await todoModel.searchOne(id);
		storage.set(key, todo[0]);
		if (todo == '') {
			return reply.status(404).send({
				status: 'Not Found',
				message: 'Todo with ID ' + id + ' Not Found',
				data: {},
			});
		}
		return reply.send({
			status: 'Success',
			message: 'Success',
			data: {
				id: todo[0].id,
				activity_group_id: todo[0].activity_group_id.toString(),
				title: todo[0].title,
				is_active: (todo[0].is_active * 1).toString(),
				priority: todo[0].priority,
				created_at: todo[0].created_at,
				updated_at: todo[0].updated_at,
				deleted_at: todo[0].deleted_at,
			},
		});
	},
	update: async (request, reply) => {
		const id = request.params.id;

		const todo = await todoModel.searchOne(id);

		if (todo == '') {
			return reply.status(404).send({
				status: 'Not Found',
				message: 'Todo with ID ' + id + ' Not Found',
				data: {},
			});
		}
		let { title, is_active, priority } = '';
		if (request.body.title === undefined) {
			title = todo[0].title;
		} else {
			title = request.body.title;
		}
		if (request.body.is_active === undefined) {
			is_active = todo[0].is_active;
		} else {
			is_active = request.body.is_active;
		}
		if (request.body.priority === undefined) {
			priority = todo[0].priority;
		} else {
			priority = request.body.priority;
		}

		if (request.body.activity_group_id) {
			return reply.status(400).json({
				status: 'Bad Request',
				message: 'activity_group_id cannot be null',
				data: {},
			});
		}
		const now = new Date(date);
		params = {
			id: id,
			title: title,
			is_active: is_active,
			priority: priority,
			date: now,
		};
		await todoModel.update(params);
		return reply.send({
			status: 'Success',
			message: 'Success',
			data: {
				id: Number(id),
				activity_group_id: todo[0].activity_group_id,
				title: title,
				is_active: is_active.toString(),
				priority: priority,
				created_at: todo[0].created_at,
				updated_at: now,
				deleted_at: todo[0].deleted_at,
			},
		});
	},
	remove: async (request, reply) => {
		const id = request.params.id;

		const todo = await todoModel.searchOne(id);

		if (todo == '') {
			return reply.status(404).send({
				status: 'Not Found',
				message: 'Todo with ID ' + id + ' Not Found',
				data: {},
			});
		}
		const now = new Date(date);
		await todoModel.remove(id, now);
		return reply.send({
			status: 'Success',
			message: 'Success',
			data: {},
		});
	},
};
