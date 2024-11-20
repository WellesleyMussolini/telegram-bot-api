"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const telegramBot = require("node-telegram-bot-api");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const bot = new telegramBot(process.env.TOKEN, { polling: true });
// Middleware to parse JSON requests
app.use(body_parser_1.default.json());
// Route to send a message
app.post("/send-message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, message } = req.body;
    // Validate input
    if (!chatId || !message) {
        console.error("Missing chatId or message in the request body.");
        return res.status(400).json({ error: "chatId and message are required!" });
    }
    try {
        console.log(`Sending message: "${message}" to chatId: ${chatId}`);
        const response = yield bot.sendMessage(chatId, message);
        console.log("Telegram API Response:", response);
        res
            .status(200)
            .json({ success: true, message: "Message sent successfully!" });
    }
    catch (error) {
        console.error("Error sending message to Telegram:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}));
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
