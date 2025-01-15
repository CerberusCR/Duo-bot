import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("bruh");

export async function execute(interaction: any) {
  await interaction.reply("smamogus");
}
