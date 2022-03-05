const router = require('express').Router(); 
const {  signin , signup , forgetPassword } = require("../Controllers/Users")


router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/forgetpassword" , forgetPassword)

module.exports = router;