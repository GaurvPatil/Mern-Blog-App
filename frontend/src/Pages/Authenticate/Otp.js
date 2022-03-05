import React from "react";
import { Otp } from "react-otp-timer";

const Otps = () => {
  let style = {
    otpTimer: {
      margin: "10px",
      color: "blue",
    },
    resendBtn: {
      backgroundColor: "#5cb85c",
      color: "white",
      border: "1 px solid #ccc",
    },
  };

  //callback of resend button
  const resendEvent = () => {
    console.log(
      "***************Resend button pressed do stuff here *********************"
    );
  };

  return (
    <div>
      <h1>Otp Timer counter</h1>
      <Otp
        style={style}
        minutes={5} // Minutes ( Pass the no of minutes that you want count )
        resendEvent={() => resendEvent()} //  Resend button event you can pass your function name here
      />
    </div>
  );
};

export default Otps;
