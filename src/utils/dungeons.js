export const dungeonLevels = [
  { level: 1, maxPower: 7 },
  { level: 2, maxPower: 12 },
  { level: 3, maxPower: 18 },
  { level: 4, maxPower: 25 },
  { level: 5, maxPower: 35 },
  { level: 6, maxPower: 50 },
  { level: 7, maxPower: 70 },
];

import { monsters } from "./monsters";

// Randomly select monsters whose total power matches maxPower
export function generateDungeonMonsters(maxPower) {
  let selected = [];
  let remainingPower = maxPower;
  const available = monsters.filter(m => m.power <= maxPower);

  while (remainingPower > 0) {
    const candidates = available.filter(m => m.power <= remainingPower);
    if (candidates.length === 0) break;
    const monster = candidates[Math.floor(Math.random() * candidates.length)];
    selected.push(monster);
    remainingPower -= monster.power;
  }
  return selected;
}
