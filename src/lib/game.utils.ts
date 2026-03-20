import type { Lane, ObstacleType } from "@/interfaces/game.interface";

export function get_random_lane(): Lane {
  const lanes: Lane[] = [-1, 0, 1];
  return lanes[Math.floor(Math.random() * lanes.length)];
}

export function create_obstacle(id: number): ObstacleType {
  return {
    id,
    lane: get_random_lane(),
    z: -45,
    passed: false,
  };
}
