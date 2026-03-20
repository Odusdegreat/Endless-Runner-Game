import { GROUND_Y } from "@/lib/constants";
import { GAME_THEME } from "@/lib/theme";

export default function Ground() {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, GROUND_Y, -18]}
        receiveShadow
      >
        <planeGeometry args={[30, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.road} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, GROUND_Y + 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[0.2, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.laneCenter} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-2.2, GROUND_Y + 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[0.14, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.laneDivider} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2.2, GROUND_Y + 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[0.14, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.laneDivider} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-9, GROUND_Y - 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[8, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.verge} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[9, GROUND_Y - 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[8, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.verge} />
      </mesh>

      <mesh position={[-6, 1.2, -15]} castShadow>
        <boxGeometry args={[1.3, 2.4, 1.3]} />
        <meshStandardMaterial color={GAME_THEME.scene.buildingNear} />
      </mesh>

      <mesh position={[6, 1.5, -22]} castShadow>
        <boxGeometry args={[1.8, 3, 1.8]} />
        <meshStandardMaterial color={GAME_THEME.scene.buildingMid} />
      </mesh>

      <mesh position={[-7, 1.8, -30]} castShadow>
        <boxGeometry args={[1.8, 3.6, 1.8]} />
        <meshStandardMaterial color={GAME_THEME.scene.buildingFar} />
      </mesh>

      <mesh position={[7, 1.3, -36]} castShadow>
        <boxGeometry args={[1.5, 2.6, 1.5]} />
        <meshStandardMaterial color={GAME_THEME.scene.buildingAlt} />
      </mesh>

      <mesh position={[-8, 0.65, -42]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.3, 12]} />
        <meshStandardMaterial color={GAME_THEME.scene.pole} />
      </mesh>

      <mesh position={[-8, 1.55, -42]} castShadow>
        <sphereGeometry args={[0.22, 14, 14]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.lampGlow}
          emissive={GAME_THEME.scene.lampGlowEmissive}
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh position={[8, 0.65, -48]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.3, 12]} />
        <meshStandardMaterial color={GAME_THEME.scene.pole} />
      </mesh>

      <mesh position={[8, 1.55, -48]} castShadow>
        <sphereGeometry args={[0.22, 14, 14]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.lampGlow}
          emissive={GAME_THEME.scene.lampGlowEmissive}
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}
