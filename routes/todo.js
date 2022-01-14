let controller = require('../controllers/todo_items_controller');
async function routes(fastify, options) {
	fastify.get('/todo-items', controller.index);
	fastify.post('/todo-items', controller.create);
	fastify.get('/todo-items/:id', controller.detail);
	fastify.patch('/todo-items/:id', controller.update);
	fastify.delete('/todo-items/:id', controller.remove);
}
module.exports = routes;
