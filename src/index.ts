import { Client, GatewayIntentBits, Poll } from "discord.js";
import fs from "fs";
import { fetchUrl } from "./api";

import { EnvironmentConfig } from "./@types/env";
import environment from "../environment.json";

const env: EnvironmentConfig = environment;

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("messageCreate", async (message) => {
  if (message.content === "!streak") {
    let user = "taigo525546";
    let userdata = fetchUrl(
      `https://www.duolingo.com/2017-06-30/users?username=${user}`,
    );
    console.log((await userdata).users[0].streak);
    message.channel.send(`${(await userdata).users[0].streak}`);
  }
});

// Log in to Discord with your bot token
client.login(env.SECRET_TOKEN);
