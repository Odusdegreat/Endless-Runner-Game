import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";

import type {
  GameState,
  Lane,
  ObstacleType,
} from "@/interfaces/game.interface";
import Ground from "@/pages/game/ground";
import Obstacle from "@/pages/game/obtascles";
import Player from "@/pages/game/player";
import {
  LANE_POSITIONS,
  OBSTACLE_RADIUS,
  PLAYER_RADIUS,
  PLAYER_Y,
} from "@/lib/constants";

type GameCanvasProps = {
  game_state: GameState;
  player_lane: Lane;
  player_y: number;
  obstacles: ObstacleType[];
  on_tick: (delta: number) => void;
  on_collide: () => void;
};

function Scene({
  game_state,
  player_lane,
  player_y,
  obstacles,
  on_tick,
  on_collide,
}: GameCanvasProps) {
  useFrame((_, delta) => {
    on_tick(delta);

    if (game_state !== "playing") return;

    const player_x = LANE_POSITIONS[player_lane];

    for (const obstacle of obstacles) {
      const obstacle_x = LANE_POSITIONS[obstacle.lane];
      const same_lane = Math.abs(player_x - obstacle_x) < 0.4;
      const near_z = obstacle.z > -1.2 && obstacle.z < 1.2;
      const low_enough = player_y < PLAYER_Y + 1.15;
      const close_enough =
        Math.abs(obstacle_x - player_x) < PLAYER_RADIUS + OBSTACLE_RADIUS;

      if (same_lane && near_z && low_enough && close_enough) {
        on_collide();
        break;
      }
    }
  });

  return (
    <>
      <color attach="background" args={["#87ceeb"]} />
      <fog attach="fog" args={["#87ceeb", 15, 60]} />

      <ambientLight intensity={1.6} />
      <directionalLight position={[6, 10, 8]} intensity={2.4} castShadow />

      <PerspectiveCamera makeDefault position={[0, 6, 10]} fov={50} />
      <Environment preset="sunset" />

      <Ground />
      <Player lane={player_lane} y={player_y} />

      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} lane={obstacle.lane} z={obstacle.z} />
      ))}
    </>
  );
}

export default function GameCanvas(props: GameCanvasProps) {
  return (
    <Canvas shadows>
      <Scene {...props} />
    </Canvas>
  );
}
