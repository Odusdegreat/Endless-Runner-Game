import { GAME_THEME } from "@/lib/theme";

export default function SkyDecor() {
  return (
    <group>
      <mesh position={[0, 18, -60]}>
        <sphereGeometry args={[7, 32, 32]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.sun}
          emissive={GAME_THEME.scene.sunEmissive}
          emissiveIntensity={0.35}
        />
      </mesh>

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
