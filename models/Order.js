const mongoose = require('mongoose');
const User=require('../models/User.js')

const OrderSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    quantity:{
        type:Number,
        required:[true,'quantity needs to be mentioned']

    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    middleman:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    cost:{
        type:number,
        //default:(order.quantity)*(product.cost)
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('Order', OrderSchema);