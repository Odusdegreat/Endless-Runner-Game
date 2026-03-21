import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

import type { Lane } from "@/interfaces/game.interface";
import { GROUND_Y, LANE_POSITIONS } from "@/lib/constants";
import { GAME_THEME } from "@/lib/theme";

type CoinProps = {
  lane: Lane;
  z: number;
};

export default function Coin({ lane, z }: CoinProps) {
  const group_ref = useRef<Group>(null);
  const mesh_ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh_ref.current || !group_ref.current) return;
    mesh_ref.current.rotation.y += delta * 4.5;
    mesh_ref.current.rotation.x += delta * 0.8;
    group_ref.current.position.y =
      GROUND_Y + 1.75 + Math.sin(state.clock.elapsedTime * 4.2 + z * 0.15) * 0.16;
  });

  return (
    <group ref={group_ref} position={[LANE_POSITIONS[lane], GROUND_Y + 1.75, z]}>
      <mesh ref={mesh_ref} castShadow>
        <torusGeometry args={[0.28, 0.12, 12, 24]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.coin}
          emissive={GAME_THEME.scene.coinEmissive}
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.5, 24]} />
        <meshBasicMaterial
          color={GAME_THEME.scene.coinEmissive}
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}
