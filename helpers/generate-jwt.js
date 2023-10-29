const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') => {

    return new Promise( (resolve, reject) => {
        const payload = { uid }
        
        jwt.sign( payload, process.env.SECRET_OR_PRIVATE_KEY, {
            expiresIn: '4h',
        }, (err, token) => {
            if( err ) {
                console.log(err);
                reject('Token could not be generated') 
            } else {
                resolve(token)
            }
        })
        
    })

}


module.exports = {
    generateJWT
}