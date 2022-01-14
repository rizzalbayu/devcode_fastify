const fastify = require('fastify')();
const migration = require('./config/create');
migration.create();
const activityRoutes = require('./routes/activity');
const todoRoutes = require('./routes/todo');
fastify.register(todoRoutes);
fastify.register(activityRoutes);
module.exports = fastify;
