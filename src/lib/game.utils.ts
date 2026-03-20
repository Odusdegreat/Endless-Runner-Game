import type {
  CoinType,
  DifficultyLevel,
  Lane,
  ObstacleKind,
  ObstacleType,
} from "@/interfaces/game.interface";
import { SPAWN_Z } from "@/lib/constants";

export function get_random_lane(): Lane {
  const lanes: Lane[] = [-1, 0, 1];
  return lanes[Math.floor(Math.random() * lanes.length)];
}

export function get_random_obstacle_kind(): ObstacleKind {
  const kinds: ObstacleKind[] = ["box", "barrier", "wide"];
  return kinds[Math.floor(Math.random() * kinds.length)];
}

export function create_obstacle(id: number): ObstacleType {
  return {
    id,
    lane: get_random_lane(),
    z: SPAWN_Z,
    kind: get_random_obstacle_kind(),
  };
}

export function create_coin(id: number): CoinType {
  return {
    id,
    lane: get_random_lane(),
    z: SPAWN_Z - 8,
    collected: false,
  };
}

export function get_difficulty_label(score: number): DifficultyLevel {
  if (score < 100) return "easy";
  if (score < 250) return "medium";
  if (score < 450) return "hard";
  return "insane";
}

export function format_score(value: number) {
  return value.toLocaleString();
}
