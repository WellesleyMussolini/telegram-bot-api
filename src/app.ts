import express from "express";
import bodyParser from "body-parser";
const telegramBot = require("node-telegram-bot-api");
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const bot = new telegramBot(process.env.TOKEN, { polling: true });

app.use(
  cors({
    origin: "https://telegram-sms-6146857d675a.herokuapp.com",
  })
);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Route to send a message
app.post("/send-message", async (req: any, res: any) => {
  const { chatId, message } = req.body;

  // Validate input
  if (!chatId || !message) {
    console.error("Missing chatId or message in the request body.");
    return res.status(400).json({ error: "chatId and message are required!" });
  }

  try {
    console.log(`Sending message: "${message}" to chatId: ${chatId}`);
    const response = await bot.sendMessage(chatId, message);
    console.log("Telegram API Response:", response);

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error: any) {
    console.error("Error sending message to Telegram:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

// Start the server
app.listen(port, () => {
  console.log("Server is running");

  // bot.on("message", (msg: any) => {
  //   const chatId = msg.chat.id;
  //   console.log("Received message:", msg.text, "Chat ID:", chatId);
  // });
});
