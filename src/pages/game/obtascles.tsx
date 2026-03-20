import type { Lane, ObstacleKind } from "@/interfaces/game.interface";
import { GROUND_Y, LANE_POSITIONS } from "@/lib/constants";
import { GAME_THEME } from "@/lib/theme";

type ObstacleProps = {
  lane: Lane;
  z: number;
  kind: ObstacleKind;
};

export default function Obstacle({ lane, z, kind }: ObstacleProps) {
  if (kind === "barrier") {
    return (
      <group position={[LANE_POSITIONS[lane], GROUND_Y + 0.5, z]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 1, 0.8]} />
          <meshStandardMaterial color={GAME_THEME.scene.barrier} />
        </mesh>
        <mesh position={[0, 0.15, 0.45]}>
          <boxGeometry args={[1.1, 0.14, 0.1]} />
          <meshStandardMaterial
            color={GAME_THEME.scene.barrierGlow}
            emissive={GAME_THEME.scene.barrierGlowEmissive}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    );
  }

  if (kind === "wide") {
    return (
      <group position={[LANE_POSITIONS[lane], GROUND_Y + 0.7, z]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.9, 1.4, 1.4]} />
          <meshStandardMaterial color={GAME_THEME.scene.wideObstacle} />
        </mesh>
        <mesh position={[0, 0.3, 0.72]}>
          <boxGeometry args={[1.35, 0.16, 0.12]} />
          <meshStandardMaterial
            color={GAME_THEME.scene.wideGlow}
            emissive={GAME_THEME.scene.wideGlowEmissive}
            emissiveIntensity={0.28}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group position={[LANE_POSITIONS[lane], GROUND_Y + 0.9, z]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.8, 1.4]} />
        <meshStandardMaterial color={GAME_THEME.scene.boxObstacle} />
      </mesh>
      <mesh position={[0, 0.3, 0.72]}>
        <boxGeometry args={[1.02, 0.16, 0.12]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.boxGlow}
          emissive={GAME_THEME.scene.boxGlowEmissive}
          emissiveIntensity={0.28}
        />
      </mesh>
    </group>
  );
}
