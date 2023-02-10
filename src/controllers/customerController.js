const customerModel = require('../models/customerModel')
const bcrypt=require('bcrypt')

exports.register = async (req, res) => {
    try {
        let userData = req.body;

        let { fname, lname, category, email, phone, password, address } =
            userData;

        if (Object.keys(userData).length == 0) {
            return res.status(400).send({ status: false, message: "please provide required fields" });
        }

        let checkEmpty = Object.keys(userData)
        for (i of checkEmpty) {
            if (userData[i].trim() == "")
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
        // if (!category) return res.status(400).send({ status: false, message: "category is mandatory" });

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
        
        const userExist = await customerModel.findOne({ $or: [{ email: email }, { phone: phone }] });

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

        const usercreated = await customerModel.create(userData);

        return res.status(201).send({ status: true, data: usercreated });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: error.message });
    }
};
