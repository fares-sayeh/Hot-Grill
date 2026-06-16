const express = require("express");
const { Resend } = require("resend");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.send("Hot Grill server is running 🚀");
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "fares.sayeh.20.12@gmail.com",
      subject: `Message from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

${message}
      `,
    });

    res.json({ message: "Email sent!" });
  } catch (err) {
    console.error("RESEND ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
