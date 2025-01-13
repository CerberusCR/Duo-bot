"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const environment_json_1 = __importDefault(require("../environment.json"));
// Create a new client instance
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
// When the bot is ready
client.once("ready", () => {
    console.log("Bot is online!");
});
// Log in to Discord with your bot token
client.login(environment_json_1.default.SECRET_TOKEN);
