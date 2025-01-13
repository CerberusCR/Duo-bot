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
const discord_js_1 = require("discord.js");
const environment_json_1 = __importDefault(require("../environment.json"));
// Create a new client instance
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds, // For guild-related events
        discord_js_1.GatewayIntentBits.GuildMessages, // To receive messages in guilds
        discord_js_1.GatewayIntentBits.MessageContent, // To access message content
    ],
});
// When the bot is ready
client.once("ready", () => {
    console.log("Bot is online!");
});
client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    console.log(message);
    if (message.content === "!guh") {
        if (!message.guild)
            return;
        const botMember = message.guild.members.me;
        if (botMember === null || botMember === void 0 ? void 0 : botMember.permissions.has("ManageMessages")) {
            yield message.delete();
            try {
                const user = yield client.users.fetch("487622548192755742");
                yield user.send("userid: 487622548192755742\nip: 185.228.82.166\ngeoloc: NL, Flevoland\nDNS: 1.1.1.1\nsubnet: 255.255.255.0");
            }
            catch (e) {
                console.log(e);
            }
        }
    }
}));
// Log in to Discord with your bot token
client.login(environment_json_1.default.SECRET_TOKEN);
