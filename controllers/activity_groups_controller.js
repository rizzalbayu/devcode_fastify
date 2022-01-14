const activityModel = require('../models/activity_group');
date = Date.now();
const NodeCache = require('node-cache');
const storage = new NodeCache({
	stdTTL: 3600,
	checkperiod: 120,
	useClones: false,
});
module.exports = {
	index: async (req, res) => {
		const key = req.url;
		const data = storage.get(key);
		if (data) {
			return res.send({
				status: 'Success',
				message: 'Success',
				data: data,
			});
		}
		const activity = await activityModel.searchAll();
		storage.set(key, activity[0]);

		return res.send({
			status: 'Success',
			message: 'Success',
			data: activity[0],
		});
	},
	create: async (req, res) => {
		if (req.body.title === undefined) {
			return res.status(400).send({
				status: 'Bad Request',
				message: 'title cannot be null',
				data: {},
			});
		}
		const now = new Date(date);
		const params = {
			email: req.body.email,
			title: req.body.title,
			date: now,
		};
		const activity = await activityModel.create(params);
		return res.status(201).send({
			status: 'Success',
			message: 'Success',
			data: {
				created_at: now,
				updated_at: now,
				id: activity[0].insertId,
				title: req.body.title,
				email: req.body.email,
			},
		});
	},
	detail: async (req, res) => {
		const id = req.params.id;
		const key = req.url;
		const data = storage.get(key);
		if (data) {
			return res.send({
				status: 'Success',
				message: 'Success',
				data: data,
			});
		}
		const activity = await activityModel.searchOne(id);
		storage.set(key, activity[0]);
		if (activity == '') {
			return res.status(404).send({
				status: 'Not Found',
				message: 'Activity with ID ' + id + ' Not Found',
				data: {},
			});
		}
		return res.send({
			status: 'Success',
			message: 'Success',
			data: activity[0],
		});
	},
	update: async (req, res) => {
		const id = req.params.id;

		const activity = await activityModel.searchOne(id);

		if (activity == '') {
			return res.status(404).send({
				status: 'Not Found',
				message: 'Activity with ID ' + id + ' Not Found',
				data: {},
			});
		}
		let email = '';
		if (req.body.email === undefined) {
			email = activity[0].email;
		}
		if (req.body.title === undefined) {
			return res.status(400).send({
				status: 'Bad Request',
				message: 'title cannot be null',
				data: {},
			});
		}
		const now = new Date(date);
		params = { id: id, email: email, title: req.body.title, date: now };
		await activityModel.update(params);
		return res.send({
			status: 'Success',
			message: 'Success',
			data: {
				id: Number(id),
				email: email,
				title: req.body.title,
				created_at: activity[0].created_at,
				updated_at: now,
				deleted_at: activity[0].deleted_at,
			},
		});
	},
	remove: async (req, res) => {
		const id = req.params.id;

		const activity = await activityModel.searchOne(id);

		if (activity == '') {
			return res.status(404).send({
				status: 'Not Found',
				message: 'Activity with ID ' + id + ' Not Found',
				data: {},
			});
		}
		const now = new Date(date);
		await activityModel.remove(id, now);
		return res.send({
			status: 'Success',
			message: 'Success',
			data: {},
		});
	},
};
