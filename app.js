const fastify = require('fastify')();
require('./config/create');
const activityRoutes = require('./routes/activity');
const todoRoutes = require('./routes/todo');
fastify.register(todoRoutes);
fastify.register(activityRoutes);
module.exports = fastify;
