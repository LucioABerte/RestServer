const { response, request } = require('express');
const User = require('../models/user')
const jwt = require('jsonwebtoken');


const validateJWT = async(req = request, res = response, next) => {
    
    const token = req.header('x-token');
    
    if( !token ) {
        return res.status(401).json({
            msg: 'There is no token available in the request'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY, )
        
        // Read the user related to uid
        const user =  await User.findById( uid );
        
        if(!user) {
            return res.status(401).json({
                msg: 'Invalid token - User does not exists in DB'
            })
        }
        // Verify if the uid has a true state
        if( !user.state ) {
            return res.status(401).json({
                msg: 'Invalid token - user with false state'
            })
        }
        req.user = user;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        }) 
    }
}


module.exports = {
    validateJWT
}