const Role = require('../models/role')
const User = require('../models/user')


const isRoleValid = async(role = '') => {
    const existsRole = await Role.findOne({role})
    if(!existsRole) {
        throw new Error(`The role ${role} is not registered in the database`)
    }
}

const emailExists = async(email = '') => {
    const existsEmail = await User.findOne({email})
    if( existsEmail) {
        throw new Error(`The email ${email} already exists`)
    }
}

const existsUserById = async( id ) => {
    const existsUser = await User.findById(id)
    if( !existsUser) {
        throw new Error(`The Id ${id} does not exists`)
    }
}


module.exports = {
    isRoleValid,
    emailExists,
    existsUserById
}