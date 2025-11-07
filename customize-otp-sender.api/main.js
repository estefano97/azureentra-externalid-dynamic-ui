import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.post("/otp-send", async (req, res) => {
  const { data } = req.body;
  const email = data?.otpContext?.identifier;
  const otp = data?.otpContext?.oneTimeCode;

  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE || "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  console.log({
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    })
console.log("📨 Email recieved / request:", email);

  const htmlTemplate = `
    <div style="font-family:Arial,sans-serif;background-color:#f9f9f9;padding:30px">
      <div style="max-width:500px;margin:auto;background:#fff;padding:20px;border-radius:10px;text-align:center">
        <img src="logo.png" alt="Logo" style="width:100px;margin-bottom:20px"/>
        <h2 style="color:#333">Your verification code</h2>
        <p style="font-size:18px;color:#555">
          One Time Password (OTP) to Login is:
        </p>
        <h1 style="background:#0078D4;color:white;padding:10px 20px;display:inline-block;border-radius:6px;letter-spacing:2px">
          ${otp}
        </h1>
        <p style="margin-top:20px;color:#888;font-size:14px">
          This code expires in 10 minutes. If you did not request this code, please ignore this email.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Verification Code - App",
      html: htmlTemplate,
    });

    console.log(`OTP succesfully sent to ${email}`);
  } catch (error) {
    console.error("ERRROR! OTP Couldn't be delivered:", error);
  }
  
  //Entra ID standard response to continue with the workflow
  res.json({
    "@odata.type": "#microsoft.graph.onTokenIssuanceStartResponseData",
    data: {
      "@odata.type": "#microsoft.graph.emailOtpSendResponseData",
      emailOtpSendBehavior: "continueWithDefaultBehavior",
    },
  });
});

app.listen(8080, () => console.log("Listening on port 8080"));
