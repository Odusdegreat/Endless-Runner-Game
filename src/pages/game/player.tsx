import type { Lane } from "@/interfaces/game.interface";
import { LANE_POSITIONS } from "@/lib/constants";

type PlayerProps = {
  lane: Lane;
  y: number;
};

export default function Player({ lane, y }: PlayerProps) {
  return (
    <group position={[LANE_POSITIONS[lane], y, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1, 1.2, 1]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>

      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#f5d0a9" />
      </mesh>
    </group>
  );
}
