import jwt from 'jsonwebtoken'
import config from './config.js'


function auth_check(req, res, next){
    if(req.method === 'OPTIONS') {
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            return res.status(400).json({message: 'The user was not authorised'})
        }
        const decodedData = jwt.verify(token, config.secret)
        console.log(decodedData)
        req.user = decodedData
        next()
    }catch(e){
        console.log(e)
        return res.status(400).json({message: 'The user was not authorised'})
    }
}

export default auth_check;