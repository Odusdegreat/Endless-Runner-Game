export type Lane = -1 | 0 | 1;

export type ObstacleType = {
  id: number;
  lane: Lane;
  z: number;
  passed?: boolean;
};

export type GameState = "idle" | "playing" | "game_over";
