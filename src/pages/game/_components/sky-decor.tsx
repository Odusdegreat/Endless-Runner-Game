import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

import { GAME_THEME } from "@/lib/theme";

export default function SkyDecor() {
  const sky_ref = useRef<Group>(null);
  const sun_ref = useRef<Group>(null);

  useFrame((state) => {
    if (!sky_ref.current) return;

    sky_ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
    sky_ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.18;

    if (sun_ref.current) {
      sun_ref.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.035,
      );
    }
  });

  return (
    <group ref={sky_ref}>
      <group ref={sun_ref} position={[0, 18, -60]}>
        <mesh>
          <sphereGeometry args={[7, 32, 32]} />
          <meshStandardMaterial
            color={GAME_THEME.scene.sun}
            emissive={GAME_THEME.scene.sunEmissive}
            emissiveIntensity={0.35}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[8.2, 9.8, 48]} />
          <meshBasicMaterial
            color={GAME_THEME.scene.sunEmissive}
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>

      <mesh position={[-16, 12, -45]}>
        <sphereGeometry args={[1.2, 20, 20]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.cloud}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh position={[-13.5, 12.3, -45]}>
        <sphereGeometry args={[1.1, 20, 20]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.cloud}
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh position={[12, 10, -38]}>
        <sphereGeometry args={[1.4, 20, 20]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.cloud}
          transparent
          opacity={0.92}
        />
      </mesh>

      <mesh position={[14, 10.2, -38]}>
        <sphereGeometry args={[1.15, 20, 20]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.cloud}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}
