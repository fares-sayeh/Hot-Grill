const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  app.get("/", (req, res) => {
  res.send("Hot Grill server is running 🚀");
});

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anasfaressayeh@gmail.com",
        pass: "ovnq omne rkol negx",
      },
    });

    await transporter.sendMail({
      from: email,
      to: "anasfaressayeh@gmail.com",
      subject: `Message from ${name}`,
      text: message,
    });

    res.json({ message: "Email sent!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
