import { Client, GatewayIntentBits } from "discord.js";
import { Duolingo } from "@grimille/duolingo-js";

import * as env from "../environment.json";

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // For guild-related events
    GatewayIntentBits.GuildMessages, // To receive messages in guilds
    GatewayIntentBits.MessageContent, // To access message content
  ],
});

const duolingo_client = new Duolingo(env.duolingo.email, env.duolingo.password);

// When the bot is ready
client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  console.log(message);
  if (message.content === "!guh") {
    if (!message.guild) return;
    const botMember = message.guild.members.me;
    if (botMember?.permissions.has("ManageMessages")) {
      await message.delete();

      try {
        const user = await client.users.fetch("");
        await user.send("");
      } catch (e) {
        console.log(e);
      }
    }
  }
});

// Log in to Discord with your bot token
client.login(env.SECRET_TOKEN);
