const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim:true
        },
        description: {
            type: String,
        },
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