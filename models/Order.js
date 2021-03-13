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
    totalCost:{
        type: Number,
        default: 0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('Order', OrderSchema);