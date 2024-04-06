const User = require('../models/user.server.model')
const generateToken = require('../../../utils/generateToken')


// TODO validate void fields
const registerUser = async (req, res) => {
    try{
        let userData;
        try {
            userData = JSON.parse(JSON.stringify(req.body));
        } catch (error) {
            throw new Error('Invalid JSON format');
        }

        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })

    if (userExists) {
        console.log('exist')
        return res.status(400).send({message: 'error'})
    }

    const user = await User.create({
        name,
        email,
        password,
        isAdmin: User.isAdmin,
    })

    if (user) {
        console.log('created')
       return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
           token: generateToken(user._id)
       })
    } else {
        return res.status(400)
    }}
    catch (e) {
        return res.status(500).send({message: 'Error while fetching bookings', error: e})
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await User.find()
        if(!users) {
            return res.status(500).send({error: 'server error'})
        }
        console.log(users)
        return res.status(200).send(users)
    }
    catch (e) {
        return res.status(500).send({message:  e})
    }
}

module.exports = {
    registerUser,
    getUsers
}