const router = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/otp", async (req, res) => {
  try {
    function generateOTP() {
      // Declare a digits variable
      // which stores all digits
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
    const OTP = generateOTP();

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gaurvpatil17@gmail.com",
        pass: process.env.PASS,
      },
    });

    let details = {
      from: "gaurvpatil17@gmail.com",
      to: req.body.email,
      subject: "Verification",
      text: `E-mail verification OTP = ${OTP}`,
    };

    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log("it has an error", err);
      } else {
        res.status(201).json({ msgO: OTP, msg: "OTP sent !" });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
});

module.exports = router;

// ( <div style={{fontFamily:"sans-serif",minWidth:"1000px",overflow:"auto",lineHeight:"2">
//       <div style={{margin:"50px auto",width:"70%",padding:"20px 0"}}>
//         <div style={{borderBottom:"1px solid #eee"}}>
//           <a
//             href=""
//             style={{fontSize:"1.4em",color: "#00466a",textDecoration:"none",fontWeight:"600"}}
//           >
//             Your Brand
//           </a>
//         </div>
//         <p style={{fontSize:"1.1em"}}>Hi,</p>
//         <p>
//           Thank you for choosing Whiz Holics. Use the following OTP to
//           complete your Sign Up procedures. OTP is valid for 5 minutes
//         </p>
//         <h2 style={{background:"#00466a",margin: "0 auto",width: "max-content",padding: "0 10px",color: "#fff",borderRadius: "4px"}}>
//           {generateOTP()}
//         </h2>
//         <p style={{fontSize:"0.9em"}}>
//           Regards,
//           <br />
//           Your Brand
//         </p>
//         <hr style={{border:"none",borderTop:"1px solid #eee"}} />
//         <div style={{float:"right",padding:"8px 0",color:"#aaa",fontSize:"0.8em",lineHeight:"1",fontWeight:"300"}}>
//           <p>Whiz Holics</p>
//           <p>1600 Amphitheatre Parkway</p>
//           <p>India</p>
//         </div>
//       </div>
//     </div>)
