// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { sendEmail } from "./utils/mail";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.error(error);
  }
});

app.post("/mail", async (req, res) => {
  try {
    const { lname, fname, datePicker, hairColor, length, gender, message } =
      req.body;
    await sendEmail({
      lname: lname,
      fname: fname,
      datePicker: datePicker,
      hairColor: hairColor,
      length: length,
      gender: gender,
      message: message,
    });
    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
