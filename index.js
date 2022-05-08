import express from 'express'
import mongoose from 'mongoose'
import authRouter from './authRouter.js'
import validator from 'express-validator';

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)
async function start() {
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.dmhl0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log('server is started on port' + PORT))
    } catch(e){
        console.log(e)
    }
}

start()