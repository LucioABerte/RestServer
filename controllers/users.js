const { request, response } = require('express')


const usersGet = (req = request, res = response) => {
    
    const {q, nombre = 'No name', apiKey, page = 0, limit = 5} = req.query
    
    res.json({
        msg: 'GET API - controller',
        q, 
        nombre, 
        apiKey,
        page,
        limit
    })
}

const usersPut = (req, res = response) => {
    const {id} = req.params
    res.json({
        msg: 'PUT API - controller',
        id
    })
}

const usersPost = (req, res = response) => {

    const {nombre, edad} = req.body;
    res.json({
        msg: 'POST API - controller',
        nombre, edad
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API - controller'
    })
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'PATCH API - controller'
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}