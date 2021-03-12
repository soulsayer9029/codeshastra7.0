const express=require('express')

const app=express()
const cors=require('cors')
const mongoose  =require('mongoose')

require('dotenv/config')
app.use(cors())
const bodyParser=require('body-parser')
app.use(bodyParser.json())

const users = require('./routes/users');

const port=process.env.PORT || 3000


app.get('/',(req,res)=>{
    res.send('<h1>Noice</h1>')
})

app.use('/api/v1/users/', users);


mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(port,()=>console.log("DB Connected")))
    .catch((e)=>console.log(e.message))

mongoose.set('useFindAndModify',false);