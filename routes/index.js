const express = require('express');

const router = express.Router();


const userSignUpController = require('../controller/userSignUp');
const userSignInController = require('../controller/userSignIn');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controller/userDetails');;
const userLogout = require('../controller/userLogout');
const allUsers = require('../controller/allUser');
const updateUser = require('../controller/updateUser');
const UploadProductController = require('../controller/uploadProduct');
const getProductController = require('../controller/getProduct');




router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details',authToken,userDetailsController);
router.get('/userLogout',userLogout);




// admin panel
router.get('/all-users',authToken,allUsers);
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/all-products",getProductController)





module.exports = router