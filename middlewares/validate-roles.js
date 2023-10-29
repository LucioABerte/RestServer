const { response } = require("express");



const isAdminRole = (req, res = response, next) => {
    if( !req.user ) {
        return res.status(500).json({
            msg: 'It is required to verify the Role without validating the token first.'
        })
    }

    const { role, name } = req.user;

    if( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${name} you are not an administrator - invalid action for ${role}`
        })
    }

    next();
}

const hasRoles = ( ...roles ) => {
    return (req, res = response, next) => {
        
        //console.log(roles, req.user.role);
        
        if( !req.user ) {
            return res.status(500).json({
                msg: 'It is required to verify the Role without validating the token first.'
            })
        }

        if ( !roles.includes( req.user.role ) ) {
            
            return res.status(401).json({
                msg: `The service requires one of these roles: ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRoles
}