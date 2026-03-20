import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

import type { Lane } from "@/interfaces/game.interface";
import { GROUND_Y, LANE_POSITIONS } from "@/lib/constants";
import { GAME_THEME } from "@/lib/theme";

type CoinProps = {
  lane: Lane;
  z: number;
};

export default function Coin({ lane, z }: CoinProps) {
  const mesh_ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh_ref.current) return;
    mesh_ref.current.rotation.y += delta * 4.5;
    mesh_ref.current.rotation.x += delta * 0.8;
    mesh_ref.current.position.y =
      GROUND_Y + 1.75 + Math.sin(Date.now() * 0.004) * 0.08;
  });

  return (
    <mesh
      ref={mesh_ref}
      position={[LANE_POSITIONS[lane], GROUND_Y + 1.75, z]}
      castShadow
    >
      <torusGeometry args={[0.28, 0.12, 12, 24]} />
      <meshStandardMaterial
        color={GAME_THEME.scene.coin}
        emissive={GAME_THEME.scene.coinEmissive}
        emissiveIntensity={0.55}
      />
    </mesh>
  );
}
