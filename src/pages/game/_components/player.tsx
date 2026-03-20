import type { Lane } from "@/interfaces/game.interface";
import { LANE_POSITIONS } from "@/lib/constants";
import { GAME_THEME } from "@/lib/theme";

type PlayerProps = {
  lane: Lane;
  y: number;
};

export default function Player({ lane, y }: PlayerProps) {
  return (
    <group position={[LANE_POSITIONS[lane], y, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1, 1.25, 1]} />
        <meshStandardMaterial color={GAME_THEME.scene.playerBody} />
      </mesh>

      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color={GAME_THEME.scene.playerHead} />
      </mesh>

      <mesh position={[-0.35, -0.9, 0]} castShadow>
        <boxGeometry args={[0.24, 0.9, 0.24]} />
        <meshStandardMaterial color={GAME_THEME.scene.playerLimb} />
      </mesh>

      <mesh position={[0.35, -0.9, 0]} castShadow>
        <boxGeometry args={[0.24, 0.9, 0.24]} />
        <meshStandardMaterial color={GAME_THEME.scene.playerLimb} />
      </mesh>

      <mesh position={[0, 0.15, 0.55]} castShadow>
        <boxGeometry args={[0.75, 0.2, 0.12]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.playerTrim}
          emissive={GAME_THEME.scene.playerTrimEmissive}
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}
