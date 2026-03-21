import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

import type { GameState, Lane } from "@/interfaces/game.interface";
import { LANE_POSITIONS } from "@/lib/constants";
import { GAME_THEME } from "@/lib/theme";

type PlayerProps = {
  lane: Lane;
  y: number;
  game_state: GameState;
  speed: number;
};

export default function Player({ lane, y, game_state, speed }: PlayerProps) {
  const root_ref = useRef<Group>(null);
  const torso_ref = useRef<Group>(null);
  const head_ref = useRef<Group>(null);
  const left_arm_ref = useRef<Group>(null);
  const right_arm_ref = useRef<Group>(null);
  const left_leg_ref = useRef<Group>(null);
  const right_leg_ref = useRef<Group>(null);

  useFrame((state, delta) => {
    const run_intensity = game_state === "playing" ? Math.min(speed / 14, 1.7) : 0.08;
    const run_cycle = state.clock.elapsedTime * (5 + run_intensity * 4);
    const airborne = Math.max(y - 0.6, 0);

    if (!root_ref.current) return;

    root_ref.current.position.x += (LANE_POSITIONS[lane] - root_ref.current.position.x) * delta * 10;
    root_ref.current.position.y += (y - root_ref.current.position.y) * delta * 12;
    root_ref.current.rotation.z +=
      ((-LANE_POSITIONS[lane] * 0.05) - root_ref.current.rotation.z) * delta * 8;

    if (torso_ref.current) {
      torso_ref.current.position.y = Math.sin(run_cycle * 2) * 0.05 - airborne * 0.08;
      torso_ref.current.rotation.x = airborne > 0.08 ? -0.22 : Math.sin(run_cycle) * 0.03;
    }

    if (head_ref.current) {
      head_ref.current.position.y = 1.02 + Math.sin(run_cycle * 2 + 0.2) * 0.04;
      head_ref.current.rotation.y = Math.sin(run_cycle * 0.5) * 0.08;
    }

    const arm_swing = airborne > 0.08 ? 0.25 : 0.55 * run_intensity;
    const leg_swing = airborne > 0.08 ? 0.18 : 0.6 * run_intensity;

    if (left_arm_ref.current) {
      left_arm_ref.current.rotation.x = Math.sin(run_cycle) * arm_swing + 0.15;
    }
    if (right_arm_ref.current) {
      right_arm_ref.current.rotation.x = Math.sin(run_cycle + Math.PI) * arm_swing + 0.15;
    }
    if (left_leg_ref.current) {
      left_leg_ref.current.rotation.x = Math.sin(run_cycle + Math.PI) * leg_swing;
    }
    if (right_leg_ref.current) {
      right_leg_ref.current.rotation.x = Math.sin(run_cycle) * leg_swing;
    }
  });

  return (
    <group ref={root_ref} position={[LANE_POSITIONS[lane], y, 0]}>
      <group ref={torso_ref}>
        <mesh castShadow position={[0, 0.22, 0]}>
          <capsuleGeometry args={[0.42, 0.9, 10, 18]} />
          <meshStandardMaterial color={GAME_THEME.scene.playerBody} />
        </mesh>

        <mesh castShadow position={[0, 0.28, 0.44]}>
          <boxGeometry args={[0.52, 0.18, 0.08]} />
          <meshStandardMaterial
            color={GAME_THEME.scene.playerTrim}
            emissive={GAME_THEME.scene.playerTrimEmissive}
            emissiveIntensity={0.35}
          />
        </mesh>

        <group ref={head_ref} position={[0, 0.98, 0.02]}>
          <mesh castShadow>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color={GAME_THEME.scene.playerHead} />
          </mesh>

          <mesh position={[0, 0.18, 0]} castShadow>
            <capsuleGeometry args={[0.18, 0.12, 6, 12]} />
            <meshStandardMaterial color={GAME_THEME.scene.playerBody} />
          </mesh>

          <mesh position={[-0.09, 0.02, 0.25]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial color={GAME_THEME.scene.playerLimb} />
          </mesh>

          <mesh position={[0.09, 0.02, 0.25]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial color={GAME_THEME.scene.playerLimb} />
          </mesh>
        </group>

        <group ref={left_arm_ref} position={[-0.44, 0.5, 0]}>
          <mesh castShadow position={[0, -0.34, 0]}>
            <capsuleGeometry args={[0.09, 0.55, 6, 12]} />
            <meshStandardMaterial color={GAME_THEME.scene.playerLimb} />
          </mesh>
        </group>

        <group ref={right_arm_ref} position={[0.44, 0.5, 0]}>
          <mesh castShadow position={[0, -0.34, 0]}>
            <capsuleGeometry args={[0.09, 0.55, 6, 12]} />
            <meshStandardMaterial color={GAME_THEME.scene.playerLimb} />
          </mesh>
        </group>

        <group ref={left_leg_ref} position={[-0.18, -0.5, 0]}>
          <mesh castShadow position={[0, -0.38, 0]}>
            <capsuleGeometry args={[0.11, 0.7, 6, 12]} />
            <meshStandardMaterial color={GAME_THEME.scene.playerLimb} />
          </mesh>
        </group>

        <group ref={right_leg_ref} position={[0.18, -0.5, 0]}>
          <mesh castShadow position={[0, -0.38, 0]}>
            <capsuleGeometry args={[0.11, 0.7, 6, 12]} />
            <meshStandardMaterial color={GAME_THEME.scene.playerLimb} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
