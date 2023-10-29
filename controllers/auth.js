const { response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const { generateJWT } = require('../helpers/generate-jwt')


const login = async(req, res = response) => {
    
    const { email, password } = req.body

    try {
        // Check if the email exists
        const user = await User.findOne({email})
        if( !user ) {
            return res.status(400).json({
                msg: 'Email / Password are not correct - Email'
            })
        }

        // Check if the user is active
        if( !user.state ) {
            return res.status(400).json({
                msg: 'Email / Password are not correct - State: false'
            })
        }

        //Verify password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Email / Password are not correct - Password'
            })
        }

        // Generate the JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Please contact the administrator'
        })
    }
}


module.exports = {
    login
};