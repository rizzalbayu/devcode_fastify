'use strict';
const fastify = require('./app');
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;

const start = async () => {
	try {
		await fastify.listen(3030, '0.0.0.0');
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

if (cluster.isMaster) {
	// console.log(`Number of CPUs is ${totalCPUs}`);
	// console.log(`Master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < totalCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
		console.log("Let's fork another worker!");
		cluster.fork();
	});
} else {
	start();
}

// start();
