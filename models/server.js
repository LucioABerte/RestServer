const express = require('express');
const cors = require('cors');
require('dotenv').config();

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        //Middlewares
        this.middlewares();

        //App Routes
        this.routes();
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
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running! Port: ', this.port);
        })
    }
}

module.exports = Server;