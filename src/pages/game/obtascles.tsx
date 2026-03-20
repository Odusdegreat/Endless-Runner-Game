import type { Lane } from "@/interfaces/game.interface";
import { GROUND_Y, LANE_POSITIONS } from "@/lib/constants";

type ObstacleProps = {
  lane: Lane;
  z: number;
};

export default function Obstacle({ lane, z }: ObstacleProps) {
  return (
    <mesh
      position={[LANE_POSITIONS[lane], GROUND_Y + 0.9, z]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1.4, 1.8, 1.4]} />
      <meshStandardMaterial color="#dc2626" />
    </mesh>
  );
}
