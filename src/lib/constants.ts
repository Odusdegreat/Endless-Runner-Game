import type { Lane } from "@/interfaces/game.interface";

export const LANE_POSITIONS: Record<Lane, number> = {
  [-1]: -2.2,
  [0]: 0,
  [1]: 2.2,
};

export const PLAYER_Y = 0.6;
export const GROUND_Y = -0.5;

export const PLAYER_RADIUS = 0.55;
export const COIN_RADIUS = 0.35;

export const BASE_SPEED = 10;
export const MAX_SPEED = 32;
export const SPEED_RAMP = 0.18;

export const GRAVITY = 18;
export const JUMP_FORCE = 10.25;

export const OBSTACLE_SPAWN_INTERVAL = 1.05;
export const COIN_SPAWN_INTERVAL = 0.72;

export const SPAWN_Z = -45;
export const DESPAWN_Z = 10;
