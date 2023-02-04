const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: 'customer'
        },
        items: [{
            productId: { type: ObjectId, ref: 'product' },
            quantity: { type: Number, min: 1 }
        }],
        
        totalItems: { type: Number },
        //comment: "Holds total number of items in the cart"

        totalQuantity: { type: Number },
        //comment: "Holds total number of quantity in the cart"

        totalPrice: { type: Number },
        // comment: "Holds total price of all the items in the cart"
    },
    { timestamp: true }
);

module.exports = mongoose.model('order', orderSchema)