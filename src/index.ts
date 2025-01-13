import { Client, GatewayIntentBits } from "discord.js";

import env from "../environment.json";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the bot is ready
client.once("ready", () => {
  console.log("Bot is online!");
});

// Log in to Discord with your bot token
client.login(env.SECRET_TOKEN);
