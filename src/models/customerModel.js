const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const customerSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Regular', 'Gold', 'Platinum'],
        default: 'Regular'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 8,
        max: 15
    }, // encrypted password
    totalBalance: {
        type: Number,
    },
    orderCount: {
        type: Number,
        default: 0
    },
    discountBal: [{
        orderId: { 
            type: ObjectId, 
            ref: 'order',
         },

        balance: {
            type: Number,
            default: 0
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model('customer', customerSchema)