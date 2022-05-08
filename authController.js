import User from './models/User.js'
import Role from './models/Role.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {validationResult} from 'express-validator';
import config from './config.js'

function generateAccessToken(id, roles){
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secret, {expiresIn: '24h'})
}

class AuthController{
    async registration(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Mistake occured while register', errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message: "This Username has already registered"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "ADMIN"})
            const user = new User({username: username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json('User is registered successfully')
        } catch(e){
            console.log(e)
            res.status(400).json({message: "Registration failed"})
        }
    }

    async login (req, res){
        try{
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message: 'There is no such user in data base'})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message: 'The password check was not succseed'})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch(e){
            console.log(e)
            res.status(400).json({message: "login failed"})
        }
    }
    
    async getUsers(req, res){
        try{
            const users = await User.find()
            return res.json(users)
        } catch(e){
            console.log(e)
            res.status(400).json({message: "Get Users failed"})
        }
    }
}

export default new AuthController();