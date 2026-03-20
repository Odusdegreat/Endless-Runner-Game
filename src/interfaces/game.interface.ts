export type Lane = -1 | 0 | 1;

export type GameState = "idle" | "playing" | "paused" | "game_over";

export type ObstacleKind = "box" | "barrier" | "wide";

export type ObstacleType = {
  id: number;
  lane: Lane;
  z: number;
  kind: ObstacleKind;
};

export type CoinType = {
  id: number;
  lane: Lane;
  z: number;
  collected?: boolean;
};

export type DifficultyLevel = "easy" | "medium" | "hard" | "insane";
