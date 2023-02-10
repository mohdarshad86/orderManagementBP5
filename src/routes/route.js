const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const orderController = require("../controllers/orderController");
// const middleWare = require("../middleware/auth");

router.post('/register', customerController.register)
router.post('/order', orderController.createOrder)

router.all('*/', (req, res) => {
    return res.status(400).send({ status: false, msg: "Invalid Path" })
})

module.exports = router;