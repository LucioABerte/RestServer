const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, isAdminRole, hasRoles } = require('../middlewares')

const { isRoleValid, emailExists, existsUserById } = require('../helpers/dbValidators');

const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
   check('id', 'Not a valid id').isMongoId(),
   check('id').custom( existsUserById ),
   check('role').custom( isRoleValid ),
   validateFields
], usersPut);

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    //check('email', 'The email is not valid').isEmail(),
    check('password', 'The password is required and must contain at least 6 characters').isLength({ min: 6 }),
    //check('role', 'The assigned role is not allowed or valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom( emailExists ),
    check('role').custom( isRoleValid ),
    validateFields
], usersPost);

router.delete('/:id',[
    validateJWT,
    //isAdminRole,
    hasRoles('ADMIN_ROLE','USER_ROLE','SALES_ROLE'),
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
], usersDelete);

router.patch('/', usersPatch);

module.exports = router