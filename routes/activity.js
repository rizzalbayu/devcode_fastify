let controller = require('../controllers/activity_groups_controller');
async function routes(fastify, options) {
	fastify.get('/activity-groups', controller.index);
	fastify.post('/activity-groups', controller.create);
	fastify.get('/activity-groups/:id', controller.detail);
	fastify.patch('/activity-groups/:id', controller.update);
	fastify.delete('/activity-groups/:id', controller.remove);
}
module.exports = routes;
