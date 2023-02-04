const mongoose = require('mongoose')

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
        enum: ['regular', 'gold', 'platinum'],
        default: 'regular'
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
    balance: {
        type: Number,
    },
    orders: {
        type: Number,
        default: 0
    },
    discount:{
        type: Number,
        default: 0
    },
    address: {
        shipping: {
            street: {
                type: String,
                required: true,
                trim: true
            },
            city: {
                type: String,
                required: true,
                trim: true
            },
            pincode: {
                type: Number,
                required: true,
                trim: true
            }
        },
        billing: {
            street: {
                type: String,
                required: true,
                trim: true
            },
            city: {
                type: String,
                required: true,
                trim: true
            },
            pincode: {
                type: Number,
                required: true,
                trim: true
            }
        }
    }
}, { timestamps: true })

module.exports = mongoose.model('customer', customerSchema)