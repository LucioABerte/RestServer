const express = require('express');
const cors = require('cors');
const { dbConnect } = require('../database/config');
require('dotenv').config();

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

        //Database Connect
        this.connectDB();

        //Middlewares
        this.middlewares();

        //App Routes
        this.routes();
    }

    async connectDB() {
        await dbConnect();
    }

    middlewares() {
        //CORS
        this.app.use( cors());

        //Read and Body Parse
        this.app.use( express.json())

        //Public Directory
        this.app.use( express.static('public'))
    }

    routes() {
        //Middleware condicional
        this.app.use(this.usersPath, require('../routes/users'))
        this.app.use(this.authPath, require('../routes/auth'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running! Port: ', this.port);
        })
    }
}

module.exports = Server;