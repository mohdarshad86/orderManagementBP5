const customerModel = require('../models/customerModel')

exports.register = async (req, res) => {
    try {
        let userData = req.body;

        let { fname, lname, category, email, phone, password, address } =
            userData;

        if (Object.keys(userData).length == 0) {
            return res.status(400).send({ status: false, message: "please provide required fields" });
        }

        let checkEmpty = Object.keys(data)
        for (i of checkEmpty) {
            if (data[i].trim() == "")
                return res.send({ status: false, message: `${i} can not be Empty` })
        }

        //============ fname====================

        if (!fname) {
            return res.status(400).send({ status: false, message: "first name is mandatory" });
        }
        if (typeof fname != "string") {
            return res.status(400).send({ status: false, message: "first name should be in string" });
        }
        // regex

        //   if (!validation.validateName(fname)) {
        //     return res.status(400).send({ status: false, message: "please provide valid first name " });
        //   }

        // ========================= lname ==================

        if (!lname)
            return res.status(400).send({ status: false, message: "last name is mandatory" });

        if (typeof lname != "string")
            return res.status(400).send({ status: false, message: "last name should be in string" });

        // regex
        //   if (!validation.validateName(lname)) {
        //     return res.status(400).send({ status: false, message: "please provide valid last  name " });
        //   }

        //validate category
        if (!category) return res.status(400).send({ status: false, message: "category is mandatory" });

        //================================ email ======

        if (!email)
            return res.status(400).send({ status: false, message: "email is mandatory" });

        if (typeof email != "string")
            return res.status(400).send({ status: false, message: "email id  should be in string" });

        //regex
        // if (!validation.validateEmail(email)) {
        //     return res.status(400).send({ status: false, message: "please provide valid email id" });
        // }

        //======= phone =============

        if (!phone) 
            return res.status(400).send({ status: false, message: "phone is mandatory" });
        
        if (typeof phone != "string") 
            return res.status(400).send({ status: false, message: "phone should be in string" });

            //REGEX
        // if (!validation.validateMobileNo(phone)) 
        //     return res.status(400).send({ status: false, message: "please provide valid 10 digit Phone Number" });
        
        const userExist = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] });

        if (userExist) {
            if (userExist.email == email) {
                return res.status(400).send({ status: false, message: "email id  already exist" });
            }

            if (userExist.phone == phone) {
                return res.status(400).send({ status: false, message: "phone  already exist" });
            }
        }

        //========= password ======

        if (!password) 
            return res.status(400).send({ status: false, message: "password is mandatory" });        

        if (typeof password != "string") 
            return res.status(400).send({ status: false, message: "please provide password in string " });       

        // //regex password

        // if (!validation.validatePassword(password)) 
        //     return res.status(400).send({ status: false, message: "please provide valid Alphanumeric 8-15 length Atleast One Special character password" });
        

        //Encrypting password

        let hashing = bcrypt.hashSync(password, 10);
        userData.password = hashing;

        //======================== address =============

        address = userData.address = JSON.parse(address);

        if (!address) {
            return res.status(400).send({ status: false, message: "Address is mandatory " });
        }

        if (typeof address != "object")
            return res.status(400).send({ status: false, message: "Address should be in Object format " });

        // ======== address  shipping ============

        if (!address.shipping) {
            return res.status(400).send({ status: false, message: "Shipping Address is mandatory " });
        }

        if (typeof address.shipping != "object")
            return res.status(400).send({
                status: false, message: "Address of shipping should be in Object format ",
            });

        // =========street validation=========
        if (!address.shipping.street) {
            return res.status(400).send({ status: false, message: "Shipping street is mandatory " });
        }

        if (typeof address.shipping.street != "string") {
            return res.status(400).send({ status: false, message: "shipping street  will be in string " });
        }

        address.shipping.street = userData.address.shipping.street = address.shipping.street.trim()

        if (address.shipping.street == "") {
            return res.status(400).send({
                status: false, message: "Please provide shipping street value",
            });
        }

        //========= city validation =========================

        if (!address.shipping.city) {
            return res.status(400).send({ status: false, message: "shipping city is mandatory " });
        }
        if (typeof address.shipping.city != "string") {
            return res.status(400).send({
                status: false, message: "shipping city will be in string ",
            });
        }

        address.shipping.city = userData.address.shipping.city = address.shipping.city.trim();

        if (address.shipping.city == "") {
            return res.status(400).send({
                status: false, message: "Please provide shipping city value",
            })
        }

        //====pincode

        if (!address.shipping.pincode) {
            return res.status(400).send({
                status: false, message: "shipping pincode is mandatory ",
            });
        }

        // address.shipping.pincode = userData.address.shipping.pincode =  address.shipping.pincode.trim(); 
        if (!validation.validatePincode(address.shipping.pincode)) { return res.status(400).send({ status: false, message: "please provide valid shipping pincode" }) }

        if (typeof address.shipping.pincode != "number") {
            return res.status(400).send({
                status: false, message: "shipping pincode  will be in number ",
            });
        }

        if (address.shipping.pincode == "") {
            return res.status(400).send({
                status: false, message: "Please provide shipping pincode value",
            })
        }

        //====== address billing ====
        if (!address.billing) {
            return res.status(400).send({ status: false, message: "billing Address is mandatory " });
        }

        if (typeof address.billing != "object")
            return res.status(400).send({
                status: false, message: "Address of billing should be in Object format ",
            });


        if (!address.billing.street) {
            return res.status(400).send({ status: false, message: "billing street is mandatory " });
        }

        if (typeof address.billing.street != "string") {
            return res.status(400).send({
                status: false, message: "billing street  will be in string ",
            });
        }
        address.billing.street = address.billing.street.trim();

        if (address.billing.street == "") {
            return res.status(400).send({
                status: false, message: "Please provide billing street value",
            })
        }

        //=== city
        if (!address.billing.city) {
            return res.status(400).send({ status: false, message: "billing city  is mandatory " });
        }

        if (typeof address.shipping.city != "string") {
            return res.status(400).send({
                status: false, message: "billing city  will be in string ",
            });
        }

        address.billing.city = address.billing.city.trim();

        if (address.billing.city == "") {
            return res.status(400).send({
                status: false, message: "Please provide billing city value",
            })
        }

        //====pincode============

        if (!address.billing.pincode) {
            return res.status(400).send({ status: false, message: "billing pincode  is mandatory " });
        }


        if (typeof address.shipping.pincode != "number") {
            return res.status(400).send({
                status: false, message: "billing pincode  will be in number ",
            });
        }

        if (address.billing.pincode == "") {
            return res.status(400).send({
                status: false, message: "Please provide billing pincode value",
            })
        }

        if (!validation.validatePincode(address.shipping.pincode)) { return res.status(400).send({ status: false, message: "please provide valid shipping pincode" }) }

        //AWS

        userData.profileImage = req.image;

        const usercreated = await userModel.create(userData);

        return res.status(201).send({ status: true, data: usercreated });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: error.message });
    }
};