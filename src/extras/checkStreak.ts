import { User } from "discord.js";
import luoDingoUsers from "../../connected-users.json";
import { fetchUrl } from "../api";

interface connectedUser {
  discord_id: string;
  discord_username: string;
  duolingo_username: string;
}

export async function checkStreak(discordUser: User | null) {
  // console.log(luoDingoUsers);
  const connectedUser: connectedUser | undefined = luoDingoUsers.users.find(
    (connectedUser: connectedUser) =>
      connectedUser?.discord_username === discordUser?.username,
  );
  if (!connectedUser) return;
  const { duolingo_username } = connectedUser;
  let duolingoUserData: ApiResponse | undefined;
  try {
    duolingoUserData = await fetchUrl(
      `https://www.duolingo.com/2017-06-30/users?username=${duolingo_username}`,
    );
  } catch (e) {
    console.error(e);
  }
  const luoUser = duolingoUserData?.users[0];
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
