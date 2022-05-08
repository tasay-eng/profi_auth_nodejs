import jwt from 'jsonwebtoken'
import config from './config.js'


function auth_roles(roles) {
    return function(req, res, next){
        if(req.method === 'OPTIONS') {
            next()
        }
    
        try{
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(400).json({message: 'Token was not got'})
            }
            const {roles: userRoles} = jwt.verify(token, config.secret)
            console.log(userRoles)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)){
                    hasRole = true
                }
            })
            if (!hasRole){
                return res.status(400).json({message: 'You have no access rights'})
            }
            next()
        }catch(e){
            console.log(e)
            return res.status(400).json({message: 'The user was not authorised'})
        }
    }
}

export default auth_roles;