import { Poll, User } from "discord.js";
import luoDingoUsers from "../../connected-users.json";
import { fetchUrl } from "../api";
import { getRandomInt } from "./getRandomInt";
import { deathThreats } from "./deathTheats";

interface connectedUser {
  discord_id: string;
  discord_username: string;
  duolingo_username: string;
}

function getDeathThreatMessage(streak: number): string {
  const messages = deathThreats[streak];
  return messages[getRandomInt(0, messages.length)];
}

export async function checkStreak(discordUser: User | null) {
  // console.log(luoDingoUsers);
  const connectedUser: connectedUser | undefined = luoDingoUsers.users.find(
    (connectedUser: connectedUser) =>
      connectedUser?.discord_username === discordUser?.username,
  );
  if (!connectedUser) {
    console.warn(
      `No connected user found for Discord user: ${discordUser?.username}`,
    );
    return;
  }
  const { duolingo_username } = connectedUser;
  let duolingoUserData: ApiResponse | undefined;
  try {
    duolingoUserData = await fetchUrl(
      `https://www.duolingo.com/2017-06-30/users?username=${duolingo_username}`,
    );
  } catch (e) {
    console.error(
      `Failed to fetch duolingo data for discord user ${discordUser?.username}: `,
      e,
    );
    return;
  }
  const luoUser = duolingoUserData?.users[0];
  const streakMilestones: Array<number> = [0, 5, 10, 15];

  if (
    luoUser !== undefined &&
    discordUser !== null &&
    streakMilestones.includes(luoUser?.streak)
  ) {
    await discordUser.send(getDeathThreatMessage(luoUser.streak));
  } else {
    console.info(`Streak ${luoUser?.streak} is not a milestone.`);
  }
}
