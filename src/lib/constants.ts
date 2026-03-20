import type { Lane } from "@/interfaces/game.interface";

export const LANE_POSITIONS: Record<Lane, number> = {
  [-1]: -2.2,
  [0]: 0,
  [1]: 2.2,
};

export const PLAYER_Y = 0.6;
export const GROUND_Y = -0.5;
export const PLAYER_RADIUS = 0.55;
export const OBSTACLE_RADIUS = 0.75;
export const JUMP_FORCE = 8.5;
export const GRAVITY = 22;
export const BASE_SPEED = 10;
export const MAX_SPEED = 28;
export const SPEED_RAMP = 0.35;
export const SPAWN_INTERVAL = 1.1;
export const DESPAWN_Z = 6;
export const SPAWN_Z = -45;
