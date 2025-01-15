import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import { fetchUrl } from "../../api";

export const data = new SlashCommandBuilder()
  .setName("connect")
  .setDescription("Add your Duolingo username to the bot")
  .addStringOption((option) =>
    option
      .setName("username")
      .setDescription("Your username on Duolingo")
      .setRequired(true),
  );
export async function execute(interaction: any) {
  // Make connection to the Duolingo API and get the userdata.
  const username = interaction.options.getString("username");
  let userData;
  userData = await fetchUrl(
    `https://www.duolingo.com/2017-06-30/users?username=${username}`,
  );

  if (!userData || !userData.users || userData.users.length === 0) {
    interaction.reply("This user does not exist on Duolingo");
    return;
  }

  const discord_user = interaction.user.username;
  const duolingo_user = userData.users[0];

  let appendData = {
    discord_username: discord_user,
    duolingo_username: duolingo_user.username,
  };

  // Check if username is already in the data
  fs.readFile(
    __dirname + "/../../../../connected-users.json",
    "utf8",
    function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        let obj = JSON.parse(data);

        if (obj.users.find((u: any) => u.discord_username === discord_user)) {
          interaction.reply("You already added your account");
          return;
        }
      }

      // Check if username actually exists on dingo
      if (duolingo_user.username) {
        fs.readFile(
          __dirname + "/../../../../connected-users.json",
          "utf8",
          function readFileCallBack(err, data) {
            if (err) {
              console.log(err);
            } else {
              let obj = JSON.parse(data);
              obj.users.push(appendData);
              let json = JSON.stringify(obj);
              fs.writeFile(
                __dirname + "/../../../../connected-users.json",
                json,
                "utf8",
                (err) => {
                  if (err) {
                    console.error("Error writing file:", err);
                    interaction.reply("Unhandled error occured:" + err);
                  } else {
                    console.log("Data written to file");
                    interaction.reply("Successfully added your profile");
                  }
                },
              );
            }
          },
        );
      } else {
        interaction.reply("This user does not exist on duolingo");
        return;
      }
    },
  );
}
