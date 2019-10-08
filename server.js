'use strict';
const cluster = require('cluster');
const app     = require('./src/app');
const http    = require('http');
const path    = require('path');
require('dotenv').config({path: path.resolve('./src/config/environment.env')});
const logger  = require('./src/config/logger');

if (cluster.isMaster)
{
    const numWorkers = require('os').cpus().length;

    logger.info('Master cluster setting up ' + numWorkers + ' workers...');
    logger.info(`Master cluster setting up ${numWorkers} workers...`);

    for (let i = 0; i < numWorkers; i++)
    {
        cluster.fork();
    }

    cluster.on('online', worker =>
    {
        logger.info('Worker ' + worker.process.pid + ' is online');
    });


    cluster.on('exit', (worker, code, signal) =>
    {
        let timeRef = Date.now();
        logger.info('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        logger.error(`${timeRef}: Worker ${worker.process.pid} died with code: ${code} , and signal: ${signal}`);
        logger.info('Starting a new worker');
        logger.info(`Starting a new worker`);
        cluster.fork();
    });
} else
{
    const normalizePort = val =>
    {
        let port = parseInt(val, 10);

        if (isNaN(port))
        {
            // named pipe
            return val;
        }

        if (port >= 0)
        {
            // port number
            return port;
        }

        return false;
    };

    const onError = error =>
    {
        if (error.syscall !== "listen")
        {
            throw error;
        }
        const bind = typeof port === "string" ? "pipe " + port : "port " + port;
        switch (error.code)
        {
            case "EACCES":
                logger.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                logger.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    };

    const onListening = () =>
    {
        const addr = server.address();
        const bind = typeof addr === "string" ? "pipe " + port : "port " + port;
        logger.info(`server is listening on port: ${bind}`);
    };

    const port = normalizePort(process.env.SERVER_PORT || 3000);

    app.set("port", port);

    const server = http.createServer(app);

    server.on('error', onError);
    server.on('listening', onListening);
    server.listen(port);
}
