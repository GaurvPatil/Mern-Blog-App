const express = require("express");
const app = express();
const cryptoRoute = require("./routes/crypto");
const lifestylefashionRoute = require("./routes/lifestyle&Fashion");
const spritualRoute = require("./routes/spritual");
const newsRoute = require("./routes/news");
const userRoutes = require("./routes/users");
const otpRoutes  = require("./routes/Otps");
const subscriberRoute = require("./routes/subscribers");
const adminRoutes = require("./routes/admin")
const connectDB = require("./db/connect");
require("dotenv").config();
let cors = require("cors");
const path = require("path")

//middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  "/api/category/posts",
  cryptoRoute,
  lifestylefashionRoute,
  spritualRoute,
  newsRoute
);



app.use("/user", userRoutes , otpRoutes , subscriberRoute , adminRoutes );






// ....................deployment ....................//

 __dirname = path.resolve()

 if(process.env.NODE_ENV === "production"){
app.use( express.static(path.join(__dirname , "/frontend/build")) )
app.get("*" , (req,res)=>{
  res.sendFile(path.resolve(__dirname , "frontend",  "build" , "index.html"))
})
 }else{
   app.get("/" , (req,res)=>{
     res.send("API is runing")
   })
 }



// ....................deployment ....................//



const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}... `));
  } catch (error) {
    console.log(error);
  }
};

start();


// app.get("/api/category/posts/crypto")     - get all crypto posts
// app.post("/api/category/posts/crypto")    - create new crypto posts
// app.get("/api/category/posts/crypto/:id")  - get single crypto post
// app.patch("/api/category/posts/crypto/:id")   - update crypto post
// app.delete("/api/category/posts/crypto/:id")   - delete task