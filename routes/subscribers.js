const router = require("express").Router();
const subscriber = require("../modules/subscriberSchema");

router.post("/subscriber", async (req, res) =>{
    try {
         await subscriber.create(req.body);
        res.status(201).json({ msg:"Thank You" });
        
      } catch (error) {
        res.status(500).json({ msg: "server error" });
      }
})
module.exports = router;