const orderModel = require("../models/orderModel");
const customerModel = require("../models/customerModel");
// const productModel = require('../Model/productModel')

const createOrder = async (req, res) => {
  try {
    let data = req.body;

    let { userId, items, totalPrice, totalQuantity, totalItems } = data;

    let category = "Regular";
    let findCustomer = await customerModel.findById(userId);

    if (findCustomer.orderCount > 19) {
      category = "Platinum";
    } else if (findCustomer.orderCount > 9) {

      category = "Gold";
    }

    let discount = 0;
    if (findCustomer.category == "Gold") {
      discount = totalPrice * 0.1;
    } else if (findCustomer.category == "Platinum") {
      discount = totalPrice * 0.2;
    }

    let orderCreate = await orderModel.create(data);

    
    let obj={
      orderId:orderCreate._id,
      balance:discount
    }

    let update = await customerModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: { category: category, $inc: { orderCount: 1 } },
        discountBal: { $push: obj },
      },
      { new: true }
    );

    return res.status(201).send({ status: true, message: "Success", data: orderCreate, newCustomer: update });

  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createOrder };
