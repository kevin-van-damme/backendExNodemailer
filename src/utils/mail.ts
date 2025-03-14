import { formData } from "../types/mailTypes";
import { SMTP_HOST, SMTP_USER, SMTP_PASS } from "../utils/envs";
import nodemailer from "nodemailer";

let testAccount = await nodemailer.createTestAccount();
const testHost = "smtp.ethereal.email";

const {} = nodemailer.createTestAccount;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const sendEmail = async (data: formData) => {
  try {
    const info = await transporter.sendMail({
      from: SMTP_USER,
      to: "kevin.van.damme.pxl@gmail.com",
      subject: "New Applicant",
      html: `
      <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Application</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .header {
              background: #007BFF;
              color: #ffffff;
              text-align: center;
              padding: 15px;
              font-size: 22px;
              font-weight: bold;
              border-radius: 10px 10px 0 0;
          }
          .content {
              padding: 20px;
              font-size: 16px;
              color: #333;
              line-height: 1.5;
          }
          .button {
              display: inline-block;
              background: #007BFF;
              color: #ffffff;
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin-top: 10px;
          }
          .footer {
              text-align: center;
              font-size: 12px;
              color: #666;
              margin-top: 20px;
          }
          @media (max-width: 600px) {
              .container {
                  width: 95%;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Application confirmation</div>
          <div class="content">
              <p>Dear ${data.fname},</p>
              <p>Thank you for registering!</p>
              <p>There will be a review process after going over the details you have sent us.</p>
              <p>This can take up to two business days.</p>
              <p>Kind Regards,<br>MI6</p>
          </div>
          <div class="footer">
              &copy; MI6 - British Intelligence - Scotland Yard | <a href="https://www.sis.gov.uk/" style="color: #007BFF; text-decoration: none;">Website</a>
          </div>
      </div>
  </body>
  </html>
        `, // html body
    });
    console.log(info);
    console.log("Mail verstuurd");
    console.log(nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};
