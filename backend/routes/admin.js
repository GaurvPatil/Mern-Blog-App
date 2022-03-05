const router = require('express').Router(); 
const {  signin , signup } = require("../Controllers/Admin")


router.post("/adminsignin", signin);
router.post("/adminsignup", signup);

module.exports = router;