const userModel = require("../models/userModel")
const bcrypt = require('bcrypt');


async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body

        console.log("rep.body",req.body)

        if (!email) {
            throw new error("Please provide email")
        }

        if (!password) {
            throw new error("Please provide password")
        }

        if (!name) {
            throw new error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = userData.save()

        res.status(201).json({
            data : saveUser,
            succes : true,
            error : false,
            message : "User created succesfully!"
        })

    } catch (err) {
        res.json({
            message: err,
            error: true,
            sucess: false,
        })
    }
}

module.exports = userSignUpController