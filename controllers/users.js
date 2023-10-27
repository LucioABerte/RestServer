const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')


const usersGet = async(req = request, res = response) => {
    
    const { limit = 5 , from = 0} = req.query;
    const query = { state: true };

    //const users = await User.find( query )
    //    .skip( Number(from) )
    //    .limit( Number(limit) );

    //const total = await User.countDocuments( query );
    
    //Control ms time of promises
    const [total, users] = await Promise.all([ 
        User.countDocuments( query ),
        User.find( query )
            .skip( Number(from) )
            .limit( Number(limit) )
    ])

    res.json({
        total,
        users
        //resp
    })
}

const usersPut = async(req, res = response) => {
    const {id} = req.params
    const { _id, password, google, email, ...rest} = req.body

    //validate vs DB
    if( password ) {
        //Re-encrypt the password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user);
}

const usersPost = async(req, res = response) => {
    
    //Create a user
    const { name, email, password, role} = req.body;
    const user = new User({ name, email, password, role });
    
    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    // Save in DB
    await user.save()

    res.json({
        user
    })
}

const usersDelete = async(req, res = response) => {
    
    const {id} = req.params
 
    //const user = await User.findByIdAndDelete( id )
    const user = await User.findByIdAndUpdate( id, { state: false } )

    res.json(user)
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