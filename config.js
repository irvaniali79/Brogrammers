const appsDirectoriesPath = "./apps";
const apps = ['users'];

const root = __dirname;

const database = {
    user:'postgres',
    password:"postgres",
    host:"localhost",
    port:5432,
    schema:"testdb",
};

const router = {
  eventName: "newReq",
}

const storage = {
    root : "./storage"
}

const server = {
    port: process.env.PORT ?? 8000,
    hostname: process.env.HOST ?? "127.0.0.1",
    eventName: "newReq",
}

const errorHandler = {
    eventName:'catch-error'
}

const responseHandler = {
    eventName:'send-response'
}

module.exports = {
    appsDirectoriesPath,
    apps,
    root,
    database,
    router,
    storage,
    server,
    errorHandler,
    responseHandler
}