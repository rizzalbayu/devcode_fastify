'use strict';
const fastify = require('./app');

const start = async () => {
	try {
		await fastify.listen(3030, '0.0.0.0');
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
