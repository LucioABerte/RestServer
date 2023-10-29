


const validateRoles  = require('../middlewares/validate-roles');
const validateJWT    = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validate-fields')

module.exports = {
    ...validateRoles,
    ...validateJWT,
    ...validateFields
}