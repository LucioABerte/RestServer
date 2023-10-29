const { response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const { generateJWT } = require('../helpers/generate-jwt')
const { googleVerify } = require('../helpers/google-verify')


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



const googleSignIn = async( req, res = response ) => {
    
    const { id_token } = req.body

    try {
        const { email, name, img } = await googleVerify( id_token );
        let user = await User.findOne({ email })

        if( !user ) {
            const data = {
                name,
                email,
                password: ':p',
                img,
                role: 'USER_ROLE',
                google: true
            }

            user = new User(data)
            await user.save()
        }

        if( !user.state ) {
            return res.status(401).json({
                msg: 'Please contact the administrator | user blocked'
            })
        }

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'The token could not be verified'
        })
    }

}


module.exports = {
    login,
    googleSignIn
};