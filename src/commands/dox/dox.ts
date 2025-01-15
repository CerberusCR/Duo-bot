import { SlashCommandBuilder } from "discord.js";
import { fetchUrl } from "../../api";

export const data = new SlashCommandBuilder()
  .setName("dox")
  .setDescription(
    "Dox someones Duolingo profile (this is a joke for legal reasons)",
  )
  .addStringOption((option) =>
    option
      .setName("username")
      .setDescription("Someone's Duolingo username")
      .setRequired(true),
  );
export async function execute(interaction: any) {
  const username = interaction.options.getString("username");
  const userData = fetchUrl(
    `https://www.duolingo.com/2017-06-30/users?username=${username}`,
  );
  interaction.reply(JSON.stringify((await userData).users[0]));
  console.log(JSON.stringify((await userData).users[0]));
}
