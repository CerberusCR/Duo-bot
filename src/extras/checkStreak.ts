import { User } from "discord.js";
import luoDingoUsers from "../../connected-users.json";
import { fetchUrl } from "../api";
import { getRandomInt } from "./getRandomInt";
import { deathThreats } from "./deathTheats";

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
  let randomInteger: number;
  switch (luoUser?.streak) {
    case 0:
      randomInteger = getRandomInt(0, deathThreats["0"].length);
      discordUser?.send(deathThreats["0"][randomInteger]);
      break;
    case 10:
      randomInteger = getRandomInt(0, deathThreats["10"].length);
      discordUser?.send(deathThreats["10"][randomInteger]);
      break;
    case 15:
      randomInteger = getRandomInt(0, deathThreats["15"].length);
      discordUser?.send(deathThreats["15"][randomInteger]);
      break;

    default:
      break;
  }
}
