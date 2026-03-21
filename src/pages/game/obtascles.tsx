import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

import type { Lane, ObstacleKind } from "@/interfaces/game.interface";
import { GROUND_Y, LANE_POSITIONS } from "@/lib/constants";
import { GAME_THEME } from "@/lib/theme";

type ObstacleProps = {
  lane: Lane;
  z: number;
  kind: ObstacleKind;
  speed: number;
};

export default function Obstacle({ lane, z, kind, speed }: ObstacleProps) {
  const group_ref = useRef<Group>(null);

  useFrame((state) => {
    if (!group_ref.current) return;

    const pulse = Math.sin(state.clock.elapsedTime * 5 + z * 0.25) * 0.04;
    group_ref.current.position.y =
      (kind === "barrier" ? GROUND_Y + 0.5 : kind === "wide" ? GROUND_Y + 0.7 : GROUND_Y + 0.9) +
      pulse;
    group_ref.current.rotation.y += 0.004 + speed * 0.00045;
  });

  if (kind === "barrier") {
    return (
      <group ref={group_ref} position={[LANE_POSITIONS[lane], GROUND_Y + 0.5, z]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 1, 0.8]} />
          <meshStandardMaterial color={GAME_THEME.scene.barrier} />
        </mesh>
        <mesh position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.52, 0.08, 12, 20]} />
          <meshStandardMaterial
            color={GAME_THEME.scene.barrierGlowEmissive}
            emissive={GAME_THEME.scene.barrierGlowEmissive}
            emissiveIntensity={0.3}
          />
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
      <group ref={group_ref} position={[LANE_POSITIONS[lane], GROUND_Y + 0.7, z]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.9, 1.4, 1.4]} />
          <meshStandardMaterial color={GAME_THEME.scene.wideObstacle} />
        </mesh>
        <mesh position={[0, -0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.74, 0.09, 12, 24]} />
          <meshStandardMaterial
            color={GAME_THEME.scene.wideGlowEmissive}
            emissive={GAME_THEME.scene.wideGlowEmissive}
            emissiveIntensity={0.24}
          />
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
    <group ref={group_ref} position={[LANE_POSITIONS[lane], GROUND_Y + 0.9, z]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.8, 1.4]} />
        <meshStandardMaterial color={GAME_THEME.scene.boxObstacle} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.68, 0.08, 12, 24]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.boxGlowEmissive}
          emissive={GAME_THEME.scene.boxGlowEmissive}
          emissiveIntensity={0.24}
        />
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
