import { SlashCommandBuilder } from "discord.js";
import { fetchUrl } from "../../api";
import "../../extras/date";
import { convertUnixTimestampToDate } from "../../extras/date";

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
  const user = (await userData).users[0];

  let isModerator = "";
  let learning = "";
  let native = "";
  if (user.canUseModerationTools) {
    let isModerator = "Is a Duolingo moderator";
  }
  switch (user.learningLanguage) {
    case "en":
      learning = "gb";
      break;
    case "ja":
      learning = "jp";
      break;

    default:
      learning = user.fromLanguage;
      break;
  }
  switch (user.fromLanguage) {
    case "en":
      native = "gb";
      break;
    case "ja":
      native = "jp";
      break;

    default:
      native = user.fromLanguage;
      break;
  }
  interaction.reply(`
    username: ${user.username}
    learning: :flag_${learning}:
    learning from: :flag_${native}:
    current streak: ${user.streak}
    streak started on \`${user.streakData.currentStreak.startDate}\`
    xp: ${user.totalXp}
    motivation: ${user.motivation}
    email verified: \`${user.emailVerified}\`
    account created on \`${convertUnixTimestampToDate(user.creationDate)}\`
    ${isModerator}
    `);
  console.log((await userData).users[0]);
}
