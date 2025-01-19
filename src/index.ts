import {
  Client,
  Collection,
  Events,
  Routes,
  GatewayIntentBits,
  SlashCommandBuilder,
  MessageFlags,
  REST,
  Poll,
  Presence,
} from "discord.js";
import path from "path";
import fs from "fs";
import { fetchUrl } from "./api";

import { EnvironmentConfig } from "./@types/env";
import environment from "../environment.json";
import internal from "stream";
import { checkStreak } from "./extras/checkStreak";

const env: EnvironmentConfig = environment;
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

// Create a new client instance
const client: any = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

client.commands = new Collection();

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      console.log(`[INFO] Command loaded: ${command.data.name}`);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("ready", () => {});

client.on(
  "presenceUpdate",
  async (oldPresence: Presence, newPresence: Presence) => {
    if (!newPresence.user || newPresence.user.bot) return;
    if (newPresence.status === "online") {
      setTimeout(() => {
        checkStreak(newPresence.user);
      }, 180000);
    }
  },
);

client.on(Events.InteractionCreate, async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`${interaction.commandName} is not a command`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (e) {
    console.error(e);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

// Log in to Discord with your bot token
client.login(env.SECRET_TOKEN);
