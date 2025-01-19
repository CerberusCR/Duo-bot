import { User } from "discord.js";
import luoDingoUsers from "../../connected-users.json";
import { fetchUrl } from "../api";

export async function checkStreak(discordUser: User | null) {
  console.log(luoDingoUsers);
  const conUser = luoDingoUsers.users.find(
    (conUser) => conUser.discord_username === discordUser?.username,
  );
  const userData: ApiResponse | undefined = await fetchUrl(
    `https://www.duolingo.com/2017-06-30/users?username=${conUser?.duolingo_username}`,
  );
  const luoUser = userData?.users[0];
  if (luoUser?.streak == 0) {
    discordUser?.send(
      "Your streak is crying in the corner, do you want to join it?",
    );
  } else if (luoUser?.streak == 10) {
    discordUser?.send(
      "Wow great, a streak of 10! You're safe from me, for now.",
    );
  }
}
