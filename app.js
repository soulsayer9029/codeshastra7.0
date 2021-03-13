const express=require('express')

const app=express()
const cors=require('cors')
const mongoose  =require('mongoose')

require('dotenv/config')
app.use(cors())
const bodyParser=require('body-parser')
app.use(express.json())

const users = require('./routes/users');
const products = require('./routes/products');
const orders=require('./routes/orders');

const port=process.env.PORT || 3000


app.get('/',(req,res)=>{
    res.send('<h1>Noice</h1>')
})

app.use('/api/v1/users/', users);
app.use('/api/v1/products/', products);
app.use('/api/v1/orders/', orders);


mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(port,()=>console.log("DB Connected")))
    .catch((e)=>console.log(e.message))

mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex', true);