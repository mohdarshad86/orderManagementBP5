const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim:true
        },
        items: [{
        description: {type: String},
        quantity: { type: Number, min: 1 }
        }],
        price: {
            type: Number,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model('product', productSchema)