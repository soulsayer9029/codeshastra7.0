const mongoose = require('mongoose');
const User=require('../models/User.js')
const ProductSchema = new mongoose.Schema({
    quantity:{
        type:Number,
        required:[true,'Quantity must be mentioned'],
    },
    purity:{
        type:Number,
        minimum:[1,'Cannot be less than one'],
        maximum:[100,'Cannot be more than 100'],
        required: [true, 'Please add product purity']
    },
    cost:{
        type:Number,
        required:[true,'Cost needs to be mentioned']
    },
    seller:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    isSold: {
        type: Boolean,
        default: false
    }
    // buyer:{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:'User',
    // },
    // middleman:{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:'User',
    // }
});
module.exports = mongoose.model('Product', ProductSchema);