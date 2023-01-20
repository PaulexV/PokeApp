import { PokeUser } from "../models/user"
import { ballsStats } from "../pages/hunt/models/pokeball"
import { getTimestampWithAddedSeconds } from "./timeUtils"

export function generateNewUser(id: string, name: string): PokeUser {
    return {
      id: id,
      name: name,
      captured: [],
      encountered: [],
      inventory: {
        pokeball: 50,
        superball: 10,
        ultraball: 3,
        masterball: 1
      },
      energy: 10,
      cooldown: {
        pokeball: getTimestampWithAddedSeconds(ballsStats.pokeball.cooldown * 60),
        superball: getTimestampWithAddedSeconds(ballsStats.superball.cooldown * 60),
        ultraball: getTimestampWithAddedSeconds(ballsStats.ultraball.cooldown * 60),
        masterball: getTimestampWithAddedSeconds(ballsStats.masterball.cooldown * 60),
        energy: getTimestampWithAddedSeconds(5 * 60),
      }
    }
  }