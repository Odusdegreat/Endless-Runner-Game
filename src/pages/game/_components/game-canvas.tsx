import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import { MathUtils } from "three";
import type { PerspectiveCamera as PerspectiveCameraType } from "three";

import type {
  CoinType,
  GameState,
  Lane,
  ObstacleType,
} from "@/interfaces/game.interface";
import {
  COIN_RADIUS,
  LANE_POSITIONS,
  PLAYER_RADIUS,
  PLAYER_Y,
} from "@/lib/constants";
import { GAME_THEME } from "@/lib/theme";
import Coin from "@/pages/game/_components/coin";
import Ground from "@/pages/game/ground";
import Obstacle from "@/pages/game/obtascles";
import Player from "@/pages/game/player";
import SkyDecor from "@/pages/game/_components/sky-decor";

type GameCanvasProps = {
  game_state: GameState;
  player_lane: Lane;
  player_y: number;
  obstacles: ObstacleType[];
  coin_items: CoinType[];
  speed: number;
  on_tick: (delta: number) => void;
  on_collide: () => void;
  on_collect_coin: (coin_id: number) => void;
};

function get_obstacle_half_width(kind: ObstacleType["kind"]) {
  if (kind === "wide") return 0.95;
  if (kind === "barrier") return 0.75;
  return 0.7;
}

function get_obstacle_height(kind: ObstacleType["kind"]) {
  if (kind === "barrier") return 1;
  if (kind === "wide") return 1.4;
  return 1.8;
}

function CameraRig({
  game_state,
  player_lane,
  player_y,
}: Pick<GameCanvasProps, "game_state" | "player_lane" | "player_y">) {
  const camera_ref = useRef<PerspectiveCameraType>(null);

  useFrame((state, delta) => {
    const camera = camera_ref.current;
    if (!camera) return;

    const lane_x = LANE_POSITIONS[player_lane];
    const bob =
      game_state === "playing" ? Math.sin(state.clock.elapsedTime * 2.2) * 0.12 : 0;
    const sway =
      game_state === "playing" ? Math.sin(state.clock.elapsedTime * 1.5) * 0.18 : 0;

    const target_x = lane_x * 0.42;
    const target_y = 5.8 + (player_y - PLAYER_Y) * 0.35 + bob;
    const target_z = 10.2 + sway;

    camera.position.x = MathUtils.lerp(camera.position.x, target_x, delta * 3.5);
    camera.position.y = MathUtils.lerp(camera.position.y, target_y, delta * 3);
    camera.position.z = MathUtils.lerp(camera.position.z, target_z, delta * 2.6);

    const look_x = lane_x * 0.45;
    const look_y = 1.5 + (player_y - PLAYER_Y) * 0.45;
    camera.lookAt(look_x, look_y, -6);
    camera.rotation.z = MathUtils.lerp(
      camera.rotation.z,
      -lane_x * 0.02,
      delta * 2.5,
    );
  });

  return <PerspectiveCamera ref={camera_ref} makeDefault position={[0, 6, 10]} fov={50} />;
}

function Scene({
  game_state,
  player_lane,
  player_y,
  obstacles,
  coin_items,
  speed,
  on_tick,
  on_collide,
  on_collect_coin,
}: GameCanvasProps) {
  useFrame((_, delta) => {
    on_tick(delta);

    if (game_state !== "playing") return;

    const player_x = LANE_POSITIONS[player_lane];

    for (const obstacle of obstacles) {
      const obstacle_x = LANE_POSITIONS[obstacle.lane];
      const same_lane = Math.abs(player_x - obstacle_x) < 0.45;
      const near_z = obstacle.z > -1.3 && obstacle.z < 1.2;
      const obstacle_height = get_obstacle_height(obstacle.kind);
      const low_enough = player_y < PLAYER_Y + obstacle_height * 0.55;
      const close_enough =
        Math.abs(obstacle_x - player_x) <
        PLAYER_RADIUS + get_obstacle_half_width(obstacle.kind);

      if (same_lane && near_z && low_enough && close_enough) {
        on_collide();
        break;
      }
    }

    for (const coin of coin_items) {
      const coin_x = LANE_POSITIONS[coin.lane];
      const same_lane = Math.abs(player_x - coin_x) < 0.45;
      const near_z = coin.z > -1.2 && coin.z < 1.1;
      const close_enough =
        Math.abs(coin_x - player_x) < PLAYER_RADIUS + COIN_RADIUS;
      const proper_y = Math.abs(player_y - (PLAYER_Y + 0.65)) < 1.1;

      if (same_lane && near_z && close_enough && proper_y) {
        on_collect_coin(coin.id);
      }
    }
  });

  return (
    <>
      <color attach="background" args={[GAME_THEME.scene.sky]} />
      <fog attach="fog" args={[GAME_THEME.scene.fog, 20, 64]} />

      <ambientLight intensity={1.7} />
      <directionalLight position={[6, 12, 8]} intensity={2.5} castShadow />
      <pointLight
        position={[0, 6, 6]}
        intensity={game_state === "playing" ? 10 : 7.5}
        distance={28}
        color={GAME_THEME.scene.playerTrimEmissive}
      />

      <CameraRig
        game_state={game_state}
        player_lane={player_lane}
        player_y={player_y}
      />
      <Environment preset="sunset" />

      <SkyDecor />
      <Ground speed={speed} />
      <Player
        lane={player_lane}
        y={player_y}
        game_state={game_state}
        speed={speed}
      />

      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          lane={obstacle.lane}
          z={obstacle.z}
          kind={obstacle.kind}
          speed={speed}
        />
      ))}

      {coin_items.map((coin) => (
        <Coin key={coin.id} lane={coin.lane} z={coin.z} />
      ))}
    </>
  );
}

export default function GameCanvas(props: GameCanvasProps) {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <Scene {...props} />
    </Canvas>
  );
}
