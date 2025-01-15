import { SlashCommandBuilder } from "discord.js";
import { fetchUrl } from "../../api";
import "../../extras/date";
import { convertUnixTimestampToDate } from "../../extras/date";
import { languageToCountry } from "../../extras/languageToCoutry";

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

  let isModerator: string = "";
  let streak: string = "";

  if (user.canUseModerationTools) {
    let isModerator = "Is a Duolingo moderator";
  }

  const learning =
    languageToCountry[user.learningLanguage] || user.learningLanguage;
  const native = languageToCountry[user.fromLanguage] || user.fromLanguage;

  if (!user.streakData.currentStreak) {
    streak = "This user does not have a streak yet";
  } else {
    streak = `This user's streak started on \`${user.streakData.currentStreak.startDate}\``;
  }
  try {
    interaction.reply(`
      username: ${user.username}
      name: ${user.name}
      learning: :flag_${learning}:
      learning from: :flag_${native}:
      current streak: ${user.streak}
      ${streak}
      xp: ${user.totalXp}
      motivation: ${user.motivation}
      email verified: \`${user.emailVerified}\`
      account created on \`${convertUnixTimestampToDate(user.creationDate)}\`
      ${isModerator}
      `);
  } catch (e) {
    console.error(e);
  }
  console.log((await userData).users[0]);
}
